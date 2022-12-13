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
      className={`h-14 rounded-full border-2 px-6 ${
        isActive
          ? 'bg-primary border-primary-dark font-medium text-white'
          : 'border-gray-300 bg-gray-100'
      }`}
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
};
