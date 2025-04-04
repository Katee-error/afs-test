import React, { useState } from "react";
import styles from "./../Modal.module.scss"
import { Modal } from "../modal";

interface EditOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

export const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> = ({
  isOpen,
  onClose,
  currentName,
  onSave,
}) => {
  const [orgName, setOrgName] = useState(currentName);

  const handleSave = () => {
    onSave(orgName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.editDialog}>
        <h2>Specify the Organization’s name</h2>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.noBtn}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.yesBtn}>
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
