import type { IconType } from "react-icons/lib";

export type ProjectCategory = "web" | "mobile" | "tools";

export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  year: string;
  stack: {
    name: string;
    icon: IconType | undefined;
    color: string;
  }[];
  images: string[];
  repo?: string;
  demo?: string;
};
