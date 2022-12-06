import React from 'react';

interface ButtonCategoryProps {
  children: React.ReactNode | string;
  isActive?: boolean;
}

export const ButtonCategory: React.FC<ButtonCategoryProps> = ({
  isActive,
  children,
}) => {
  return (
    <button
      className={`rounded-full border-2 py-4 px-6 ${
        isActive
          ? 'bg-primary border-primary-dark text-white'
          : 'border-gray-300 bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};
