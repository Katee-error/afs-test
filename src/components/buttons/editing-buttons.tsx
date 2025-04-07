import React from "react";
import Image from "next/image";
import checkIcon from "./../../../public/assets/icons/Check.svg";
import closeIcon from "./../../../public/assets/icons/X.svg";
import styles from "./EditingButtons.module.scss";

interface EditingButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const EditingButtons: React.FC<EditingButtonsProps> = ({ onSave, onCancel }) => (
  <div className={styles.editingActions}>
    <div className={styles.saveButtonWrapper} onClick={onSave}>
      <button className={styles.saveButton}>
        <Image src={checkIcon} alt="Save Icon" width={16} height={16} />
        <span>Save changes</span>
      </button>
    </div>
    <div className={styles.cancelButtonWrapper} onClick={onCancel}>
      <button className={styles.cancelButton}>
        <Image src={closeIcon} alt="Cancel Icon" width={16} height={16} />
        <span>Cancel</span>
      </button>
    </div>
  </div>
);
