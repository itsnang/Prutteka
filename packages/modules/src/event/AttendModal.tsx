import React from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Modal } from 'ui';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

interface AttendModalProp {
  show: boolean;
  onClose: () => void;
}

export const AttendModal: React.FC<AttendModalProp> = ({ show, onClose }) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Modal
      title={t('event-detail-page.how-to-attend')}
      show={show}
      onClose={onClose}
      className="min-h-[21.875rem]"
    >
      <div className="mt-4 space-y-2">
        <button className="flex w-full flex-col overflow-hidden rounded-xl border p-3 text-left">
          Get a ticket now
          <div className="flex items-center text-gray-500">
            <div className="line-clamp-1 whitespace-normal break-all">
              https://ticket.cambodiatechex.gov.kh/nesciunt
            </div>
            <ArrowTopRightOnSquareIcon className="ml-1 h-[1.125rem] w-[1.125rem] flex-shrink-0" />
          </div>
        </button>
      </div>
    </Modal>
  );
};
