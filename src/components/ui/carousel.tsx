import React from "react";

export type CarouselProps = { children?: React.ReactNode; className?: string; options?: any };

export const Carousel: React.FC<CarouselProps> = ({ children, className }) => (
  <div className={className ?? "carousel"}>{children}</div>
);

export default Carousel;
