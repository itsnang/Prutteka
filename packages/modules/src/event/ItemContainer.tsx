import { ReactNode } from 'react';

interface ItemContainerProp {
  className?: string;
  children: ReactNode;
}

export const ItemContainer: React.FC<ItemContainerProp> = ({
  className,
  children,
}) => {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-sm lg:p-6 ${className}`}>
      {children}
    </div>
  );
};
