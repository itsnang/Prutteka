import React from 'react';

interface ButtonProps extends Partial<React.HTMLAttributes<HTMLButtonElement>> {
  children: React.ReactNode | string;
  variant?: 'primary' | 'secondary';
  className?: string;
  hasShadow?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

//User must pass in at least one children or one icon or both but cannot missing both
type RequireProperty<T, Prop extends keyof T> = T & { [key in Prop]-?: T[key] };
type RequireChildrenOrIcon =
  | RequireProperty<ButtonProps, 'children'>
  | RequireProperty<ButtonProps, 'icon'>;

const variantClassname = {
  primary: 'bg-primary text-white',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const Button: React.FC<RequireChildrenOrIcon> = ({
  children,
  variant = 'primary',
  className,
  hasShadow = false,
  icon,
  ...props
}) => {
  const Icon = icon;
  const iconClassName = `h-6 w-6 ${children ? 'mr-[0.625rem]' : ''}`;
  return (
    <button
      className={`h-13 flex min-w-[3.25rem] items-center justify-center rounded-2xl px-1 font-medium ${
        variantClassname[variant]
      } ${className || ''} ${hasShadow ? 'shadow-inner' : ''}`}
      {...props}
    >
      {Icon ? <Icon className={iconClassName} /> : null}
      {children}
    </button>
  );
};
