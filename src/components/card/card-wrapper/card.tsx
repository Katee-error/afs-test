import React, {  ReactNode } from "react";
import styles from "./../Card.module.scss";

interface CardAction {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
}

interface CardProps {
  title: string;
  children: ReactNode;
  actions?: CardAction[];
  editingActions?: React.ReactNode;
}

export const CardWrapper: React.FC<CardProps> = ({ title, children, actions, editingActions }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {actions && actions.length > 0 && (
          <div className={styles.cardActions} >
            {actions.map((action, index) => (
              <button
                key={index}
                className={styles.iconButton}
                onClick={action.onClick}
                title={action.label}
              >
                {action.icon}
                {action.label && <span>{action.label}</span>}
              </button>
            ))}
          </div>
        )}
        {editingActions && (
          <div className={styles.cardEditingActions}>{editingActions}</div>
        )}
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};
