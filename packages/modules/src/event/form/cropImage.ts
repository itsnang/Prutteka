import { Crop } from 'react-image-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
  });

export default async function getCroppedImg(
  imageSrc: string,
  percentCrop: Crop
): Promise<{
  file: Blob;
  url: string;
} | null> {
  const image = await createImage(imageSrc);

  const cropWidth = (percentCrop.width / 100) * image.width;
  const cropHeight = (percentCrop.height / 100) * image.height;
  const cropX = (percentCrop.x / 100) * image.width;
  const cropY = (percentCrop.y / 100) * image.height;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  if (ctx === null) {
    return null;
  }

  ctx?.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // return file as Blob and Url
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const previewUrl = URL.createObjectURL(blob);
        resolve({ file: blob, url: previewUrl });
      }
    }, 'image/jpeg');
  });
}
