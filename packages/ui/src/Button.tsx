import React from 'react';

interface ButtonProps extends Partial<HTMLButtonElement> {
  children: React.ReactNode | string;
  varaint?: 'primary' | 'secondary';
  className?: string;
}

const varaintClassname = {
  primary: 'bg-primary text-white shadow-inner',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  varaint = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={`h-13 flex min-w-[3.25rem] items-center justify-center rounded-2xl font-medium ${
        varaintClassname[varaint]
      } ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
