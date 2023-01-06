import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { Button, Modal, Typography } from 'ui';

import { Field } from 'formik';
import getCroppedImg from './cropImage';

export const ImageUpload = ({ t, lang }: { t: any; lang: 'en' | 'kh' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [percentCrop, setPercentCrop] = useState<Crop>();
  const aspect = 2 / 1;

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative mx-auto flex aspect-[2/1] h-96 flex-col items-center justify-center gap-2.5 rounded-2xl border-2 py-20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="-z-10 rounded-2xl bg-gray-100"
            fill
            alt="upload image"
            sizes={'100vh'}
          />
        ) : null}
        <label
          htmlFor="details.img"
          className={`flex min-w-[16rem] flex-col items-center rounded-2xl py-2 backdrop-blur-sm ${
            imgSrc ? 'bg-gray-900/25 text-white' : 'text-gray-900'
          }`}
        >
          <PhotoIcon className="h-20 w-20 stroke-[0.75px]" />
          <Typography className={imgSrc ? 'text-white' : 'text-gray-900'}>
            {t.dragAndDrop[lang]}
          </Typography>
          <Field
            type="file"
            name="details.img"
            id="details.img"
            className="hidden"
            onChange={handleFileInput}
          />
          <Button
            type="button"
            icon={PhotoIcon}
            variant="secondary"
            className="pointer-events-none mt-8 px-6"
          >
            {t.uploadImage[lang]}
          </Button>
          <Typography
            className={`mt-2 ${imgSrc ? 'text-white' : 'text-gray-900'}`}
          >
            {t.upTo10mb[lang]}
          </Typography>
        </label>
      </div>

      <Modal
        show={isOpen && !!imgSrc}
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
  );
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
