import type { LucideIcon } from "lucide-react";

export type Tab<T extends string = string> = {
  id: T;
  label: string;
  icon?: LucideIcon;
};

export type TabId = Tab["id"];