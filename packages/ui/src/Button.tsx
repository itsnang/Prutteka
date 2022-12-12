import React from 'react';
import Link, { LinkProps } from 'next/link';

interface ButtonProps extends Partial<React.HTMLAttributes<HTMLButtonElement>> {
  children?: React.ReactNode | string;
  variant?: 'primary' | 'secondary';
  className?: string;
  hasShadow?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
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
  primary: 'bg-primary text-white',
  secondary: 'bg-white text-gray-900 border border-gray-200',
};

export const Button: React.FC<RequireChildrenOrIcon> = ({
  as = 'button',
  children,
  variant = 'primary',
  className,
  hasShadow = false,
  icon,
  href,
  ...props
}) => {
  const Icon = icon;
  const iconClassName = `h-6 w-6 ${children ? 'mr-[0.625rem]' : ''}`;
  const componentClassname = `h-14 inline-flex min-w-[3.5rem] items-center justify-center rounded-2xl px-1 font-medium 
    ${variantClassname[variant]} ${className ? className : ''}
    ${hasShadow ? 'shadow-inner' : ''}`;

  if (as === 'link') {
    return (
      <Link href={href ?? ''} className={componentClassname}>
        {typeof children === 'string' ? children : null}
      </Link>
    );
  }

  return (
    <button className={componentClassname} {...props}>
      {Icon ? <Icon className={iconClassName} /> : null}
      {children}
    </button>
  );
};
