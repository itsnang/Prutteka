import React from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Modal } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useRouter } from 'next/router';
import { getTranslatedText } from '../helpers';

interface AttendModalProp {
  methods: {
    name: { en: string; km: string };
    link: string;
  }[];

  show: boolean;
  onClose: () => void;
}

export const AttendModal: React.FC<AttendModalProp> = ({
  methods,
  show,
  onClose,
}) => {
  const { t, i18n } = useTypeSafeTranslation();
  const { push } = useRouter();

  return (
    <Modal
      title={t('event-detail-page.how-to-attend')}
      show={show}
      onClose={onClose}
      className="min-h-[21.875rem]"
    >
      <div className="mt-4 space-y-2">
        {methods.map((method, index) => (
          <button
            key={index}
            className="flex w-full flex-col overflow-hidden rounded-xl border p-3 text-left"
            onClick={() => !!method.link && window.open(method.link, '_blank')}
          >
            <span className="line-clamp-2">
              {getTranslatedText(method.name, i18n.language)}
            </span>
            {!!method.link.trim() ? (
              <div className="flex items-center text-gray-500">
                <div className="line-clamp-1 whitespace-normal break-all">
                  {method.link}
                </div>
                <ArrowTopRightOnSquareIcon className="ml-1 h-[1.125rem] w-[1.125rem] flex-shrink-0" />
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </Modal>
  );
};
