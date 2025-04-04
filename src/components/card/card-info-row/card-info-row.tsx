import React, { FC } from 'react';
import styles from './CardInfoRow.module.scss';

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
}

export const InfoRow: FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className={styles.infoRow}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};


