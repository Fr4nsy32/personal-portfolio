import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";

const TechExperience: React.FC = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "about.timeline.experience",
  });
  const GLOW = "drop-shadow-[0_0_2px_#fff]";

  const ROLE = "JavaScript Developer";
  const COMPANY = "Makr Shakr";
  const PERIOD = "2023 – 2025";

  const INTRO = t("intro");

  const STACK = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Nest.js", icon: SiNestjs, color: "#E0234E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#6E93D6" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  ] as const;

  const AREAS = [
    {
      id: "platform",
      icon: LayoutDashboard,
      title: t("areas.platform.title"),
      summary: t("areas.platform.summary"),
      highlights: t("areas.platform.highlights", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "sites",
      icon: Palette,
      title: t("areas.sites.title"),
      summary: t("areas.sites.summary"),
      highlights: t("areas.sites.highlights", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "design",
      icon: PenTool,
      title: t("areas.design.title"),
      summary: t("areas.design.summary"),
      highlights: t("areas.design.highlights", {
        returnObjects: true,
      }) as string[],
    },
    {
      id: "deploy",
      icon: Plane,
      title: t("areas.deploy.title"),
      summary: t("areas.deploy.summary"),
      highlights: t("areas.deploy.highlights", {
        returnObjects: true,
      }) as string[],
    },
  ] as const;
  const reduceMotion = useReducedMotion();
  type AreaId = (typeof AREAS)[number]["id"];
  // Always one area selected, so the detail card is never empty
  const [activeId, setActiveId] = useState<AreaId>(AREAS[0].id);
  const active = AREAS.find((a) => a.id === activeId) ?? AREAS[0];
  const ActiveIcon = active.icon;

  return (
    <div className="space-y-10">
      {/* Intro, role and stats */}
      <div>
        <p className="mb-2 text-xs text-neutral-500 md:text-sm">
          {ROLE} · {COMPANY} · {PERIOD}
        </p>
        <p className="mb-4 max-w-xl text-gray-400 text-base md:text-lg xl:text-xl">
          {INTRO}
        </p>
      </div>

      {/* Stack */}
      <div>
        <h4 className="mb-3 text-sm font-medium font-heading text-white md:text-base">
          {t("stack")}
        </h4>
        <ul className="flex flex-wrap gap-2">
          {STACK.map(({ name, icon: Icon, color }) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-600 md:text-sm"
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

      {/* Work areas: list on the left (1/3), detail card on the right (2/3) */}
      <div>
        <h4 className="mb-1 text-sm font-medium font-heading text-white md:text-base">
          {t("cards_title")}
        </h4>
        <p className="mb-4 text-xs text-neutral-500 md:text-sm">
          {t("cards_action")}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Cards: 2x2 on mobile, vertical list from md up */}
          <div
            role="group"
            aria-label="What I worked on"
            className="grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-1 md:content-start"
          >
            {AREAS.map((area) => {
              const isActive = area.id === activeId;
              const Icon = area.icon;
              return (
                <button
                  key={area.id}
                  aria-pressed={isActive}
                  aria-controls="tech-area-panel"
                  onClick={() => setActiveId(area.id)}
                  className={cn(
                    "flex flex-col items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                    "md:flex-row md:items-center md:p-4",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                    isActive
                      ? cn("border-white bg-neutral-900", GLOW)
                      : "border-neutral-800 bg-neutral-950 hover:border-neutral-600",
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-neutral-400",
                      )}
                      aria-hidden
                    />
                  </span>
                  <span className="text-xs font-medium leading-snug text-white md:text-sm">
                    {area.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail card: stretches to match the height of the list */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id="tech-area-panel"
                role="region"
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "h-full rounded-xl border border-white bg-neutral-950 p-4 md:p-6",
                  GLOW,
                )}
              >
                <div className="flex items-center gap-3">
                  <ActiveIcon
                    className="h-5 w-5 shrink-0 text-white"
                    aria-hidden
                  />
                  <h5 className="font-heading text-base font-medium text-white md:text-lg">
                    {active.title}
                  </h5>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  {active.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {active.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-xs text-neutral-300 md:text-sm"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                        aria-hidden
                      />
                      {item}
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

export default TechExperience;
