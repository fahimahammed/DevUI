import React from "react";
import "../../styles/global.css";

interface SelectProps {
  options: string[];
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, onChange }) => (
  <select className="select-box" onChange={(e) => onChange?.(e.target.value)}>
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
);
