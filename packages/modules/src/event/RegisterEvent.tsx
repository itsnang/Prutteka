import React, { useState } from 'react';
import { QrCodeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

import axios from 'axios';
import { useTokenStore } from '../auth';

interface RegisterEventProps {
  eventId: string;
}

export const RegisterEvent: React.FC<RegisterEventProps> = ({ eventId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegister] = useState(false);
  const token = useTokenStore((state) => state.token);

  const handleRegisterEvent = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/events/${eventId}/register`,
        {},
        { headers: { Authorization: 'Bearer ' + token } }
      );

      setIsRegister(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-10 -translate-x-1/2">
      <button
        disabled={isRegistered}
        onClick={handleRegisterEvent}
        className={`${
          isRegistered
            ? 'bg-secondary-light text-secondary border-secondary border'
            : 'bg-secondary'
        } inline-flex h-14 items-center justify-center space-x-4 rounded-2xl text-white shadow-md transition-all duration-500`}
        style={{ paddingInline: isLoading ? '1rem' : '8rem' }}
      >
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {isRegistered ? (
              <CheckCircleIcon className="h-6 w-6" />
            ) : (
              <QrCodeIcon className="h-6 w-6" />
            )}
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
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
