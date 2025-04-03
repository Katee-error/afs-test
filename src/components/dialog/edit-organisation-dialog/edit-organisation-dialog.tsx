import React, { useState, FC } from 'react';
import styles from './EditOrganizationDialog.module.scss';
import Modal from '../../modal/modal';

interface EditOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

const EditOrganizationDialog: FC<EditOrganizationDialogProps> = ({
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
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditOrganizationDialog;
