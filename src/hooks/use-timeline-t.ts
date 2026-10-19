import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export type TimelineSection = "background" | "education" | "experience";

/**
 * - `t`    : scoped to `about.timeline.<section>`
 * - `list` : reads an array of strings (returnObjects), always returns an array
 *
 * Convention for every section's JSON:
 *   intro
 *   items.<id>.{ title, place?, status?, summary, highlights[] }
 */
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
