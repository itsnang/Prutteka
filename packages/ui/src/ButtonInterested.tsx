import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFillIcon } from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from '../../modules';

interface ButtonInterestedProps {
  isDefault?: boolean;
  hasText?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ButtonInterested: React.FC<ButtonInterestedProps> = ({
  isDefault = true,
  hasText,
  isActive = false,
  className,
  onClick,
}) => {
  const { t } = useTypeSafeTranslation();

  const [active, setActive] = useState(false);

  const buttonClassName = isDefault
    ? `${hasText ? 'h-10 w-full rounded-lg' : 'h-14 w-14 rounded-xl'}`
    : '';

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <button
      className={`flex items-center justify-between border px-4 font-medium  ${
        active
          ? 'border-tertiary bg-tertiary-light text-tertiary'
          : 'border-gray-200 bg-white text-gray-800'
      } ${buttonClassName} ${className ? className : ''}`}
      onClick={() => {
        setActive((prev) => !prev);
        onClick && onClick();
      }}
    >
      {hasText && t('common.interested')}
      {active ? (
        <StarFillIcon className="h-6 w-6" />
      ) : (
        <StarIcon className="h-6 w-6" />
      )}
    </button>
  );
};
