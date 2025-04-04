import React from "react";
import styles from "./../Modal.module.scss";
import { Modal } from "../modal";

interface RemoveOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

export const RemoveOrganizationDialog: React.FC<
  RemoveOrganizationDialogProps
> = ({ isOpen, onClose, onRemove }) => {
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
