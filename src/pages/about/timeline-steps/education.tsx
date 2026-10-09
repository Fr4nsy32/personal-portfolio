import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  GraduationCap,
  Landmark,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// Shared "selected" glow
const GLOW = "drop-shadow-[0_0_2px_#fff]";

interface Step {
  id: string;
  title: string;
  place: string;
  period: string;
  status: string;
  summary: string;
  takeaways: string[];
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */

export const Education: React.FC = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "about.timeline.education",
  });
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>("bootcamp");

  const STEPS: Step[] = [
    {
      id: "diploma",
      title: t("qualifications.diploma.title"),
      place: t("qualifications.diploma.place"),
      period: "2015 – 2020",
      status: t("qualifications.diploma.status"),
      summary: t("qualifications.diploma.summary"),
      takeaways: t("qualifications.diploma.takeaways", {
        returnObjects: true,
      }) as string[],
      icon: GraduationCap,
    },
    {
      id: "university",
      title: t("qualifications.university.title"),
      place: t("qualifications.university.place"),
      period: "2020 – 2023",
      status: t("qualifications.university.status"),
      summary: t("qualifications.university.summary"),
      takeaways: t("qualifications.university.takeaways", {
        returnObjects: true,
      }) as string[],
      icon: Landmark,
    },
    {
      id: "bootcamp",
      title: t("qualifications.bootcamp.title"),
      place: t("qualifications.bootcamp.place"),
      period: "20XX",
      status: t("qualifications.bootcamp.status"),
      summary: t("qualifications.bootcamp.summary"),
      takeaways: t("qualifications.bootcamp.takeaways", {
        returnObjects: true,
      }) as string[],
      icon: Laptop,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="mb-4 max-w-xl text-gray-400 text-base md:text-lg xl:text-xl">
        {t("intro")}
      </p>

      <ol className="space-y-3">
        {STEPS.map((step) => {
          const open = openId === step.id;
          const Icon = step.icon;

          return (
            <li key={step.id}>
              <div
                className={cn(
                  "rounded-xl border bg-neutral-950 transition-colors",
                  open
                    ? cn("border-white", GLOW)
                    : "border-neutral-800 hover:border-neutral-600",
                )}
              >
                <button
                  id={`edu-tab-${step.id}`}
                  aria-expanded={open}
                  aria-controls={`edu-panel-${step.id}`}
                  onClick={() => setOpenId(open ? null : step.id)}
                  className="flex w-full items-center gap-4 rounded-xl p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        open ? cn("text-white") : "text-neutral-400",
                      )}
                      aria-hidden
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-medium text-white transition-[filter] md:text-base",
                        open ,
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="block text-xs text-neutral-500 md:text-sm">
                      {step.place} · {step.period}
                    </span>
                  </span>

                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      open ? "rotate-180 text-white" : "text-neutral-500",
                    )}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`edu-panel-${step.id}`}
                      role="region"
                      aria-labelledby={`edu-tab-${step.id}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 px-4 pb-4 md:pl-20">
                        <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white">
                          {step.status}
                        </span>

                        <p className="text-sm leading-relaxed text-neutral-300">
                          {step.summary}
                        </p>

                        <ul className="flex flex-wrap gap-2">
                          {step.takeaways.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-white/40 px-3 py-1 text-xs text-white"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Education;
