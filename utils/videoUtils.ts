export const getLastFrameAsBase64 = (videoUrl: string): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = "anonymous";
    video.src = videoUrl;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return reject(new Error('Could not get canvas context.'));
    }

    video.onloadedmetadata = () => {
      video.currentTime = video.duration > 0.1 ? video.duration - 0.1 : 0;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    video.onseeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      resolve({ base64, mimeType: 'image/jpeg' });
    };

    video.onerror = () => {
      reject(new Error('Failed to load video for frame capture.'));
    };
  });
};

export const isValidJson = (str: string): boolean => {
    const trimmedStr = str.trim();
    if (!((trimmedStr.startsWith('{') && trimmedStr.endsWith('}')) || (trimmedStr.startsWith('[') && trimmedStr.endsWith(']')))) {
        return false;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
