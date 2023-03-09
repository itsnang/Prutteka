import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { Button, Modal, Typography } from 'ui';

import { useFormikContext, useField } from 'formik';
import getCroppedImg from './cropImage';

interface ImageUploadProps {
  t: any;
  lang: 'en' | 'kh';
  image_src: string;
  name: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  t,
  lang,
  image_src,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [percentCrop, setPercentCrop] = useState<Crop>();
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const aspect = 2 / 1;

  const [imageUrl, setImageUrl] = useState('');
  const [field, meta] = useField(name);

  // const [imageFile, setImageFile] = useState<Blob | null>(null);

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
          // setImageFile(img.file);
          setFieldValue(name, img.file);
        }
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative mx-auto flex aspect-[2/1] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-2 lg:h-96 lg:w-auto lg:py-20">
        {image_src ? (
          <Image
            src={imageUrl || image_src}
            className="-z-10 rounded-2xl bg-gray-100"
            fill
            alt="upload image"
            sizes={'100vh'}
          />
        ) : null}
        <label
          htmlFor="poster"
          className={`flex min-w-[16rem] items-center justify-center space-x-4 rounded-2xl py-4 backdrop-blur-sm sm:flex-col sm:space-x-0 ${
            image_src ? 'bg-gray-900/25 text-white' : 'text-gray-900'
          }`}
        >
          <div className="hidden flex-col items-center sm:flex">
            <PhotoIcon className="h-20 w-20 stroke-[0.75px]" />
            <Typography
              className={`text-base ${
                image_src ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.dragAndDrop[lang]}
            </Typography>
          </div>

          <input
            type="file"
            id="poster"
            value=""
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center">
            <Button
              type="button"
              icon={<PhotoIcon />}
              variant="secondary"
              className="pointer-events-none px-4 text-sm sm:mt-8 sm:px-6"
            >
              {t.uploadImage[lang]}
            </Button>
            <Typography
              className={`mt-2 text-sm ${
                image_src ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.upTo10mb[lang]}
            </Typography>
          </div>
        </label>
      </div>

      {meta.error && meta.touched && (
        <div className="text-red-600">{meta.error}</div>
      )}

      <Modal
        show={isOpen && !!imgSrc}
        onClose={() => {
          setIsOpen(false);
          setFieldTouched(name, true);
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
