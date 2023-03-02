import React, { useState } from 'react';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export const RegisterEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 z-10 -translate-x-1/2">
      <button
        onClick={() => {
          setIsLoading((prev) => !prev);
        }}
        className={`bg-secondary inline-flex h-14 items-center justify-center space-x-2 rounded-2xl text-white shadow-md transition-all duration-500`}
        style={{ paddingInline: isLoading ? '1rem' : '8rem' }}
      >
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <QrCodeIcon className="h-6 w-6" />
            <span>Register</span>
          </>
        )}
      </button>
    </div>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
