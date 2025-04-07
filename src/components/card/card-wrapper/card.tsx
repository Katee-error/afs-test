import React, { ReactNode } from "react";
import styles from "./../Card.module.scss";

interface CardProps {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}

export const CardWrapper: React.FC<CardProps> = ({ title, children, headerRight }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {headerRight && (
          <div className={styles.cardHeaderRight}>
            {headerRight}
          </div>
        )}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};
