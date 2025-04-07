"use client";
import React from "react";
import Image from "next/image";
import { InfoRow } from "../card-info-row/card-info-row";
import editIcon from "./../../../../public/assets/icons/Edit.svg";
import styles from "./../Card.module.scss";
import { CardWrapper } from "../card-wrapper";
import { EditingButtons } from "@/components/buttons/editing-buttons";
import { useEditableContact } from "@/hooks";
import { ContactData } from "@/hooks/useEditableContact";
import { formatPhoneNumber } from "@/utils/phoneFormat";


interface ContactsCardProps extends ContactData {
  onSave?: (updatedData: ContactData) => void;
}

export const ContactsCard: React.FC<ContactsCardProps> = ({
  personName,
  phoneNumber,
  email,
  onSave,
}) => {
  const {
    editing,
    values,
    startEditing,
    cancelEditing,
    saveEditing,
    updateField,
  } = useEditableContact({ personName, phoneNumber, email }, (updatedData) => {
    onSave && onSave(updatedData);
  });

  return (
    <CardWrapper
      title="Contacts"
      actions={
        !editing
          ? [
              {
                icon: (
                  <Image
                    src={editIcon}
                    alt="Edit Icon"
                    width={16}
                    height={16}
                  />
                ),
                label: "Edit",
                onClick: startEditing,
              },
            ]
          : []
      }
      editingActions={
        editing && (
          <EditingButtons onSave={saveEditing} onCancel={cancelEditing} />
        )
      }
    >
      {editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className={styles.infoRow}>
            <label className={styles.label}>Responsible person</label>
            <input
              className={styles.infoInput}
              type="text"
              value={values.personName}
              onChange={(e) => updateField("personName", e.target.value)}
            />
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>Phone number</label>
            <input
              className={styles.infoInput}
              type="text"
              value={values.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
            />
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.infoInput}
              type="email"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <InfoRow label="Responsible person:" value={values.personName} />
          <InfoRow
            label="Phone number:"
            value={formatPhoneNumber(values.phoneNumber)}
          />
          <InfoRow label="E-mail:" value={values.email} />
        </div>
      )}
    </CardWrapper>
  );
};
