"use client";
import React, { useState } from "react";
import { CompanyDetailsCard } from "../card/company-details-card/company-details-card";
import ContactsCard from "../card/contact-card/contact-card";
import { PhotosCard } from "../card/photo-card/photo-card";
import Image from "next/image";
import styles from "./Organisation.module.scss";
import editIcon from "./../../../public/assets/icons/Edit.svg";
import trashIcon from "./../../../public/assets/icons/Trash.svg";
import { useOrganization } from "@/hooks/useOrganisation";
import { useAuth } from "@/hooks/useAuth";
import { useContact } from "@/hooks/useContsct";
import {
  EditOrganizationDialog,
  RemoveOrganizationDialog,
} from "../modal/dialog";
import { useOrganizationActions } from "@/hooks/useOrganizationActions";

export const Organisation: React.FC = () => {
  const username = "test-user";
  const orgId = "12";
  const contactId = "16";

  const { token, loading: authLoading, error: authError } = useAuth(username);

  const {
    orgData,
    loading: orgLoading,
    error: orgError,
    setOrgData,
  } = useOrganization(token, orgId);

  const {
    contactData,
    loading: contactLoading,
    error: contactError,
  } = useContact(token, contactId);

  const { handleCompanyDetailsSave, handleRemoveOrganization, handlePhotoAdd } =
    useOrganizationActions(orgId, setOrgData);
    
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [orgName, setOrgName] = useState("Eternal Rest Funeral Home");

  const isLoading = authLoading || orgLoading || contactLoading;
  const isError = authError || orgError || contactError;

  if (isLoading) return <div>Загрузка...</div>;
  if (isError)
    return <div>Ошибка: {authError || orgError || contactError}</div>;

  const handleOpenEdit = () => setIsEditOpen(true);
  const handleOpenRemove = () => setIsRemoveOpen(true);

  const handleSaveChanges = (newName: string) => {
    console.log("Saving new name:", newName);
    setOrgName(newName);
  };

  return (
    <div className={styles.organisation_container}>
      <div className={styles.organisation_header}>
        <h1 className={styles.organisation_title}>{orgData.name}</h1>
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
          agreement={orgData.contract.no}
          date={new Date(orgData.contract.issue_date).toLocaleDateString()}
          businessEntity={orgData.businessEntity}
          companyType={orgData.type.join(", ")}
          onSave={handleCompanyDetailsSave}
        />

        <ContactsCard
          personName={`${contactData.firstname} ${contactData.lastname}`}
          phoneNumber={contactData.phone}
          email={contactData.email}
          onSave={(updatedData) => {
            console.log("Updated data:", updatedData);
          }}
        />

        <PhotosCard
          photos={orgData.photos.map((photo: any) => ({
            id: photo.name,
            thumbUrl: photo.thumbpath,
            alt: photo.name,
          }))}
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
