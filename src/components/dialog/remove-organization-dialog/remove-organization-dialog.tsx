import React, { FC } from 'react';
import styles from './RemoveOrganizationDialog.module.scss';
import Modal from '@/components/modal/modal';

interface RemoveOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveOrganizationDialog: FC<RemoveOrganizationDialogProps> = ({
  isOpen,
  onClose,
  onRemove,
}) => {
  const handleRemove = () => {
    onRemove();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.removeDialog}>
        <h2>Remove the Organization?</h2>
        <p>Are you sure you want to remove this organization?</p>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.noBtn}>
            No
          </button>
          <button onClick={handleRemove} className={styles.yesBtn}>
            Yes, remove
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveOrganizationDialog;
