import React, { useState, useCallback, useEffect } from 'react';
import { editImage } from '../services/geminiService';
import Button from './Button';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';
import TextAreaInput from './TextAreaInput';
import { ImageEditResult, ImagePart, ImageModel, AspectRatio } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import SelectInput from './SelectInput';
import ImagePreviewModal from './ImagePreviewModal';
import RadioButtonGroup from './RadioButtonGroup';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });

const ImageEditor: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([]);
  const [imageModel, setImageModel] = useState<ImageModel>('gemini-2.5-flash-image-preview');
  const [imageAspectRatio, setImageAspectRatio] = useState<AspectRatio>('1:1');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editResult, setEditResult] = useState<ImageEditResult | null>(null);
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFiles.length > 0) {
      const urls = imageFiles.map(file => URL.createObjectURL(file));
      setOriginalImageUrls(urls);
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url))
      };
    } else {
        setOriginalImageUrls([]);
    }
  }, [imageFiles]);


  const handleFilesChange = useCallback((files: File[]) => {
    setImageFiles(files);
    setEditResult(null); // Clear previous result when new image is uploaded
    setError(null);
  }, []);

  const clearForm = useCallback(() => {
    setPrompt('');
    setImageFiles([]);
    setError(null);
    setEditResult(null);
    setImageModel('gemini-2.5-flash-image-preview');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError(t('instructionRequiredError'));
      return;
    }
    if (imageModel === 'gemini-2.5-flash-image-preview' && imageFiles.length === 0) {
      setError(t('imageRequiredError'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditResult(null);

    try {
      const imagePromises: Promise<ImagePart>[] = imageFiles.map(file => 
        fileToBase64(file).then(base64 => ({
          imageBase64: base64,
          imageMimeType: file.type,
        }))
      );

      const images = await Promise.all(imagePromises);
      const result = await editImage({
        prompt,
        images,
        model: imageModel,
        aspectRatio: imageModel === 'imagen-4.0-generate-001' ? imageAspectRatio : undefined
      });
      setEditResult(result);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(`${t('editingFailedError')} ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (editResult) {
      const imageUrl = `data:image/png;base64,${editResult.imageBase64}`;
      setPreviewImageUrl(imageUrl);
      setIsPreviewOpen(true);
    }
  };
  
  const handleModelChange = (model: ImageModel) => {
      setImageModel(model);
      if (model === 'imagen-4.0-generate-001') {
          setImageFiles([]);
      }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-6 border border-gray-700 self-start">
          <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">{t('imageEditingSettings')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
             <SelectInput<ImageModel>
                label={t('imageModelLabel')}
                value={imageModel}
                onChange={handleModelChange}
                options={[
                    { value: 'gemini-2.5-flash-image-preview', label: 'gemini-2.5-flash-image-preview (nano-banana)' },
                    { value: 'imagen-4.0-generate-001', label: 'imagen-4.0-generate-001' }
                ]}
            />
            {imageModel === 'imagen-4.0-generate-001' && (
                <RadioButtonGroup<AspectRatio>
                    label={t('aspectRatioLabel')}
                    name="image-aspect-ratio"
                    value={imageAspectRatio}
                    onChange={setImageAspectRatio}
                    options={[
                        { value: '16:9', label: t('aspectRatio16x9') },
                        { value: '9:16', label: t('aspectRatio9x16') },
                        { value: '1:1', label: t('aspectRatio1x1') },
                    ]}
                />
            )}
            {imageModel === 'gemini-2.5-flash-image-preview' && (
                <ImageUploader files={imageFiles} onFilesChange={handleFilesChange} maxFiles={5} />
            )}
            <TextAreaInput 
              label={t('editInstructionLabel')}
              value={prompt}
              onChange={setPrompt}
              placeholder={t('editInstructionPlaceholder')}
            />
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading || !prompt.trim() || (imageModel === 'gemini-2.5-flash-image-preview' && imageFiles.length === 0)} className="w-full text-lg">
                 {isLoading ? t('editingButton') : (imageModel === 'gemini-2.5-flash-image-preview' ? t('generateEditButton') : t('generateImageButton'))}
              </Button>
              <Button type="button" variant="secondary" onClick={clearForm} className="w-full text-lg">
                {t('clearButton')}
              </Button>
            </div>
          </form>
        </div>

        {/* Output Panel */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 min-h-[400px]">
           <div className={`grid grid-cols-1 ${imageModel === 'gemini-2.5-flash-image-preview' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 h-full`}>
                {imageModel === 'gemini-2.5-flash-image-preview' && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">{t('originalsTitle')}</h3>
                        <div className="w-full h-full bg-gray-900/50 rounded-md flex items-center justify-center p-2">
                            {originalImageUrls.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2 w-full">
                                    {originalImageUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`Original ${index + 1}`} className="w-full h-full object-contain rounded-md aspect-square bg-black" />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">{t('uploadImageToStart')}</p>
                            )}
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">{imageModel === 'gemini-2.5-flash-image-preview' ? t('editedTitle') : t('generatedTitle')}</h3>
                     <div className="w-full h-full bg-gray-900/50 rounded-md flex items-center justify-center p-2">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                                <Spinner className="h-10 w-10"/>
                                <p className="mt-4 text-sm font-semibold">{t('generatingImageMessage')}</p>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                                <p className="font-bold">{t('errorTitle')}</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        ) : editResult ? (
                           <div className="flex flex-col items-center justify-center gap-4 w-full">
                                <img 
                                    src={`data:image/png;base64,${editResult.imageBase64}`} 
                                    alt="Edited" 
                                    className="max-w-full max-h-[300px] object-contain rounded-md" 
                                />
                                {editResult.text && <p className="text-sm text-gray-300 italic text-center p-2 bg-gray-700/50 rounded-md">{editResult.text}</p>}
                                <div className="flex items-center gap-4 mt-2">
                                  <Button variant="secondary" onClick={handlePreview}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                    {t('previewButton')}
                                  </Button>
                                  <a href={`data:image/png;base64,${editResult.imageBase64}`} download="edited-image.png">
                                    <Button variant="primary">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                      {t('downloadButton')}
                                    </Button>
                                  </a>
                                </div>
                           </div>
                         ) : (
                            <div className="text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                <p className="mt-2 text-sm">{imageModel === 'gemini-2.5-flash-image-preview' ? t('imageEditedPlaceholder') : t('imageGeneratedPlaceholder')}</p>
                            </div>
                        )}
                    </div>
                </div>
           </div>
        </div>
      </div>
      {isPreviewOpen && previewImageUrl && (
        <ImagePreviewModal
            imageUrl={previewImageUrl}
            onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
};

export default ImageEditor;