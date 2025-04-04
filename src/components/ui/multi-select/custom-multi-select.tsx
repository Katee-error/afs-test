import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomMultiSelect.module.scss";
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleToggleOption = (optionLabel: string) => {
    if (value.includes(optionLabel)) {
      onChange(value.filter((v) => v !== optionLabel));
    } else {
      onChange([...value, optionLabel]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = options.filter((option) =>
    value.includes(option.label)
  );

  return (
    <div className={styles.customMultiSelect} ref={containerRef}>
      <div className={styles.control} onClick={toggleOpen}>
        <span className={styles.value}>
          {selectedOptions.length > 0
            ? selectedOptions.map((opt) => opt.label).join(", ")
            : placeholder}
        </span>
        <span className={styles.arrow}>{isOpen ? <ChevronUp/> : <ChevronDown />}</span>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <label key={option.value} className={styles.option}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={value.includes(option.label)}
              onChange={() => handleToggleOption(option.label)}
              placeholder={option.label}
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


