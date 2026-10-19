import React from "react";
import { cn } from "@/lib/utils";
import type { Tech } from "@/data";

interface TechBadgeProps {
  tech: Tech;
  /**
   * Compact round badge with just the icon, for tight spaces.
   * The name stays available as a tooltip and to screen readers.
   */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Renders a <span>, so wrap it in an <li> when it lives in a <ul>:
 *   <li key={tech.name}><TechBadge tech={tech} /></li>
 */
const TechBadge: React.FC<TechBadgeProps> = ({
  tech,
  iconOnly = false,
  className,
}) => {
  const { name, icon: Icon } = tech;

  return (
    <span
      title={iconOnly ? name : undefined}
      className={cn(
        "inline-flex items-center border border-neutral-800 bg-neutral-950 text-neutral-200 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-600",
        // Fixed size in icon-only mode: never stretches inside a flex row
        iconOnly
          ? "h-8 w-8 justify-center rounded-full"
          : "gap-2 rounded-lg px-3 py-2 text-xs lg:text-sm",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={cn("shrink-0", iconOnly ? "h-3 w-3" : "h-4 w-4")}
          //   style={{ color }}
          aria-hidden
        />
      ) : (
        // No icon: fall back to the initial so the round badge is never empty
        iconOnly && (
          <span aria-hidden className="text-[11px] font-medium">
            {name.charAt(0)}
          </span>
        )
      )}
      {iconOnly ? <span className="sr-only">{name}</span> : name}
    </span>
  );
};

export default TechBadge;
