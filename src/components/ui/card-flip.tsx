"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardFlipProps {
  frontTitle: string;
  frontContent: string;
  backContent: string;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  frontTitle,
  frontContent,
  backContent
}) => {
  return (
    <div className="group [perspective:1000px] w-full max-w-xs mx-auto">
      <div className="relative w-full h-64 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-primary text-primary-foreground rounded-xl shadow-lg flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-bold">{frontTitle}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{frontContent}</p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-secondary text-secondary-foreground rounded-xl shadow-lg flex items-center justify-center p-4">
          <p className="text-center">{backContent}</p>
        </div>
      </div>
    </div>
  );
};
