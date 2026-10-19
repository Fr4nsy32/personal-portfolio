import React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: React.ElementType;
  active?: boolean;
  size?: "sm" | "md";
}

const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  active = true,
  size = "md",
}) => (
  <span
    className={cn(
      "flex shrink-0 items-center justify-center rounded-lg bg-white/10",
      size === "md" ? "h-10 w-10" : "h-9 w-9",
    )}
  >
    <Icon
      className={cn(
        "h-6 w-6 transition-colors",
        active ? "text-white" : "text-neutral-400",
      )}
      aria-hidden
    />
  </span>
);

export default IconBadge;
