import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFillIcon } from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

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
    ? `${
        hasText
          ? 'h-10 w-full rounded-lg justify-between px-4'
          : 'h-12 w-12 sm:h-14 sm:w-14 rounded-xl justify-center'
      }`
    : '';

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <button
      className={`flex items-center border font-medium md:px-4 ${
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
        <StarFillIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : (
        <StarIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </button>
  );
};
