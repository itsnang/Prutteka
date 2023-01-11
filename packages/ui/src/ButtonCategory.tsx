import React from 'react';

interface ButtonCategoryProps {
  children: React.ReactNode | string;
  isActive?: boolean;
  onClick?: () => void;
}

export const ButtonCategory: React.FC<ButtonCategoryProps> = ({
  isActive,
  children,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center rounded-full border-2 px-6 lg:h-14 ${
        isActive
          ? 'bg-primary-light border-primary text-primary font-medium'
          : 'border-gray-300 bg-gray-100'
      }`}
      style={{
        whiteSpace: 'nowrap',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
