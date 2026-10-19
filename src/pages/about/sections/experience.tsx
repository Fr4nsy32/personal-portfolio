import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LayoutDashboard, PenTool, Palette, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconBadge,
  Intro,
  MetaLine,
  SectionTitle,
} from "../components";
import TechBadge from "@/components/tech-badge";
import { TECH } from "@/data";
import { useTimelineT } from "@/hooks/use-timeline-t";

const STACK = [
  TECH.react,
  TECH.next,
  TECH.nest,
  TECH.typescript,
  TECH.javascript,
  TECH.postgres,
  TECH.figma,
] as const;

const ITEMS = [
  { id: "platform", icon: LayoutDashboard },
  { id: "sites", icon: Palette },
  { id: "design", icon: PenTool },
  { id: "deploy", icon: Plane },
] as const;

export const Experience: React.FC = () => {
  const { t, list } = useTimelineT("experience");
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(ITEMS[0].id);

  const items = useMemo(
    () =>
      ITEMS.map((item) => ({
        ...item,
        title: t(`items.${item.id}.title`),
        summary: t(`items.${item.id}.summary`),
        highlights: list(`items.${item.id}.highlights`),
      })),
    [t, list],
  );

  // Always one item selected, so the detail card is never empty
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <MetaLine>
          {"JavaScript Developer"} · {"Makr Shakr"} · {"2023 – 2025"}
        </MetaLine>
        <Intro>{t("intro")}</Intro>
      </div>

      <div>
        <SectionTitle>{t("stackTitle")}</SectionTitle>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <li key={tech.name}>
              <TechBadge tech={tech} />
            </li>
          ))}
        </ul>
      </div>

      {/* 1 column on mobile, 2x2 grid from sm, list (1/3) + detail (2/3) from xl */}
      <div>
        <SectionTitle className="mb-5">{t("listTitle")}</SectionTitle>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div
            role="group"
            aria-label={t("listLabel")}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:col-span-1 xl:grid-cols-1 xl:content-start"
          >
            {items.map((item) => {
              const isActive = item.id === active.id;
              return (
                <button
                  key={item.id}
                  aria-pressed={isActive}
                  aria-controls="exp-panel"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    "xl:p-4",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                    isActive
                      ? "border-white bg-neutral-900 drop-shadow-border-glow"
                      : "border-neutral-800 bg-neutral-950 hover:border-neutral-600",
                  )}
                >
                  <IconBadge icon={item.icon} active={isActive} size="sm" />
                  <span className="text-xs font-medium leading-snug text-white lg:text-sm">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id="exp-panel"
                role="region"
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-xl border border-white bg-neutral-950 p-4 drop-shadow-border-glow xl:p-6"
              >
                <div className="flex items-center gap-3">
                  <active.icon
                    className="h-5 w-5 shrink-0 text-white"
                    aria-hidden
                  />
                  <h5 className="font-heading text-base font-medium text-white lg:text-lg">
                    {active.title}
                  </h5>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 lg:text-base">
                  {active.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {active.highlights.map((text) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-xs text-neutral-300 lg:text-sm"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                        aria-hidden
                      />
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
