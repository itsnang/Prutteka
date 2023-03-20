import { useState, useRef } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { Button, Modal } from 'ui';
import NextImage from 'next/image';

interface Options {
  aspect?: number;
  className?: string;
  onSubmit?: () => void;
}

export const useImageCrop = ({
  aspect = 2,
  className = '',
  onSubmit,
}: Options = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [percentCrop, setPercentCrop] = useState<Crop>();
  const inputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const handleFileInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.currentTarget?.files && e.currentTarget?.files[0]) {
      const file = e.currentTarget.files[0];

      reader.onload = function () {
        setImgSrc(reader.result?.toString() || '');
      };

      reader.readAsDataURL(file);
      setIsOpen(true);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setPercentCrop(centerAspectCrop(width, height, aspect));
  };

  const handleGetCropImage = async () => {
    try {
      if (percentCrop?.height && percentCrop?.width && imgSrc) {
        const img = await getCroppedImg(imgSrc, percentCrop);

        if (img?.url && img?.file) {
          setImageUrl(img.url);
          setImageFile(img.file);
        }
        setIsOpen(false);
        onSubmit && onSubmit();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    ImageCropModal: (
      <>
        <input
          type="file"
          id="poster"
          value=""
          className="hidden"
          onChange={handleFileInput}
          ref={inputRef}
        />
        <Modal
          show={isOpen && !!imgSrc}
          onClose={() => setIsOpen(false)}
          className={`${className}`}
        >
          <ReactCrop
            aspect={aspect}
            crop={percentCrop}
            onChange={(_, percentCrop) => setPercentCrop(percentCrop)}
          >
            <NextImage
              alt="crop image"
              src={imgSrc}
              width={1000}
              height={1000}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <div className="mt-6 flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              className="px-6"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" className="px-6" onClick={handleGetCropImage}>
              Crop
            </Button>
          </div>
        </Modal>
      </>
    ),

    //@ts-ignore
    openCropModal: () => inputRef.current.click(),
    imageFile,
    imageUrl,
  };
};

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
  });

async function getCroppedImg(
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
