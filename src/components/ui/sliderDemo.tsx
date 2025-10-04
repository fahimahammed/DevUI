"use client";

import React, { useState } from "react";
// Import the component being demonstrated from the same directory
import { Slider } from "./slider"; 

export function SliderDemo() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div className="w-full max-w-sm pt-2">
      <Slider 
        value={sliderValue} 
        onValueChange={setSliderValue} 
        max={100} 
        step={1} 
      />
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Current Value: {sliderValue[0]}
      </p>
    </div>
  );
}