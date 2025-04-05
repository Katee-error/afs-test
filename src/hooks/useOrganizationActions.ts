import { useCallback } from "react";
import { deleteOrganization, updateOrganization, uploadImage } from "./updateOrganization";


export const useOrganizationActions = (orgId: string, setOrgData: (data: any) => void) => {
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
        console.log("Организация обновлена");
      } catch (error) {
        console.error("Ошибка обновления организации:", error);
      }
    },
    [orgId, setOrgData]
  );

  const handleRemoveOrganization = useCallback(async () => {
    try {
      await deleteOrganization(orgId);
      console.log("Организация удалена");
    } catch (error) {
      console.error("Ошибка удаления организации:", error);
    }
  }, [orgId]);

  const handlePhotoAdd = useCallback(
    async (file: File) => {
      try {
        const uploaded = await uploadImage(orgId, file);
        setOrgData((prev: any) => ({
          ...prev,
          photos: [...(prev?.photos || []), uploaded],
        }));
        console.log("Фото загружено");
      } catch (error) {
        console.error("Ошибка загрузки фото:", error);
      }
    },
    [orgId, setOrgData]
  );

  return {
    handleCompanyDetailsSave,
    handleRemoveOrganization,
    handlePhotoAdd,
  };
};
