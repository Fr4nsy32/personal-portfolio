import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => (
  <h4
    className={cn(
      "mb-3 font-heading text-sm font-medium text-white lg:text-base",
      className,
    )}
  >
    {children}
  </h4>
);

export default SectionTitle;
