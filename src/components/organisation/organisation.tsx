"use client";
import React, { useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/providers/StoreContext";
import styles from "./Organisation.module.scss";
import {EditOrganizationDialog,RemoveOrganizationDialog,} from "../modal/dialog";
import editIcon from "./../../../public/assets/icons/Edit.svg";
import trashIcon from "./../../../public/assets/icons/Trash.svg";
import {useAuth,useContact,useOrganization,useOrganizationActions,} from "@/hooks";
import { CompanyDetailsCard, ContactsCard, PhotosCard } from "../card";

export const Organisation: React.FC = observer(() => {
  const username = "test-user";
  const orgId = "12";
  const contactId = "16";

  const { organizationStore } = useStore();
  const { token, loading: authLoading, error: authError } = useAuth(username);

  const { orgData, contactData, setOrgData, tempName, setContactData } =
    organizationStore;

  const { handleCompanyDetailsSave, handleRemoveOrganization, handleSaveName } =
    useOrganizationActions(orgId, setOrgData);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  useOrganization(token, orgId, setOrgData);
  useContact(token, contactId, setContactData);

  if (authLoading) return;
  if (authError)
    return <div className={styles.errorMessage}>Error: {authError}</div>;
  if (!contactData) return;
  if (!orgData)
    return (
      <div className={styles.errorMessage}>List organisations is empty</div>
    );

  const displayName = tempName || orgData.name;

  return (
    <div className={styles.organisation_container}>
      <div className={styles.organisation_header}>
        <h1 className={styles.organisation_title}>{displayName}</h1>
        <div className={styles.organisation_icons_group}>
          <Image
            className={styles.organisation_icon_edit}
            src={editIcon}
            alt="Edit Icon"
            width={20}
            height={20}
            onClick={() => setIsEditOpen(true)}
          />
          <Image
            className={styles.organisation_icon_delete}
            src={trashIcon}
            alt="Delete Icon"
            width={20}
            height={20}
            onClick={() => setIsRemoveOpen(true)}
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
            console.log("Updated contact:", updatedData);
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
        currentName={orgData.name}
        onSave={handleSaveName}
      />

      <RemoveOrganizationDialog
        isOpen={isRemoveOpen}
        onClose={() => setIsRemoveOpen(false)}
        onRemove={handleRemoveOrganization}
      />
    </div>
  );
});
