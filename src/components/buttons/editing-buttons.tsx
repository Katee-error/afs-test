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
    <button className={styles.saveButton} onClick={onSave}>
      <Image src={checkIcon} alt="Save Icon" width={16} height={16} />
      <span>Save changes</span>
    </button>
    <button className={styles.cancelButton} onClick={onCancel}>
      <Image src={closeIcon} alt="Cancel Icon" width={16} height={16} />
      <span>Cancel</span>
    </button>
  </div>
);
