import React from "react";

interface ProgressProps {
  value: number;
}

export const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded h-3">
      <div
        className="bg-blue-500 h-3 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
