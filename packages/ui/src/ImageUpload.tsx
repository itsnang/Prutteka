import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';

import { useField } from 'formik';
import { useImageCrop } from 'shared-utils/hooks';
import { useDropzone } from 'react-dropzone';
import { Message } from './Message';

interface ImageUploadProps {
  imageSrc: string;
  name: string;
  onCrop: (
    image: {
      file: Blob;
      url: string;
    } | null
  ) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageSrc,
  name,
  onCrop,
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [_, meta] = useField(name);
  const { ImageCropModal, cropImageSrc, openImageCropModal } = useImageCrop(
    imgSrc,
    (image) => onCrop && onCrop(image)
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/webp': [],
      'image/jfif': [],
    },
    onDrop: (files) => {
      const reader = new FileReader();
      if (files && files[0]) {
        const file = files[0];

        reader.onload = function () {
          setImgSrc(reader.result?.toString() || '');
        };

        reader.readAsDataURL(file);
        openImageCropModal();
      }
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative mx-auto flex aspect-[2/1] w-full max-w-3xl items-center justify-center rounded-2xl border border-gray-200 transition-all duration-200 ${
          isDragActive ? 'ring-primary bg-gray-50 ring' : 'bg-white'
        }`}
      >
        <input {...getInputProps()} multiple={false} />
        {cropImageSrc || imageSrc ? (
          <Image
            src={cropImageSrc || imageSrc}
            className="z-0 rounded-2xl bg-gray-100 object-cover"
            fill
            alt="upload image"
            sizes={'100vh'}
          />
        ) : null}
        <div
          className={`z-10 flex cursor-pointer flex-col items-center justify-center rounded-xl border transition-all duration-200 sm:p-4 ${
            isDragActive || cropImageSrc || imageSrc
              ? 'border-gray-100/25 bg-gray-900/25 text-white'
              : 'border-gray-200 bg-gray-100 text-gray-700'
          }`}
        >
          <PhotoIcon className="h-10 w-10 stroke-[0.75px] sm:h-20 sm:w-20" />
          <p className="p-4 text-center text-sm sm:text-base">
            Drag & drop your image here <br />
            or click to select image
          </p>
          <div
            className={`hidden rounded-xl border px-4 py-2 sm:block ${
              isDragActive || cropImageSrc || imageSrc
                ? 'border-gray-100/25 bg-gray-900/20 text-white'
                : 'border-gray-200 bg-white text-gray-700'
            }`}
          >
            Select image
          </div>
        </div>
      </div>

      {meta.error && meta.touched && (
        <Message variant="error">{meta.error}</Message>
      )}
      {ImageCropModal}
    </>
  );
};
