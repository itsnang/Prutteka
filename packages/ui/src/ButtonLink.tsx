import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode | string;
  varaint?: 'primary' | 'secondary';
  href: string;
}

const varaintClassname = {
  primary: 'bg-primary text-white shadow-inner',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const ButtonLink: React.FC<ButtonProps> = ({
  varaint = 'primary',
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`rounded-2xl px-8 py-4 font-medium ${varaintClassname[varaint]}`}
    >
      {children}
    </Link>
  );
};
