import React, { useState } from 'react';
import { Button, Modal, Typography } from 'ui';
import { useTypeSafeTranslation } from '../shared-hooks';

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  show,
  onDelete,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Modal
      className="text-2xl"
      onClose={onClose}
      title={t('common.delete')}
      show={show}
    >
      <div className="mt-6 space-y-6">
        <Typography>{t('modals.delete-event')}</Typography>
        <div className="flex gap-4 text-base">
          <Button className="flex-1 px-8" variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            className="flex-1 px-8"
            variant="primary"
            onClick={onDelete}
            hasShadow
          >
            {t('common.delete')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
