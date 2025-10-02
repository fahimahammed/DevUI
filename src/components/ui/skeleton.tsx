import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean | string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  rounded = true,
  className
}) => {
  return (
    <div
      style={{ width, height }}
      className={clsx(
        "bg-gray-300 dark:bg-gray-700 animate-pulse",
        rounded ? "rounded-md" : "",
        className
      )}
    />
  );
};