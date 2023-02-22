import React, { ReactElement } from 'react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface MessageProps {
  children: ReactElement | string;
  variant: 'error' | 'success';
}

const variantMapping = {
  error: {
    icon: <XCircleIcon />,
    className: 'bg-primary-light text-primary',
  },
  success: {
    icon: <CheckCircleIcon />,
    className: 'bg-secondary-light text-secondary',
  },
};

export const Message: React.FC<MessageProps> = ({ children, variant }) => {
  return (
    <div
      className={`${variantMapping[variant].className} flex items-center gap-2 rounded-2xl p-4`}
    >
      {React.cloneElement(variantMapping[variant].icon, {
        className: 'w-6 h-6 flex-shrink-0',
      })}
      {children}
    </div>
  );
};
