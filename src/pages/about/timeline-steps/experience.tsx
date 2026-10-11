import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LayoutDashboard, PenTool, Palette, Plane } from "lucide-react";
import {
  SiFigma,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import {
  IconBadge,
  Intro,
  MetaLine,
  SectionTitle,
  useTimelineT,
} from "./timeline-shared";

const STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Nest.js", icon: SiNestjs, color: "#E0234E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#6E93D6" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
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
          {STACK.map(({ name, icon: Icon, color }) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-600 lg:text-sm"
            >
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color }}
                aria-hidden
              />
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* 1 column on mobile, 2x2 grid from sm, list (1/3) + detail (2/3) from xl */}
      <div>
        <SectionTitle className="mb-1">{t("listTitle")}</SectionTitle>
        <p className="mb-4 text-xs text-neutral-500 lg:text-sm">
          {t("listHint")}
        </p>

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
