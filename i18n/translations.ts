export type TranslationKeys = {
  // App
  appTitle: string;
  footerText: string;
  videoGeneratorTab: string;
  imageEditorTab: string;
  
  // Video Generator
  videoGenerationSettings: string;
  settingsTitle: string;
  scenesTitle: string;
  promptLabel: string;
  promptPlaceholder: string;
  veoModelLabel: string;
  visualStyleLabel: string;
  styleRealistic: string;
  styleCinematic: string;
  styleAnime: string;
  stylePixar3D: string;
  styleCyberpunk: string;
  styleRetro80s: string;
  characterVoiceLabel: string;
  voiceNone: string;
  voiceEnglish: string;
  voiceIndonesian: string;
  aspectRatioLabel: string;
  aspectRatio16x9: string;
  aspectRatio9x16: string;
  aspectRatio1x1: string;
  resolutionLabel: string;
  resolution720p: string;
  resolution1080p: string;
  enableSoundLabel: string;
  generatingButton: string;
  generateVideoButton: string;
  errorTitle: string;
  generationFailedError: string;
  videoPlaceholder: string;
  promptRequiredError: string;
  promptRequiredForSceneError: string;
  addSceneButton: string;
  usePreviousSceneLabel: string;
  sceneLabel: string;
  generatingScene: string;
  generatingSceneShort: string;
  scenePending: string;
  resultsTitle: string;
  stopButton: string;
  stoppingButton: string;
  generationStoppedByUser: string;
  jsonPromptCheckboxLabel: string;
  jsonPromptInfoText: string;

  // Video Player
  downloadVideoButton: string;
  createAnotherButton: string;

  // Image Uploader
  removeButton: string;
  changeImageButton: string;
  addMoreImagesButton: string;
  uploadMultipleImagesHint: string;
  uploadSingleImageHint: string;
  browseFilesButton: string;

  // Image Editor
  imageModelLabel: string;
  imageEditingSettings: string;
  editInstructionLabel: string;
  editInstructionPlaceholder: string;
  editingButton: string;
  generateEditButton: string;
  generateImageButton: string;
  generatingImageMessage: string;
  clearButton: string;
  originalsTitle: string;
  uploadImageToStart: string;
  editedTitle: string;
  generatedTitle: string;
  editingFailedError: string;
  imageEditedPlaceholder: string;
  imageGeneratedPlaceholder: string;
  previewButton: string;
  downloadButton: string;
  instructionRequiredError: string;
  imageRequiredError: string;

  // Image Preview Window
  imagePreviewTitle: string;
  imagePreviewAlt: string;
  closePreviewLabel: string;

  // JSON Import Modal
  importJsonTitle: string;
  importJsonDescription: string;
  importJsonDescriptionSingle: string;
  importJsonPlaceholder: string;
  cancelButton: string;
  importButton: string;
  jsonEmptyError: string;
  jsonFormatError: string;
  jsonInvalidObjectFormatError: string;
  jsonInvalidError: string;
  jsonSingleSceneError: string;

  // Loading Screen
  generatingVideoTitle: string;
  loadingMessage1: string;
  loadingMessage2:string;
  loadingMessage3:string;
  loadingMessage4:string;
  loadingMessage5:string;
  loadingMessage6:string;
  loadingMessage7:string;
  loadingMessage8:string;

  // Language Switcher
  languageEnglish: string;
  languageIndonesian: string;
};

type TranslationValues = { [key: string]: string | number };

export const translations: Record<'en' | 'id', TranslationKeys> = {
  en: {
    appTitle: 'VEO Video Generator',
    footerText: 'Powered by Google Gemini. UI designed for creativity.',
    videoGeneratorTab: 'Video Generator',
    imageEditorTab: 'Image Editor',
    videoGenerationSettings: 'Video Generation Settings',
    settingsTitle: 'Settings',
    scenesTitle: 'Scenes',
    promptLabel: 'Prompt',
    promptPlaceholder: 'Describe your scene...',
    veoModelLabel: 'Model',
    visualStyleLabel: 'Visual Style',
    styleRealistic: 'Realistic',
    styleCinematic: 'Cinematic',
    styleAnime: 'Anime',
    stylePixar3D: 'Pixar 3D',
    styleCyberpunk: 'Cyberpunk',
    styleRetro80s: "Retro 80's",
    characterVoiceLabel: 'Character Voice',
    voiceNone: 'None',
    voiceEnglish: 'English',
    voiceIndonesian: 'Bahasa Indonesia',
    aspectRatioLabel: 'Aspect Ratio',
    aspectRatio16x9: '16:9',
    aspectRatio9x16: '9:16',
    aspectRatio1x1: '1:1',
    resolutionLabel: 'Resolution',
    resolution720p: '720p',
    resolution1080p: '1080p',
    enableSoundLabel: 'Sound',
    generatingButton: 'Generating...',
    generateVideoButton: 'Generate',
    errorTitle: 'Error',
    generationFailedError: 'Generation Failed:',
    videoPlaceholder: 'Your generated videos will appear here.',
    promptRequiredError: 'Please enter a prompt.',
    promptRequiredForSceneError: 'Please enter a prompt for all scenes.',
    addSceneButton: 'Add Scene',
    usePreviousSceneLabel: 'Use last frame',
    sceneLabel: 'Scene',
    generatingScene: 'Generating Scene {current} of {total}...',
    generatingSceneShort: 'Generating...',
    scenePending: 'Queued',
    resultsTitle: 'Results',
    stopButton: 'Stop',
    stoppingButton: 'Stopping...',
    generationStoppedByUser: 'Generation was stopped by the user.',
    jsonPromptCheckboxLabel: 'JSON Prompt',
    jsonPromptInfoText: '(check if prompt is JSON)',
    downloadVideoButton: 'Download',
    createAnotherButton: 'Start New Project',
    removeButton: 'Remove',
    changeImageButton: 'Change Image',
    addMoreImagesButton: 'Add More Images',
    uploadMultipleImagesHint: 'Upload one or more reference images',
    uploadSingleImageHint: 'Click or Drop to upload an image',
    browseFilesButton: 'Browse Files',
    imageModelLabel: 'Image Model',
    imageEditingSettings: 'Image Editing Settings',
    editInstructionLabel: 'Edit Instruction',
    editInstructionPlaceholder: 'e.g., Add a llama next to the person',
    editingButton: 'Editing...',
    generateEditButton: 'Generate Edit',
    generateImageButton: 'Generate Image',
    generatingImageMessage: 'Generating your image...',
    clearButton: 'Clear',
    originalsTitle: 'Original(s)',
    uploadImageToStart: 'Upload an image to start',
    editedTitle: 'Edited',
    generatedTitle: 'Generated',
    editingFailedError: 'Editing Failed:',
    imageEditedPlaceholder: 'Your edited image will appear here.',
    imageGeneratedPlaceholder: 'Your generated image will appear here.',
    previewButton: 'Preview',
    downloadButton: 'Download',
    instructionRequiredError: 'Please enter an editing instruction.',
    imageRequiredError: 'Please upload at least one image to edit.',
    imagePreviewTitle: 'Image Preview',
    imagePreviewAlt: 'Generated Preview',
    closePreviewLabel: 'Close preview',
    importJsonTitle: 'Import Scenes from JSON',
    importJsonDescription: 'Paste a JSON array of scene objects (e.g., `[{"prompt": "..."}]`) or a single detailed prompt object to import multiple scenes.',
    importJsonDescriptionSingle: 'Paste a JSON object with a `prompt` key, or a detailed prompt object, to import a single scene.',
    importJsonPlaceholder: 'Paste JSON here...',
    cancelButton: 'Cancel',
    importButton: 'Import',
    jsonEmptyError: 'JSON is empty or contains no valid scenes.',
    jsonFormatError: 'Invalid scene format in JSON array.',
    jsonInvalidObjectFormatError: 'Invalid JSON object. Must contain text values to form a prompt.',
    jsonInvalidError: 'Invalid JSON format.',
    jsonSingleSceneError: 'Only a single scene can be imported in this mode.',
    generatingVideoTitle: 'Generating Your Video',
    loadingMessage1: "Warming up the VEO engine...",
    loadingMessage2: "Composing your visual story...",
    loadingMessage3: "Rendering pixels into motion...",
    loadingMessage4: "This can take a few minutes, please be patient.",
    loadingMessage5: "Analyzing your creative prompt...",
    loadingMessage6: "Gathering visual elements...",
    loadingMessage7: "The final result will be worth the wait!",
    loadingMessage8: "Stitching frames together...",
    languageEnglish: 'English',
    languageIndonesian: 'Bahasa Indonesia',
  },
  id: {
    appTitle: 'VEO Video Generator',
    footerText: 'Didukung oleh Google Gemini. UI dirancang untuk kreativitas.',
    videoGeneratorTab: 'Generator Video',
    imageEditorTab: 'Editor Gambar',
    videoGenerationSettings: 'Pengaturan Pembuatan Video',
    settingsTitle: 'Pengaturan',
    scenesTitle: 'Adegan',
    promptLabel: 'Prompt',
    promptPlaceholder: 'Jelaskan adegan Anda...',
    veoModelLabel: 'Model',
    visualStyleLabel: 'Gaya Visual',
    styleRealistic: 'Realistik',
    styleCinematic: 'Sinematik',
    styleAnime: 'Anime',
    stylePixar3D: 'Pixar 3D',
    styleCyberpunk: 'Cyberpunk',
    styleRetro80s: "Retro 80-an",
    characterVoiceLabel: 'Suara Karakter',
    voiceNone: 'Tidak ada',
    voiceEnglish: 'Bahasa Inggris',
    voiceIndonesian: 'Bahasa Indonesia',
    aspectRatioLabel: 'Rasio Aspek',
    aspectRatio16x9: '16:9',
    aspectRatio9x16: '9:16',
    aspectRatio1x1: '1:1',
    resolutionLabel: 'Resolusi',
    resolution720p: '720p',
    resolution1080p: '1080p',
    enableSoundLabel: 'Suara',
    generatingButton: 'Membuat...',
    generateVideoButton: 'Buat Video',
    errorTitle: 'Kesalahan',
    generationFailedError: 'Pembuatan Gagal:',
    videoPlaceholder: 'Video yang Anda buat akan muncul di sini.',
    promptRequiredError: 'Silakan masukkan prompt.',
    promptRequiredForSceneError: 'Silakan masukkan prompt untuk semua adegan.',
    addSceneButton: 'Tambah Adegan',
    usePreviousSceneLabel: 'Gunakan frame terakhir',
    sceneLabel: 'Adegan',
    generatingScene: 'Membuat Adegan {current} dari {total}...',
    generatingSceneShort: 'Membuat...',
    scenePending: 'Dalam antrian',
    resultsTitle: 'Hasil',
    stopButton: 'Hentikan',
    stoppingButton: 'Menghentikan...',
    generationStoppedByUser: 'Pembuatan dihentikan oleh pengguna.',
    jsonPromptCheckboxLabel: 'Prompt JSON',
    jsonPromptInfoText: '(centang jika prompt adalah JSON)',
    downloadVideoButton: 'Unduh',
    createAnotherButton: 'Mulai Proyek Baru',
    removeButton: 'Hapus',
    changeImageButton: 'Ubah Gambar',
    addMoreImagesButton: 'Tambah Gambar Lagi',
    uploadMultipleImagesHint: 'Unggah satu atau lebih gambar referensi',
    uploadSingleImageHint: 'Klik atau Lepas untuk mengunggah gambar',
    browseFilesButton: 'Cari File',
    imageModelLabel: 'Model Gambar',
    imageEditingSettings: 'Pengaturan Edit Gambar',
    editInstructionLabel: 'Instruksi Edit',
    editInstructionPlaceholder: 'contoh: Tambahkan llama di sebelah orang itu',
    editingButton: 'Mengedit...',
    generateEditButton: 'Buat Editan',
    generateImageButton: 'Buat Gambar',
    generatingImageMessage: 'Sedang membuat gambar Anda...',
    clearButton: 'Bersihkan',
    originalsTitle: 'Asli',
    uploadImageToStart: 'Unggah gambar untuk memulai',
    editedTitle: 'Diedit',
    generatedTitle: 'Dihasilkan',
    editingFailedError: 'Pengeditan Gagal:',
    imageEditedPlaceholder: 'Gambar yang diedit akan muncul di sini.',
    imageGeneratedPlaceholder: 'Gambar yang dihasilkan akan muncul di sini.',
    previewButton: 'Pratinjau',
    downloadButton: 'Unduh',
    instructionRequiredError: 'Silakan masukkan instruksi pengeditan.',
    imageRequiredError: 'Silakan unggah setidaknya satu gambar untuk diedit.',
    imagePreviewTitle: 'Pratinjau Gambar',
    imagePreviewAlt: 'Pratinjau yang Dihasilkan',
    closePreviewLabel: 'Tutup pratinjau',
    importJsonTitle: 'Impor Adegan dari JSON',
    importJsonDescription: 'Tempel array JSON dari objek adegan (misalnya, `[{"prompt": "..."}]`) atau objek prompt terperinci tunggal untuk mengimpor beberapa adegan.',
    importJsonDescriptionSingle: 'Tempel objek JSON dengan kunci `prompt`, atau objek prompt terperinci, untuk mengimpor satu adegan.',
    importJsonPlaceholder: 'Tempel JSON di sini...',
    cancelButton: 'Batal',
    importButton: 'Impor',
    jsonEmptyError: 'JSON kosong atau tidak berisi adegan yang valid.',
    jsonFormatError: 'Format adegan tidak valid dalam array JSON.',
    jsonInvalidObjectFormatError: 'Objek JSON tidak valid. Harus berisi nilai teks untuk membentuk prompt.',
    jsonInvalidError: 'Format JSON tidak valid.',
    jsonSingleSceneError: 'Hanya satu adegan yang dapat diimpor dalam mode ini.',
    generatingVideoTitle: 'Membuat Video Anda',
    loadingMessage1: "Memanaskan mesin VEO...",
    loadingMessage2: "Menyusun cerita visual Anda...",
    loadingMessage3: "Merender piksel menjadi gerakan...",
    loadingMessage4: "Ini bisa memakan waktu beberapa menit, harap bersabar.",
    loadingMessage5: "Menganalisis prompt kreatif Anda...",
    loadingMessage6: "Mengumpulkan elemen visual...",
    loadingMessage7: "Hasil akhirnya akan sepadan dengan penantian!",
    loadingMessage8: "Menyatukan frame...",
    languageEnglish: 'English',
    languageIndonesian: 'Bahasa Indonesia',
  },
};