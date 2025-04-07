import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./CustomMultiSelect.module.scss";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatLabel } from "@/utils/format";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface CustomMultiSelectProps {
  options: MultiSelectOption[];
  value: string[]; 
  onChange: (selected: string[]) => void;
  placeholder?: string;
}
export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformedOptions = useMemo(
    () =>
      options.map(option => ({
        ...option,
        label: formatLabel(option.label),
      })),
    [options]
  );

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = transformedOptions.filter(option =>
    value.includes(option.value)
  );

  return (
    <div className={styles.customMultiSelect} ref={containerRef}>
      <div className={styles.control} onClick={toggleOpen}>
        <span className={styles.value}>
          {selectedOptions.length > 0
            ? selectedOptions.map(opt => opt.label).join(", ")
            : placeholder}
        </span>
        <span className={styles.arrow}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {transformedOptions.map(option => (
            <label key={option.value} className={styles.option}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={value.includes(option.value)}
                onChange={() => handleToggleOption(option.value)}
              />
              <span className={styles.checkboxBox}></span>
              <span className={styles.optionLabel}>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

