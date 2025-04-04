import React, { useState } from "react";
import Card from "../card-wrapper/card";
import editIcon from "./../../../../public/assets/icons/Edit.svg";
import checkIcon from "./../../../../public/assets/icons/Check.svg"; // Иконка сохранения
import closeIcon from "./../../../../public/assets/icons/X.svg"; // Иконка отмены
import { InfoRow } from "../card-info-row/card-info-row";
import Image from "next/image";
import styles from "./../card-info-row/CardInfoRow.module.scss";
interface ContactsCardProps {
  personName: string;
  phoneNumber: string;
  email: string;
  onSave?: (updatedData: {
    personName: string;
    phoneNumber: string;
    email: string;
  }) => void;
}

const ContactsCard: React.FC<ContactsCardProps> = ({
  personName,
  phoneNumber,
  email,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPersonName, setEditPersonName] = useState(personName);
  const [editPhoneNumber, setEditPhoneNumber] = useState(phoneNumber);
  const [editEmail, setEditEmail] = useState(email);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave &&
      onSave({
        personName: editPersonName,
        phoneNumber: editPhoneNumber,
        email: editEmail,
      });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditPersonName(personName);
    setEditPhoneNumber(phoneNumber);
    setEditEmail(email);
    setIsEditing(false);
  };

  return (
    <Card
    title="Company Details"
    actions={
      !isEditing
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
              onClick: handleEditClick,
            },
          ]
        : []
    }
    editingActions={
      isEditing && (
        <div className={styles.editingActions}>
          <button className={styles.saveButton} onClick={handleSaveClick}>
            <Image src={checkIcon} alt="Save Icon" width={16} height={16} />
            <span>Save changes</span>
          </button>
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            <Image src={closeIcon} alt="Cancel Icon" width={16} height={16} />
            <span>Cancel</span>
          </button>
        </div>
      )
    }
    >
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className={styles.infoRow}>
            <label className={styles.label}>Responsible person</label>
            <input
              className={styles.infoInput}
              type="text"
              value={editPersonName}
              onChange={(e) => setEditPersonName(e.target.value)}
            />
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>Phone number</label>
            <input
              className={styles.infoInput}
              type="text"
              value={editPhoneNumber}
              onChange={(e) => setEditPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.infoInput}
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <InfoRow label="Responsible person:" value={editPersonName} />
          <InfoRow label="Phone number:" value={editPhoneNumber} />
          <InfoRow label="E-mail:" value={editEmail} />
        </div>
      )}
    </Card>
  );
};

export default ContactsCard;
