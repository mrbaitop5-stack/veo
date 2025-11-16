// FIX: Import GenerateVideosOperation for correct typing from the SDK.
// FIX: Import Modality for image editing support.
import { GoogleGenAI, GenerateVideosOperation, Modality } from "@google/genai";
// FIX: Removed unused VeoOperation import.
// FIX: Import types for both video generation and image editing.
import { VideoGenerationOptions, AspectRatio, Resolution, ImagePart, ImageEditResult, CharacterVoice, VisualStyle, ImageEditOptions } from '../types';

// FIX: Use the official GenerateVideosOperation type from the SDK instead of a custom one.
const pollOperation = async (ai: GoogleGenAI, operation: GenerateVideosOperation): Promise<GenerateVideosOperation> => {
    let currentOperation = operation;
    while (!currentOperation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        try {
            currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
        } catch (error) {
            console.error("Error polling operation status:", error);
            throw new Error("Failed to get video generation status.");
        }
    }
    return currentOperation;
};

const buildPrompt = (
    userPrompt: string,
    enableSound: boolean,
    resolution: Resolution,
    characterVoice: CharacterVoice,
    visualStyle: VisualStyle
): string => {
    const instructions = [
        `- The video should be rendered in high quality, specifically ${resolution}.`,
        `- The video should ${enableSound ? 'include appropriate sound effects and ambient audio' : 'be silent'}.`
    ];

    if (characterVoice !== 'none') {
        instructions.push(`- If there is dialogue, the characters should speak in ${characterVoice === 'english' ? 'English' : 'Bahasa Indonesia'}.`);
    }

    if (visualStyle !== 'Realistic') {
        instructions.push(`- The visual style should be ${visualStyle}.`);
    }
    
    return `${userPrompt}\n\n--- Technical Directives ---\n${instructions.join('\n')}`;
};

// FIX: Removed apiKey parameter. API key must be retrieved from environment variables.
export const generateVideo = async (
    options: VideoGenerationOptions,
    aspectRatio: AspectRatio,
    enableSound: boolean,
    resolution: Resolution,
    characterVoice: CharacterVoice,
    visualStyle: VisualStyle
): Promise<string> => {
    // FIX: Initialize GoogleGenAI with API_KEY from process.env as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        // FIX: The API expects the prompt to be a string. If the prompt is a JSON object,
        // it must be stringified before being sent.
        const finalPrompt = typeof options.prompt === 'object'
            ? JSON.stringify(options.prompt)
            : buildPrompt(options.prompt, enableSound, resolution, characterVoice, visualStyle);
        
        const requestPayload: any = {
            model: options.model,
            prompt: finalPrompt,
            config: {
                numberOfVideos: 1,
                aspectRatio: aspectRatio,
            }
        };

        if (options.imageBase64 && options.imageMimeType) {
            requestPayload.image = {
                imageBytes: options.imageBase64,
                mimeType: options.imageMimeType,
            };
        }

        // FIX: Use the official GenerateVideosOperation type for the initial operation.
        let initialOperation: GenerateVideosOperation = await ai.models.generateVideos(requestPayload);
        const completedOperation = await pollOperation(ai, initialOperation);

        if (completedOperation.error) {
            throw new Error(`Video generation failed: ${completedOperation.error.message}`);
        }

        const downloadLink = completedOperation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error('Video generation finished but returned no downloadable URI.');
        }

        // FIX: Use process.env.API_KEY for fetching the video as per guidelines.
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download video file: ${videoResponse.statusText}`);
        }

        const videoBlob = await videoResponse.blob();

        // FIX: Add validation to ensure the downloaded content is actually a video.
        // This prevents corrupted files (e.g., error messages as text/json) from being processed,
        // which was causing the stitching process to fail with a 'No video track found' error.
        if (!videoBlob.type.startsWith('video/')) {
            const errorText = await videoBlob.text();
            console.error("Downloaded content is not a video:", errorText);
            throw new Error(`Downloaded file is not a valid video. The server may have returned an error: ${errorText.substring(0, 200)}`);
        }

        return URL.createObjectURL(videoBlob);
    } catch (error) {
        console.error("Error in generateVideo service:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred during video generation.");
    }
};

// FIX: Implement and export editImage function to resolve missing member error.
export const editImage = async (options: ImageEditOptions): Promise<ImageEditResult> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        if (options.model === 'gemini-2.5-flash-image-preview') {
            if (options.images.length === 0) {
                throw new Error("An image is required for editing.");
            }
            const imageParts = options.images.map(image => ({
                inlineData: {
                    data: image.imageBase64,
                    mimeType: image.imageMimeType,
                },
            }));

            const textPart = { text: options.prompt };

            const parts = [...imageParts, textPart];

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });
            
            let imageBase64: string | null = null;
            let text: string | null = null;

            if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        imageBase64 = part.inlineData.data;
                    } else if (part.text) {
                        text = part.text;
                    }
                }
            }

            if (!imageBase64) {
                 if (text) {
                    throw new Error(`Model responded with text instead of an image: ${text}`);
                }
                throw new Error('Image editing resulted in no image output.');
            }

            return { imageBase64, text };
        } else if (options.model === 'imagen-4.0-generate-001') {
            const response = await ai.models.generateImages({
                model: options.model,
                prompt: options.prompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/png',
                  ...(options.aspectRatio && { aspectRatio: options.aspectRatio }),
                },
            });

            if (!response.generatedImages || response.generatedImages.length === 0) {
                throw new Error('Image generation did not return any images.');
            }

            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return { imageBase64: base64ImageBytes, text: null };
        }
        
        throw new Error(`Unsupported image model: ${options.model}`);

    } catch (error) {
        console.error("Error in editImage service:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred during image editing.");
    }
};