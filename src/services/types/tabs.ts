import type { LucideIcon } from "lucide-react";

export type Tab<T extends string = string> = {
  id: T;
  label: string;
  icon?: LucideIcon;
};

export type TabId = Tab["id"];

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
