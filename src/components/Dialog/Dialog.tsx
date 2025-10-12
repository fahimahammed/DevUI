import React from "react";
import "../../styles/global.css";

interface DialogProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({ title, message, onClose }) => (
  <div className="dialog">
    <h3 className="dialog-title">{title}</h3>
    <p className="dialog-message">{message}</p>
    <button className="btn btn-secondary" onClick={onClose}>Close</button>
  </div>
);
