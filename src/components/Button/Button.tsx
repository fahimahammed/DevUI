import React from "react";
import "../../styles/global.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary" }) => {
  const buttonClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  return <button onClick={onClick} className={`btn ${buttonClass}`}>{label}</button>;
};
