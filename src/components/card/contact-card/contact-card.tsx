import React from "react";
import Card from "../card-wrapper/card";
import editIcon from "./../../../../public/assets/icons/Edit.svg";
import InfoRow from "../card-info-row/card-info-row";
import Image from "next/image";

interface ContactsCardProps {
  personName: string;
  phoneNumber: string;
  email: string;
  onEdit: () => void;
}

const ContactsCard: React.FC<ContactsCardProps> = ({
  personName,
  phoneNumber,
  email,
  onEdit,
}) => {
  return (
    <Card
      title="Contacts"
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
      <InfoRow label="Responsible person:" value={personName} />
      <InfoRow label="Phone number:" value={phoneNumber} />
      <InfoRow label="E-mail:" value={email} />
    </Card>
  );
};

export default ContactsCard;
