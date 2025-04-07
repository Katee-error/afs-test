"use client";
import React from "react";
import Image from "next/image";
import { InfoRow } from "../card-info-row/card-info-row";
import editIcon from "./../../../../public/assets/icons/Edit.svg";
import styles from "./../Card.module.scss";
import { CardWrapper } from "../card-wrapper";
import {
  AgreementFields,
  BusinessEntityField,
  CompanyTypeField,
} from "@/components/card/card-fields";
import { EditingButtons } from "@/components/buttons/editing-buttons";
import { useEditableCompanyDetails } from "@/hooks";
import { useStore } from "@/app/providers/StoreContext";
import { formatLabel } from "@/utils/format";

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
  const {
    editing,
    values,
    startEditing,
    cancelEditing,
    saveEditing,
    updateField,
  } = useEditableCompanyDetails(
    { agreement, date, businessEntity, companyType },
    (updatedData) => onSave?.(updatedData)
  );

  const { organizationStore } = useStore();
  const companyTypeOptions = (organizationStore?.orgData?.type || []).map(
    (type: string) => ({ value: type, label: type })
  );

  const displayCompanyTypes =
  values.companyTypes.length > 0
    ? values.companyTypes.map(formatLabel).join(", ")
    : "No types selected";

  return (
    <CardWrapper
      title="Company Details"
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
        editing ? (
          <EditingButtons onSave={saveEditing} onCancel={cancelEditing} />
        ) : undefined
      }
    >
      {editing ? (
        <div className={styles.editModeContainer}>
          <AgreementFields
            agreement={values.agreement}
            date={values.date}
            onAgreementChange={(value) => updateField("agreement", value)}
            onDateChange={(value) => updateField("date", value)}
          />
          <BusinessEntityField
            value={values.businessEntity}
            onChange={(value) => updateField("businessEntity", value)}
          />
          <CompanyTypeField
            value={values.companyTypes}
            onChange={(value) => updateField("companyTypes", value)}
            placeholder="Select company types"
            options={companyTypeOptions}
          />
        </div>
      ) : (
        <div className={styles.viewModeContainer}>
          <InfoRow
            label="Agreement:"
            value={`${values.agreement} / ${values.date}`}
          />
          <InfoRow label="Business entity:" value={values.businessEntity} />
          <InfoRow label="Company type:" value={displayCompanyTypes} />
        </div>
      )}
    </CardWrapper>
  );
};
