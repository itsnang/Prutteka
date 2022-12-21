import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ButtonCategory, Modal, Typography } from 'ui';
import { CATEGORIES } from '../constants';

import { useTypeSafeTranslation } from '../shared-hooks';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
interface CategorySelectionProps {
  title: string;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  title,
}) => {
  const { t } = useTypeSafeTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Typography variant="h1" size="3xl">
          {title}
        </Typography>
        <button
          className="flex items-center hover:underline"
          onClick={() => setIsOpen(true)}
        >
          {t('common.view-all')} <ChevronDownIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
      <Modal
        className="text-2xl"
        title={t('common.categories')}
        show={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="mt-6 grid grid-cols-3 gap-4 text-base">
          {CATEGORIES.map((category, idx) => {
            const categoryValue = category.split('.')[1];
            const isActive =
              router.query?.category === categoryValue ||
              (!router.query?.category && categoryValue === 'all');

            return (
              <ButtonCategory
                key={idx}
                onClick={() => {
                  router.push({ query: `category=${categoryValue}` });
                }}
                isActive={isActive}
              >
                {t(category)}
              </ButtonCategory>
            );
          })}
        </div>
      </Modal>
      <div className="custom-scrollbar flex space-x-4 overflow-x-auto">
        {CATEGORIES.map((category, idx) => {
          const categoryValue = category.split('.')[1];
          const isActive =
            router.query?.category === categoryValue ||
            (!router.query?.category && categoryValue === 'all');

          return (
            <ButtonCategory
              key={idx}
              onClick={() => {
                router.push({ query: `category=${categoryValue}` });
              }}
              isActive={isActive}
            >
              {t(category)}
            </ButtonCategory>
          );
        })}
      </div>
    </div>
  );
};
