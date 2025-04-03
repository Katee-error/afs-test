"use client";
import React from "react";
import Card from "../card-wrapper/card";
import Image from "next/image";
import InfoRow from "../card-info-row/card-info-row";
import editIcon from "./../../../../public/assets/icons/Edit.svg";

interface CompanyDetailsCardProps {
  agreement: string;
  businessEntity: string;
  companyType: string;
  onEdit: () => void;
}

export const CompanyDetailsCard: React.FC<CompanyDetailsCardProps> = ({
  agreement,
  businessEntity,
  companyType,
  onEdit,
}) => {
  return (
    <Card
      title="Company Details"
      actions={[
        {
          icon: (
            <Image src={editIcon} alt="Company Icon" width={16} height={16} />
          ),
          label: "Edit",
          onClick: onEdit,
        },
      ]}
    >
      <InfoRow label="Agreement:" value={agreement} />
      <InfoRow label="Business entity:" value={businessEntity} />
      <InfoRow label="Company type:" value={companyType} />
    </Card>
  );
};
