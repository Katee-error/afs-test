"use client";
import React, { useState } from "react";
import { CompanyDetailsCard } from "../card/company-details-card/company-details-card";
import ContactsCard from "../card/contact-card/contact-card";
import PhotosCard from "../card/photo-card/photo-card";
import Image from "next/image";
import styles from "./Organisation.module.scss";
import editIcon from "./../../../public/assets/icons/Edit.svg";
import trashIcon from "./../../../public/assets/icons/Trash.svg";
import img1 from "./../../../public/assets/photo/image 1.png";
import img2 from "./../../../public/assets/photo/image 2.png";
import img3 from "./../../../public/assets/photo/image 3.png";
import EditOrganizationDialog from "../dialog/edit-organisation-dialog/edit-organisation-dialog";
import RemoveOrganizationDialog from "../dialog/remove-organization-dialog/remove-organization-dialog";
interface Props {
  className?: string;
}

export const Organisation: React.FC<Props> = ({ className }) => {
  const photos = [
    { id: "1", thumbUrl: img1, alt: "Photo 1" },
    { id: "2", thumbUrl: img2, alt: "Photo 2" },
    { id: "3", thumbUrl: img3, alt: "Photo 3" },
  ];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [orgName, setOrgName] = useState("Eternal Rest Funeral Home");

  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };

  const handleOpenRemove = () => {
    setIsRemoveOpen(true);
  };

  const handleSaveChanges = (newName: string) => {
    console.log("Saving new name:", newName);
    setOrgName(newName);
  };

  const handleRemoveOrganization = () => {
    console.log("Removing organization...");
  };

  return (
    <div className={styles.organisation_container}>
      <div className={styles.organisation_header}>
        <h1 className={styles.organisation_title}>Eternal Rest Funeral Home</h1>
        <div className={styles.organisation_icons_group}>
          <Image
            className={styles.organisation_icon_edit}
            src={editIcon}
            alt="Edit Icon"
            width={20}
            height={20}
            onClick={handleOpenEdit}
          />
          <Image
            className={styles.organisation_icon_delete}
            src={trashIcon}
            alt="Delete Icon"
            width={20}
            height={20}
            onClick={handleOpenRemove}
          />
        </div>
      </div>
      <div className={styles.organisation}>
        <CompanyDetailsCard
          agreement="1624/2-24"
          date="03.12.2024"
          businessEntity="Partnership"
          companyType="Funeral Home, Logistics services"
          onSave={(updatedData) => {
            console.log("Updated data:", updatedData);
          }}
        />
        <ContactsCard
          personName="David Rosenberg"
          phoneNumber="+1 702 555 2345"
          email="david_rosenberg88@gmail.com"
          onSave={(updatedData) => {
            console.log("Updated data:", updatedData);
          }}
        />
        <PhotosCard
          photos={photos}
          onAdd={() => console.log("Add new photo")}
        />
      </div>
      <EditOrganizationDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentName={orgName}
        onSave={handleSaveChanges}
      />

      <RemoveOrganizationDialog
        isOpen={isRemoveOpen}
        onClose={() => setIsRemoveOpen(false)}
        onRemove={handleRemoveOrganization}
      />
    </div>
  );
};
