'use client';
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { updateOrganization } from "@/api/organisations";
import { OrganizationStore } from "@/stores/organisationStore";

interface UseEditOrganizationParams {
  currentName: string;
  orgId: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export const useEditOrganization = (
  { currentName, orgId, onClose, onSave }: UseEditOrganizationParams,
  store: OrganizationStore
) => {
  const [tempName, setTempName] = useState(currentName);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!store) return;
    setTempName(currentName);
    store.setTempName(currentName);
  }, [currentName, store]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTempName(value);
      store?.setTempName(value);
    },
    [store]
  );

  const handleSubmit = useCallback(async () => {
    if (!store || !store.orgData) return;
    try {
      setIsSaving(true);
      const { id, name, contract, businessEntity, type } = store.orgData;
      const payload = {
        name: tempName,
        contract,
        businessEntity,
        type,
      };
      const updated = await updateOrganization(orgId, payload);
      store.setOrgData(updated);
      store.setTempName("");
      onSave(tempName);
      onClose();
    } catch (error) {
      console.error("Error when updating the organization:", error);
    } finally {
      setIsSaving(false);
    }
  }, [orgId, tempName, onSave, onClose, store]);

  return { tempName, isSaving, handleChange, handleSubmit };
};
