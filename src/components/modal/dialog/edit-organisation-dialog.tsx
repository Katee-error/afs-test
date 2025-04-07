'use client';
import React from "react";
import { observer } from "mobx-react-lite";
import styles from "../Modal.module.scss";
import { Modal } from "../modal";
import { useEditOrganization } from "@/hooks/useEditOrganization";
import { useStore } from "@/app/providers/StoreContext";

interface EditOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  orgId: string;
  onSave: (newName: string) => void;
}

export const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> = observer(
  ({ isOpen, onClose, currentName, orgId, onSave }) => {
    const { organizationStore } = useStore();

    const { tempName, isSaving, handleChange, handleSubmit } = useEditOrganization(
      { currentName, orgId, onClose, onSave },
      organizationStore
    );
    

    if (!isOpen) return null;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.editDialog}>
          <h2>Specify the Organization’s name</h2>
          <input
            type="text"
            value={tempName}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button onClick={onClose} className={styles.noBtn} disabled={isSaving}>
              Cancel
            </button>
            <button onClick={handleSubmit} className={styles.yesBtn} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
);