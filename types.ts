// FIX: Removed self-import of `ImagePart` and `ImageEditResult` which caused a declaration conflict.

export type VeoModel = 'veo-3.0-generate-preview' | 'veo-3.0-generate-001' | 'veo-3.0-fast-generate-001' | 'veo-2.0-generate-001';
export type ImageModel = 'gemini-2.5-flash-image-preview' | 'imagen-4.0-generate-001';

export interface Scene {
  id: number;
  prompt: string;
  usePreviousScene: boolean;
  isJsonPrompt: boolean;
}

export interface VideoGenerationOptions {
  prompt: string | object;
  imageBase64: string | null;
  imageMimeType: string | null;
  model: VeoModel;
}

export interface ImageEditOptions {
  model: ImageModel;
  prompt: string;
  images: ImagePart[];
  aspectRatio?: AspectRatio;
}

export type AspectRatio = '16:9' | '9:16' | '1:1';
// FIX: Corrected typo in Resolution type from '100p' to '1080p'.
export type Resolution = '720p' | '1080p';
export type CharacterVoice = 'none' | 'english' | 'bahasa-indonesia';
export type VisualStyle = 'Realistic' | 'Cinematic' | 'Anime' | 'Pixar3D' | 'Cyberpunk' | "Retro 80's";

// FIX: Add ImagePart and ImageEditResult types to resolve missing member errors.
export interface ImagePart {
  imageBase64: string;
  imageMimeType: string;
}

export interface ImageEditResult {
  imageBase64: string;
  text: string | null;
}