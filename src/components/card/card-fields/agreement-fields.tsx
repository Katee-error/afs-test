import React from "react";
import styles from "./../Card.module.scss";

interface AgreementFieldsProps {
  agreement: string;
  date: string;
  onAgreementChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export const AgreementFields: React.FC<AgreementFieldsProps> = ({
  agreement,
  date,
  onAgreementChange,
  onDateChange,
}) => (
  <div className={styles.topFields}>
    <div className={styles.topField}>
      <label>Agreement number</label>
      <input
        className={styles.infoInput}
        type="text"
        value={agreement}
        onChange={(e) => onAgreementChange(e.target.value)}
      />
    </div>
    <div className={styles.topField}>
      <label>Date</label>
      <input
        className={styles.infoInput}
        type="text"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  </div>
);
