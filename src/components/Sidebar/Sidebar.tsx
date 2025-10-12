import React from "react";
import "../../styles/global.css";

interface SidebarProps {
  items: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => (
  <div className="sidebar">
    <ul className="sidebar-list">
      {items.map((item) => (
        <li key={item} className="sidebar-item">{item}</li>
      ))}
    </ul>
  </div>
);
