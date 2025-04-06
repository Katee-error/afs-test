"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { InfoRow } from "../card-info-row/card-info-row";
import editIcon from "./../../../../public/assets/icons/Edit.svg";
import checkIcon from "./../../../../public/assets/icons/Check.svg";
import closeIcon from "./../../../../public/assets/icons/X.svg";
import styles from "./../card-info-row/CardInfoRow.module.scss";
import { BUSINESS_ENTITY_OPTIONS, COMPANY_TYPE_OPTIONS } from "@/constant";
import CustomSelect from "@/components/ui/select/custom-select";
import { CustomMultiSelect } from "@/components/ui/multi-select/custom-multi-select";
import { CardWrapper } from "../card-wrapper";

export interface CompanyDetailsCardProps {
  agreement: string;
  date: string;
  businessEntity: string;
  companyType: string;
  onSave?: (data: {
    agreement: string;
    date: string;
    businessEntity: string;
    companyType: string;
  }) => void;
}

export const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({
  agreement,
  date,
  businessEntity,
  companyType,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAgreement, setEditAgreement] = useState(agreement);
  const [editDate, setEditDate] = useState(date);
  const [editBusinessEntity, setEditBusinessEntity] = useState(businessEntity);
  const [editCompanyTypes, setEditCompanyTypes] = useState<string[]>([]);

  useEffect(() => {
    if (companyType) {
      const initialValues = companyType.split(",").map((v) => v.trim());
      setEditCompanyTypes(initialValues);
    }
  }, [companyType]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const companyTypeString = editCompanyTypes.join(", ");

    onSave?.({
      agreement: editAgreement,
      date: editDate,
      businessEntity: editBusinessEntity,
      companyType: companyTypeString,
    });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditAgreement(agreement);
    setEditDate(date);
    setEditBusinessEntity(businessEntity);
    setEditCompanyTypes(companyType.split(",").map((v) => v.trim()));
    setIsEditing(false);
  };

  const handleBusinessEntityChange = (selectedValue: string) => {
    setEditBusinessEntity(selectedValue);
  };

  return (
    <CardWrapper
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
        <div className={styles.editModeContainer}>
          <div className={styles.topFields}>
            <div className={styles.topField}>
              <label>Agreement number</label>
              <input
                className={styles.infoInput}
                type="text"
                value={editAgreement}
                onChange={(e) => setEditAgreement(e.target.value)}
              />
            </div>
            <div className={styles.topField}>
              <label>Date</label>
              <input
                className={styles.infoInput}
                type="text"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
          </div>

          {/* Business entity */}
          <div className={styles.row}>
            <label className={styles.label}>Business entity</label>
            <CustomSelect
              options={BUSINESS_ENTITY_OPTIONS}
              value={editBusinessEntity}
              onChange={handleBusinessEntityChange}
            />
          </div>

          {/* Company type */}
          <div className={styles.row}>
            <label className={styles.label}>Company type</label>
            <CustomMultiSelect
              options={COMPANY_TYPE_OPTIONS}
              value={editCompanyTypes}
              onChange={(selected) => setEditCompanyTypes(selected)}
              placeholder={editAgreement}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <InfoRow
            label="Agreement:"
            value={`${editAgreement} / ${editDate}`}
          />
          <InfoRow label="Business entity:" value={editBusinessEntity} />
          <InfoRow label="Company type:" value={editCompanyTypes.join(", ")} />
        </div>
      )}
    </CardWrapper>
  );
};
