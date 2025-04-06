import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./../Modal.module.scss";
import { Modal } from "../modal";
import { useStore } from "@/app/providers/StoreContext";
import { updateOrganization } from "@/api/organisations";
interface EditOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

export const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> =
  observer(({ isOpen, onClose, currentName, onSave }) => {
    const [newName, setNewName] = useState(currentName);
    const [isSaving, setIsSaving] = useState(false);
    const { organizationStore } = useStore();

    useEffect(() => {
      setNewName(currentName);
      organizationStore.setTempName(currentName);
    }, [currentName, organizationStore]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
      try {
        setIsSaving(true);
        const payload = { name: newName };
        const updated = await updateOrganization(
          organizationStore.orgData.id,
          payload
        );
        organizationStore.setOrgData(updated);
        organizationStore.setTempName("");
        onSave(newName);
      } catch (error) {
        console.error("Error when updating the organization:", error);
      } finally {
        setIsSaving(false);
        onClose();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewName(value);
      organizationStore.setTempName(value);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.editDialog}>
          <h2>Specify the Organization’s name</h2>
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button onClick={onClose} className={styles.noBtn}>
              Cancel
            </button>
            <button onClick={handleSubmit} className={styles.yesBtn}>
              Save changes
            </button>
          </div>
        </div>
      </Modal>
    );
  });
