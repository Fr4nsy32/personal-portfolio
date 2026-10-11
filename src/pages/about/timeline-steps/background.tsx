import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChefHat, ConciergeBell, Users, Wine } from "lucide-react";
import Tabs from "@/components/tabs";
import { panelDomId, tabDomId } from "@/constants/tab-ids";
import {
  Chips,
  IconBadge,
  Intro,
  MetaLine,
  SectionTitle,
  useTimelineT,
} from "./timeline-shared";

const STATS = [
  { id: "years", value: "6+" },
  { id: "roles", value: "4" },
] as const;

const ITEMS = [
  { id: "cook", icon: ChefHat, period: "2017 – 2019" },
  { id: "service", icon: ConciergeBell, period: "2019 – 2020" },
  { id: "barman", icon: Wine, period: "2020 – 2021" },
  { id: "lead", icon: Users, period: "2021 – 2023" },
] as const;

const ID_PREFIX = "bg";

export const Background: React.FC = () => {
  const { t, list } = useTimelineT("background");
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(ITEMS[0].id);

  /* Translations are resolved once, in one place, into a ready-to-render shape. */
  const items = useMemo(
    () =>
      ITEMS.map((item) => ({
        ...item,
        title: t(`items.${item.id}.title`),
        place: t(`items.${item.id}.place`),
        summary: t(`items.${item.id}.summary`),
        highlights: list(`items.${item.id}.highlights`),
      })),
    [t, list],
  );

  const tabs = useMemo(
    () => items.map(({ id, icon, title }) => ({ id, icon, label: title })),
    [items],
  );

  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Intro>{t("intro")}</Intro>
        <dl className="grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 lg:p-4"
            >
              <dt className="order-2 text-[11px] leading-tight text-neutral-500 lg:text-xs">
                {t(`stats.${s.id}`)}
              </dt>
              <dd className="font-heading text-2xl font-medium text-white lg:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <SectionTitle>{t("listTitle")}</SectionTitle>

        <Tabs
          tabs={tabs}
          activeId={active.id}
          onSelect={setActiveId}
          idPrefix={ID_PREFIX}
          label={t("listLabel")}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={panelDomId(ID_PREFIX, active.id)}
            aria-labelledby={tabDomId(ID_PREFIX, active.id)}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-5"
          >
            <div className="flex items-center gap-3">
              <IconBadge icon={active.icon} />
              <MetaLine>
                {active.place} ·{" "}
                <span className="text-white">{active.period}</span>
              </MetaLine>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-neutral-300 lg:text-base">
              {active.summary}
            </p>

            <Chips items={active.highlights} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Background;
