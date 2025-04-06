import { useCallback } from "react";
import { organizationStore } from "@/stores/organisationStore";
import { deleteOrganization, updateOrganization, uploadImage } from "@/api/organisations";

export const useOrganizationActions = (
  orgId: string,
  setOrgData: (data: any) => void
) => {
  const handleCompanyDetailsSave = useCallback(
    async (updatedData: {
      agreement: string;
      date: string;
      businessEntity: string;
      companyType: string;
    }) => {
      try {
        const updatedOrg = await updateOrganization(orgId, {
          contract: {
            no: updatedData.agreement,
            issue_date: new Date(updatedData.date).toISOString(),
          },
          businessEntity: updatedData.businessEntity,
          type: updatedData.companyType.split(",").map((t) => t.trim()),
        });
        setOrgData(updatedOrg);
        console.log("Organization updated");
      } catch (error) {
        console.error("Organization Update Error:", error);
      }
    },
    [orgId, setOrgData]
  );

  const handleRemoveOrganization = async () => {
    try {
      await deleteOrganization(orgId);
      setOrgData(null);
    } catch (error) {
      console.error("Error when deleting an organization:", error);
    }
  };

  const handlePhotoAdd = useCallback(
    async (file: File) => {
      try {
        const uploaded = await uploadImage(orgId, file);
        setOrgData((prev: any) => ({
          ...prev,
          photos: [...(prev?.photos || []), uploaded],
        }));
        console.log("Photo uploaded");
      } catch (error) {
        console.error("Photo upload error:", error);
      }
    },
    [orgId, setOrgData]
  );

  const handleSaveName = useCallback(
    async (newName: string) => {
      try {
        const updated = await updateOrganization(orgId, {
          ...organizationStore.orgData,
          name: newName,
        });
        setOrgData(updated);
        console.log("Title updated");
      } catch (error) {
        console.error("Error when updating the title:", error);
      }
    },
    [orgId, setOrgData]
  );

  return {
    handleCompanyDetailsSave,
    handleRemoveOrganization,
    handlePhotoAdd,
    handleSaveName,
  };
};
