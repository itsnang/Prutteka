import React, { useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  children: React.ReactNode | string;
  show: boolean;
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document) {
      if (show) document.body.classList.add('overflow-hidden');
      else document.body.classList.remove('overflow-hidden');
    }
  }, [show]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef?.current?.contains(e.target as Node)) onClose();
  };

  if (show)
    return (
      <div
        style={{
          margin: 0,
          translate: 0,
          transform: 'translate(0)',
          padding: 0,
          top: 0,
          left: 0,
        }}
        className="fixed top-0 left-0 flex h-screen w-screen translate-x-2 items-center justify-center bg-black bg-opacity-25"
        onClick={handleClickOutside}
      >
        <div className="space-y-6 rounded-2xl bg-white p-6" ref={modalRef}>
          <div className="flex justify-between">
            <h4>{title}</h4>
            <button onClick={onClose}>
              <XMarkIcon width={24} />
            </button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    );
  return null;
};
