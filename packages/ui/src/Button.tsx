import React, { ReactElement, Ref, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string;
  variant?: 'primary' | 'secondary';
  className?: string;
  hasShadow?: boolean;
  fullWidth?: boolean;
  roundedFull?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
  icon?: ReactElement;
}

//User must pass in at least one children or one icon or both but cannot missing both
type RequireProperty<T, Prop extends keyof T> = T & { [key in Prop]-?: T[key] };
type RequireChildrenOrIcon =
  | (RequireProperty<ButtonProps, 'children'> & RequireLinkProp)
  | (RequireProperty<ButtonProps, 'icon'> & RequireLinkProp);

type RequireLinkProp =
  | { as: 'link'; href: LinkProps['href'] }
  | { as?: 'button'; href?: null };

const variantClassname = {
  primary: 'bg-primary text-white border border-[#ff338b]',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const Button = forwardRef(
  (
    {
      as = 'button',
      children,
      variant = 'primary',
      className,
      hasShadow = false,
      icon,
      href,
      fullWidth,
      iconClassName = '',
      roundedFull,
      isLoading = false,
      ...props
    }: RequireChildrenOrIcon,
    ref?: Ref<HTMLButtonElement>
  ) => {
    iconClassName = `sm:h-6 ${iconClassName} h-5 w-5 sm:w-6 ${
      children ? 'mr-[0.625rem]' : ''
    }`;
    const componentClassname = `${
      variant === 'primary' && hasShadow
        ? 'sm:h-[calc(3.5rem-4px)] h-[calc(3rem-4px)] pt-[4px]'
        : 'sm:h-14 h-12'
    } inline-flex min-w-[3rem] sm:min-w-[3.5rem] items-center justify-center font-medium ${
      variantClassname[variant]
    } ${fullWidth ? 'w-full' : ''} ${className ? className : ''} ${
      hasShadow ? 'shadow-inner' : ''
    } ${roundedFull ? 'rounded-full' : 'rounded-xl lg:rounded-2xl'} ${
      icon ? 'gap-4' : ''
    } disabled:bg-opacity-20 transition-transform duration-75 active:scale-95`;

    if (as === 'link') {
      return (
        <Link href={href ?? ''} className={componentClassname}>
          {icon ? React.cloneElement(icon, { className: iconClassName }) : null}
          {typeof children === 'string' ? children : null}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={componentClassname}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className={`text-primary h-5 w-5 animate-spin`}
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
        ) : (
          <>
            {icon
              ? React.cloneElement(icon, { className: iconClassName })
              : null}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
