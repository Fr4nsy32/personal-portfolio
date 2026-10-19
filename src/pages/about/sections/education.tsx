import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, GraduationCap, Landmark, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Chips,
  IconBadge,
  Intro,
  SectionTitle,
} from "../components";
import { useTimelineT } from "@/hooks/use-timeline-t";

const ITEMS = [
  { id: "diploma", icon: GraduationCap, period: "2015 – 2020" },
  { id: "university", icon: Landmark, period: "2020 – 2023" },
  { id: "bootcamp", icon: Laptop, period: "2023" },
] as const;

export const Education: React.FC = () => {
  const { t, list } = useTimelineT("education");
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(
    () =>
      ITEMS.map((item) => ({
        ...item,
        title: t(`items.${item.id}.title`),
        place: t(`items.${item.id}.place`),
        status: t(`items.${item.id}.status`),
        summary: t(`items.${item.id}.summary`),
        highlights: list(`items.${item.id}.highlights`),
      })),
    [t, list],
  );

  return (
    <div className="space-y-6">
      <Intro>{t("intro")}</Intro>
      <SectionTitle className="mb-5">{t("listTitle")}</SectionTitle>

      <ol className="space-y-3">
        {items.map((item) => {
          const open = openId === item.id;

          return (
            <li key={item.id}>
              <div
                className={cn(
                  "rounded-xl border bg-neutral-950 transition-colors",
                  open
                    ? "border-white drop-shadow-border-glow"
                    : "border-neutral-800 hover:border-neutral-600",
                )}
              >
                <button
                  id={`edu-tab-${item.id}`}
                  aria-expanded={open}
                  aria-controls={`edu-panel-${item.id}`}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center gap-4 rounded-xl p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <IconBadge icon={item.icon} active={open} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white lg:text-base">
                      {item.title}
                    </span>
                    <span className="block text-xs text-neutral-500 lg:text-sm">
                      {item.place} · {item.period}
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
                      id={`edu-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`edu-tab-${item.id}`}
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
                      <div className="space-y-4 px-4 pb-4 lg:pl-20">
                        <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white">
                          {item.status}
                        </span>

                        <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
                          {item.summary}
                        </p>

                        <Chips items={item.highlights} />
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
