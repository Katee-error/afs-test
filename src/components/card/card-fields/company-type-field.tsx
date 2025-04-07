import React from "react";
import { CustomMultiSelect } from "@/components/ui/multi-select/custom-multi-select";
import { COMPANY_TYPE_OPTIONS } from "@/constant";
import styles from "./../Card.module.scss";

interface CompanyTypeFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const CompanyTypeField: React.FC<CompanyTypeFieldProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <div className={styles.row}>
    <label className={styles.label}>Company type</label>
    <CustomMultiSelect
      options={COMPANY_TYPE_OPTIONS}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);
