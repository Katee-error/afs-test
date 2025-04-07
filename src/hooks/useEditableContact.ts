'use client'
import { useState, useEffect } from "react";

export interface ContactData {
  personName: string;
  phoneNumber: string;
  email: string;
}

export const useEditableContact = (
  initialData: ContactData,
  onSaveCallback: (data: ContactData) => void
) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<ContactData>(initialData);


  const { personName, phoneNumber, email } = initialData;
  useEffect(() => {
    setValues({ personName, phoneNumber, email });
  }, [personName, phoneNumber, email]);

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    setValues({ personName, phoneNumber, email });
    setEditing(false);
  };

  const saveEditing = () => {
    onSaveCallback(values);
    setEditing(false);
  };

  const updateField = (field: keyof ContactData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return { editing, values, startEditing, cancelEditing, saveEditing, updateField };
};
