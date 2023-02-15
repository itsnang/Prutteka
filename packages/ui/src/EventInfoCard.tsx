import React, { ReactElement } from 'react';

interface EventInfoCardProp {
  className?: string;
  icon: ReactElement;
  iconClassName?: string;
  children: React.ReactNode | string;
}

export const EventInfoCard: React.FC<EventInfoCardProp> = ({
  className,
  icon,
  iconClassName,
  children,
}) => {
  return (
    <div className={`flex items-start space-x-4 ${className}`}>
      <div className={`rounded-xl p-2 ${iconClassName}`}>
        {React.cloneElement(icon, { className: 'h-6 w-6 md:h-7 md:w-7' })}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
