import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export type TimelineSection = "background" | "education" | "experience";

/**
 * One way to read translations in every timeline component.
 *
 * - `t`    : scoped to `about.timeline.<section>`
 * - `list` : reads an array of strings (returnObjects) and always returns an array
 *
 * Convention for every section's JSON:
 *   intro
 *   items.<id>.{ title, place?, status?, summary, highlights[] }
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTimelineT(section: TimelineSection) {
  const { t } = useTranslation(undefined, {
    keyPrefix: `about.timeline.${section}`,
  });

  const list = useCallback(
    (key: string): string[] => {
      const value = t(key, { returnObjects: true }) as unknown;
      return Array.isArray(value) ? (value as string[]) : [];
    },
    [t],
  );

  return { t, list };
}

/* ---------------------------- shared UI bits ---------------------------- */

export const Intro: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="max-w-xl text-base text-gray-400 lg:text-lg xl:text-xl">
    {children}
  </p>
);

export const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h4
    className={cn(
      "mb-3 font-heading text-sm font-medium text-white lg:text-base",
      className,
    )}
  >
    {children}
  </h4>
);

export const MetaLine: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <p className="text-xs text-neutral-500 lg:text-sm">{children}</p>;

export const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="rounded-full border border-white/40 px-3 py-1 text-xs text-white"
      >
        {item}
      </li>
    ))}
  </ul>
);

export const IconBadge: React.FC<{
  icon: React.ElementType;
  active?: boolean;
  size?: "sm" | "md";
}> = ({ icon: Icon, active = true, size = "md" }) => (
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
