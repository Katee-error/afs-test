"use client";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/providers/StoreContext";
import styles from "./Organisation.module.scss";
import { EditOrganizationDialog, RemoveOrganizationDialog } from "../modal/dialog";
import { useAuth, useContact, useOrganization, useOrganizationActions } from "@/hooks";
import { CompanyDetailsCard, ContactsCard, PhotosCard } from "../card";
import { OrganisationHeader } from "./organisation-header";

export const Organisation: React.FC = observer(() => {
  const username = "test-user";
  const orgId = "12";
  const contactId = "16";
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const { organizationStore } = useStore();
  if (!organizationStore) {
    return <div>Loading store...</div>;
  }
  const { token, loading: authLoading, error: authError } = useAuth(username);
  const { orgData, contactData, setOrgData, tempName, setContactData } = organizationStore;
  const {
    handleCompanyDetailsSave,
    handleRemoveOrganization,
    handleSaveName
  } = useOrganizationActions(orgId);
  
  useOrganization(token, orgId, setOrgData);
  useContact(token, contactId, setContactData);

  
  if (authLoading) return null;
  if (authError) return <div className={styles.errorMessage}>Error: {authError}</div>;
  if (!contactData) return null;
  if (!orgData)
    return <div className={styles.errorMessage}>List organisations is empty</div>;

  const displayName = tempName || orgData.name;

  return (
    <div className={styles.organisation_container}>
      <OrganisationHeader
        displayName={displayName}
        onEdit={() => setIsEditOpen(true)}
        onRemove={() => setIsRemoveOpen(true)}
      />

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
          onSave={(updatedData) => console.log("Updated contact:", updatedData)}
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
        orgId={orgId}   
         />

      <RemoveOrganizationDialog
        isOpen={isRemoveOpen}
        onClose={() => setIsRemoveOpen(false)}
        onRemove={handleRemoveOrganization}
      />
    </div>
  );
});
