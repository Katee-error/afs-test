'use client'
import { useState, useEffect } from "react";

interface CompanyDetails {
  agreement: string;
  date: string;
  businessEntity: string;
  companyType: string;
}

interface EditableCompanyDetails {
  agreement: string;
  date: string;
  businessEntity: string;
  companyTypes: string[];
}

export const useEditableCompanyDetails = (
  initialData: CompanyDetails,
  onSaveCallback: (data: CompanyDetails) => void
) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<EditableCompanyDetails>({
    agreement: initialData.agreement,
    date: initialData.date,
    businessEntity: initialData.businessEntity,
    companyTypes: initialData.companyType.split(",").map((v) => v.trim()),
  });

  const { agreement, date, businessEntity, companyType } = initialData;
  useEffect(() => {
    setValues({
      agreement,
      date,
      businessEntity,
      companyTypes: companyType.split(",").map((v) => v.trim()),
    });
  }, [agreement, date, businessEntity, companyType]);

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    setValues({
      agreement: initialData.agreement,
      date: initialData.date,
      businessEntity: initialData.businessEntity,
      companyTypes: initialData.companyType.split(",").map((v) => v.trim()),
    });
    setEditing(false);
  };

  const saveEditing = () => {
    const payload: CompanyDetails = {
      agreement: values.agreement,
      date: values.date,
      businessEntity: values.businessEntity,
      companyType: values.companyTypes.join(", "),
    };
    onSaveCallback(payload);
    setEditing(false);
  };

  const updateField = (
    field: keyof EditableCompanyDetails,
    value: string | string[]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return { editing, values, startEditing, cancelEditing, saveEditing, updateField };
};
