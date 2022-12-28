import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Typography } from 'ui';

interface EventInfoCardProp {
  className?: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconClassName?: string;
  children: React.ReactNode | string;
}

export const EventInfoCard: React.FC<EventInfoCardProp> = ({
  className,
  icon,
  iconClassName,
  children,
}) => {
  const Icon = icon;
  return (
    <div className={`flex items-start space-x-4 ${className}`}>
      <div className={`rounded-xl p-2 ${iconClassName}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
