import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFillIcon } from '@heroicons/react/24/solid';

interface ButtonInterestedProps {
  hasText?: boolean;
  isActive?: boolean;
}

export const ButtonInterested: React.FC<ButtonInterestedProps> = ({
  hasText,
  isActive,
}) => {
  const [active, setActive] = useState(isActive || false);

  return (
    <button
      className={`flex items-center justify-between border px-4 font-medium
    ${hasText ? 'h-10 w-full rounded-lg' : 'h-14 w-14 rounded-xl'}
    ${
      active
        ? 'border-tertiary bg-tertiary-ligth text-tertiary'
        : 'border-gray-200 bg-white text-gray-800'
    }
    `}
      onClick={() => setActive((prev) => !prev)}
    >
      {hasText && 'Interested'}
      {active ? (
        <StarFillIcon className="h-6 w-6" />
      ) : (
        <StarIcon className="h-6 w-6" />
      )}
    </button>
  );
};
