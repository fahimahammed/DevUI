import React from "react";
import "../../styles/global.css";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return <input className="input-field" placeholder={placeholder} value={value} onChange={onChange} />;
};
