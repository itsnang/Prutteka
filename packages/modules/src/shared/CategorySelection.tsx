import React, { useState } from 'react';
import { ButtonCategory, Modal, Typography } from 'ui';
import { CATEGORIES } from '../constants';

import { useTypeSafeTranslation } from '../shared-hooks';

interface CategorySelectionProps {
  title: string;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  title,
}) => {
  const { t } = useTypeSafeTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Typography variant="h1" size="3xl">
          {title}
        </Typography>
        <button className="hover:underline" onClick={() => setIsOpen(true)}>
          View all
        </button>
      </div>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {CATEGORIES.map((category, idx) => (
            <ButtonCategory key={idx}>{t(category)}</ButtonCategory>
          ))}
        </div>
      </Modal>
      <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
        {CATEGORIES.map((category, idx) => (
          <ButtonCategory key={idx}>{t(category)}</ButtonCategory>
        ))}
      </div>
    </div>
  );
};
