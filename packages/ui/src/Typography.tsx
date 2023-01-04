import React from 'react';

interface StyleClassName {
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  color?:
    | 'dark'
    | 'base'
    | 'light'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'black';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps extends Partial<React.HTMLAttributes<HTMLElement>> {
  variant?: Variant;
  size?: StyleClassName['size'];
  color?: StyleClassName['color'];
  weight?: StyleClassName['weight'];
  className?: string;
  children: string | React.ReactNode;
}

type VariantMapping = { [Property in Variant]: StyleClassName };

const variantMapping: VariantMapping = {
  h1: {
    size: '6xl',
    color: 'dark',
    weight: 'bold',
  },
  h2: {
    size: '5xl',
    color: 'dark',
    weight: 'semibold',
  },
  h3: {
    size: '4xl',
    color: 'dark',
    weight: 'medium',
  },
  h4: {
    size: '3xl',
    color: 'dark',
    weight: 'medium',
  },
  h5: {
    size: '2xl',
    color: 'dark',
    weight: 'medium',
  },
  h6: {
    size: 'xl',
    color: 'dark',
    weight: 'medium',
  },
  p: {
    size: 'base',
    color: 'base',
    weight: 'normal',
  },
  span: {
    size: 'sm',
    color: 'light',
    weight: 'light',
  },
  div: {
    size: 'base',
    color: 'base',
    weight: 'normal',
  },
};

const sizesMapping = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const colorMapping = {
  dark: 'text-gray-900',
  base: 'text-gray-700',
  light: 'text-gray-500',
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  white: 'text-white',
  black: 'text-black',
};

const weightMapping = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  size,
  color,
  weight,
  className = '',
  children = '',
  ...props
}) => {
  const defaultClassName = variantMapping[variant];
  const {
    size: defaultSize,
    color: defaultColor,
    weight: defaultWeight,
  } = defaultClassName;

  const Component = variant;
  const sizeClassName = size
    ? sizesMapping[size]
    : sizesMapping[defaultSize || 'base'];
  const colorClassName = color
    ? colorMapping[color]
    : colorMapping[defaultColor || 'base'];
  const weightClassName = weight
    ? weightMapping[weight]
    : weightMapping[defaultWeight || 'normal'];

  return (
    <Component
      className={`${sizeClassName} ${colorClassName} ${weightClassName} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
