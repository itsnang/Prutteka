import React from 'react';
import { Modal } from 'ui';
import Image, { StaticImageData } from 'next/image';

interface CheckoutModalProps {
  img: string;
  show: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  img,
  onClose,
  show,
}) => {
  return (
    <Modal title="Check out" onClose={onClose} show={show}>
      <div className="flex justify-center overflow-hidden rounded-2xl bg-gray-100">
        <div className="relative aspect-[2/1] h-32 w-full rounded-2xl shadow-xl shadow-gray-300 sm:h-48 md:h-auto md:w-[27rem]">
          <Image
            alt="ShareModalImage"
            src={img}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </Modal>
  );
};
