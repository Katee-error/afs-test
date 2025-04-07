import React from "react";
import styles from "./EditingButtons.module.scss";
import { CheckIcon, CloseIcon } from "../icons";

interface EditingButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const EditingButtons: React.FC<EditingButtonsProps> = ({ onSave, onCancel }) => (
  <div className={styles.editingActions}>
    <div className={styles.saveButtonWrapper} onClick={onSave}>
      <button className={styles.saveButton}>
        <CheckIcon className={styles.iconSvg} width={16} height={16}/>
        <span>Save changes</span>
      </button>
    </div>
    <div className={styles.cancelButtonWrapper} onClick={onCancel}>
      <button className={styles.cancelButton}>
        <CloseIcon className={styles.iconSvg} width={16} height={16}/>
        <span>Cancel</span>
      </button>
    </div>
  </div>
);
