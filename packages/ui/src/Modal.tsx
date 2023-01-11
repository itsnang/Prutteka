import React, { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  children: React.ReactNode | string;
  show: boolean;
  title?: string;
  className?: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
  className = '',
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="opa flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="duration-[25ms]"
              enterFrom="opacity-90 scale-105"
              enterTo="opacity-100 scale-100"
              entered="animate-pop"
              leave="duration-75 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  'w-full max-w-xl transform rounded-2xl bg-white px-6 pt-6 pb-8 text-left align-middle shadow-xl transition-all ' +
                  className
                }
              >
                <Dialog.Title
                  as="h3"
                  className="items-between flex justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  <span>{title}</span>
                  <button onClick={onClose}>
                    <XMarkIcon width={24} />
                  </button>
                </Dialog.Title>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
