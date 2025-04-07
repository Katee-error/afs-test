import React from "react";
import CustomSelect from "@/components/ui/select/custom-select";
import { BUSINESS_ENTITY_OPTIONS } from "@/constant";
import styles from "./../Card.module.scss";

interface BusinessEntityFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const BusinessEntityField: React.FC<BusinessEntityFieldProps> = ({
  value,
  onChange,
}) => (
  <div className={styles.row}>
    <label className={styles.label}>Business entity</label>
    <CustomSelect
      options={BUSINESS_ENTITY_OPTIONS}
      value={value}
      onChange={onChange}
    />
  </div>
);
