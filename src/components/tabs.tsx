import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { panelDomId, tabDomId } from "@/constants";
import type { Tab } from "@/services/types";

export interface TabsProps<T extends string = string> {
  tabs: readonly Tab<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  idPrefix: string;
  label: string;
  fill?: boolean;
  bordered?: boolean;
  className?: string;
}

function Tabs<T extends string = string>({
  tabs,
  activeId,
  onSelect,
  idPrefix,
  label,
  fill = false,
  bordered = true,
  className,
}: TabsProps<T>) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "no-scrollbar relative flex overflow-x-auto overflow-y-hidden",
        !fill && "gap-1",
        bordered && "border-b border-neutral-800",
        className,
      )}
    >
      {tabs.map(({ id, label: text, icon: Icon }) => {
        const isActive = id === activeId;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={tabDomId(idPrefix, id)}
            aria-selected={isActive}
            aria-controls={panelDomId(idPrefix, id)}
            onClick={() => onSelect(id)}
            className={cn(
              "relative flex items-center justify-center gap-1.5 px-3 font-heading transition-colors",
              // Inset ring, so the scroll container never clips it
              "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
              fill ? "flex-1 py-3 text-sm" : "shrink-0 py-2 text-xs lg:text-sm",
              isActive
                ? "text-white drop-shadow-text-glow"
                : "text-neutral-500 hover:text-neutral-300",
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
            {text}
            {isActive && (
              <motion.span
                layoutId={`${idPrefix}-underline`}
                className={cn(
                  "absolute inset-x-0 h-0.5 bg-white",
                  bordered ? "-bottom-px" : "bottom-0",
                )}
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
  );
}

export default Tabs;
