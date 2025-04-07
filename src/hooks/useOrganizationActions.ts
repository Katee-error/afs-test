import { useCallback } from "react";
import {
  deleteOrganization,
  updateOrganization,
  uploadImage,
} from "@/api/organisations";
import { useStore } from "@/app/providers/StoreContext";

export const useOrganizationActions = (orgId: string) => {
  const { organizationStore } = useStore();

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
        organizationStore.setOrgData(updatedOrg);
        console.log("Organization updated");
      } catch (error) {
        console.error("Organization Update Error:", error);
      }
    },
    [orgId, organizationStore]
  );

  const handleRemoveOrganization = useCallback(async () => {
    try {
      await deleteOrganization(orgId);
      organizationStore.setOrgData(null);
    } catch (error) {
      console.error("Error when deleting organization:", error);
    }
  }, [orgId, organizationStore]);

  const handlePhotoAdd = useCallback(
    async (file: File) => {
      try {
        const uploaded = await uploadImage(orgId, file);
        organizationStore.setOrgData({
          ...organizationStore.orgData,
          photos: [...(organizationStore.orgData?.photos || []), uploaded],
        });
        console.log("Photo uploaded");
      } catch (error) {
        console.error("Photo upload error:", error);
      }
    },
    [orgId, organizationStore]
  );

  const handleSaveName = useCallback(
    async (newName: string) => {
      try {
        const updated = await updateOrganization(orgId, {
          ...organizationStore.orgData,
          name: newName,
        });
        organizationStore.setOrgData(updated);
        console.log("Title updated");
      } catch (error) {
        console.error("Error when updating the title:", error);
      }
    },
    [orgId, organizationStore]
  );

  return {
    handleCompanyDetailsSave,
    handleRemoveOrganization,
    handlePhotoAdd,
    handleSaveName,
  };
};
