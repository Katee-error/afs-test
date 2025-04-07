import React from "react";
import { CustomMultiSelect } from "@/components/ui/multi-select/custom-multi-select";
import styles from "./../Card.module.scss";

export interface Option {
  value: string;
  label: string;
}
export interface CompanyTypeFieldProps {
  options: Option[]; 
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const CompanyTypeField: React.FC<CompanyTypeFieldProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => (
  <div className={styles.row}>
    <label className={styles.label}>Company type</label>
    <CustomMultiSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);
