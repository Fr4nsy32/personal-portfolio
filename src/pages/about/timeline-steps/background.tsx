import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChefHat, ConciergeBell, Users, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

// Language-neutral data lives at module level, so it isn't recreated on every render
const STATS = [
  { id: "years", value: "6+" },
  { id: "roles", value: "4" },
] as const;

const ROLES = [
  { id: "cook", period: "2017 – 2019" },
  { id: "service", period: "2019 – 2020" },
  { id: "barman", period: "2020 – 2021" },
  { id: "lead", period: "2021 – 2023" },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

const ICONS: Record<RoleId, React.ElementType> = {
  cook: ChefHat,
  service: ConciergeBell,
  barman: Wine,
  lead: Users,
};

// Shared "selected" glow
const GLOW = "drop-shadow-[0_0_1px_#fff]";

const Background: React.FC = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "about.timeline.background",
  });
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<RoleId>(ROLES[0].id);

  const active = ROLES.find((r) => r.id === activeId) ?? ROLES[0];
  const ActiveIcon = ICONS[active.id];
  const learned = t(`roles.${active.id}.learned`, {
    returnObjects: true,
  }) as string[];

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-4 max-w-xl text-gray-400 text-base md:text-lg xl:text-xl">
          {t("intro")}
        </p>
        <dl className="grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 md:p-4"
            >
              <dt className="order-2 text-[11px] leading-tight text-neutral-500 md:text-xs">
                {t(`stats.${s.id}`)}
              </dt>
              <dd className="font-heading text-2xl font-medium text-white md:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium font-heading text-white md:text-base">
          {t("pathTitle")}
        </h4>

        <div
          role="tablist"
          aria-label={t("tablistLabel")}
          className="relative flex gap-1 overflow-x-auto border-b border-neutral-800 overflow-y-hidden"
        >
          {ROLES.map((role) => {
            const isActive = role.id === activeId;
            const Icon = ICONS[role.id];
            return (
              <button
                key={role.id}
                role="tab"
                id={`tab-${role.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${role.id}`}
                onClick={() => setActiveId(role.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-1.5 px-3 py-2 text-xs font-heading transition-colors md:text-sm",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                  isActive
                    ? cn("text-white", GLOW)
                    : "text-neutral-500 hover:text-neutral-300",
                )}
              >
                <Icon
                  className="hidden h-3.5 w-3.5 sm:block"
                  aria-hidden
                />
                {t(`roles.${role.id}.title`)}
                {isActive && (
                  <motion.span
                    layoutId="role-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-white"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 40 }
                    }
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="pt-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <ActiveIcon
                  className={cn("h-5 w-5 text-white")}
                  aria-hidden
                />
              </span>
              <p className="text-xs text-neutral-500 md:text-sm">
                {t(`roles.${active.id}.where`)} ·{" "}
                <span className="text-white">{active.period}</span>
              </p>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
              {t(`roles.${active.id}.summary`)}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {learned.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/40 px-3 py-1 text-xs text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Background;