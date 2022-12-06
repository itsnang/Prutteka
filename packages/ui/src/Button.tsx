import React from 'react';

interface ButtonProps {
  children: React.ReactNode | string;
  varaint?: 'primary' | 'secondary';
}

const varaintClassname = {
  primary: 'bg-primary text-white shadow-inner',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const Button: React.FC<ButtonProps> = ({
  varaint = 'primary',
  children,
}) => {
  return (
    <button
      className={`rounded-2xl px-8 py-4 font-medium ${varaintClassname[varaint]}`}
    >
      {children}
    </button>
  );
};
