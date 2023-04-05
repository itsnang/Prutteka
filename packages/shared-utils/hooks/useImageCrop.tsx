import React, { useState } from 'react';
import Image from 'next/image';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';

import { Modal } from 'ui';
import getCroppedImg from '../form/crop-image';

export const useImageCrop = (
  imageSrc: string,
  onCrop?: (
    image: {
      file: Blob;
      url: string;
    } | null
  ) => void
) => {
  const aspect = 2 / 1;
  const [isOpen, setIsOpen] = useState(false);
  const [percentCrop, setPercentCrop] = useState<Crop>();
  const [cropImageFile, setCropImageFile] = useState<Blob | null>(null);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setPercentCrop(centerAspectCrop(width, height, aspect));
  };

  const handleGetCropImage = async () => {
    try {
      if (percentCrop?.height && percentCrop?.width && imageSrc) {
        const img = await getCroppedImg(imageSrc, percentCrop);

        if (img?.url && img?.file) {
          setCropImageSrc(img.url);
          setCropImageFile(img.file);
          onCrop && onCrop(img);
        }
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ImageCropModal: (
      <Modal
        show={isOpen && !!imageSrc}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ReactCrop
          aspect={aspect}
          crop={percentCrop}
          onChange={(_, percentCrop) => setPercentCrop(percentCrop)}
        >
          <Image
            alt="crop image"
            src={imageSrc}
            width={800}
            height={800}
            onLoad={onImageLoad}
          />
        </ReactCrop>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-6"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button type="button" className="px-6" onClick={handleGetCropImage}>
            Crop
          </button>
        </div>
      </Modal>
    ),
    openImageCropModal: () => setIsOpen(true),
    cropImageFile,
    cropImageSrc,
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
