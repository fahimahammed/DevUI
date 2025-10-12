import React from "react";
import "../../styles/global.css";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info" }) => (
  <div className={`toast toast-${type}`}>
    {message}
  </div>
);
