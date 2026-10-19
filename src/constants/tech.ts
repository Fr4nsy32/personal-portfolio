import type { IconType } from "react-icons";
import {
  SiExpo,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiHtml5,
  SiI18Next,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export interface Tech {
  name: string;
  icon?: IconType;
  /** Omit for the default (neutral white) */
  color?: string;
}

/**
 * Single source of truth for every technology on the site.
 * Projects (and the skills section) pick from here by key,
 * so a name, icon or color is only ever defined once.
 */
export const TECH = {
  react: { name: "React", icon: SiReact, color: "#61DAFB" },
  typescript: { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  javascript: { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  html: { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  vite: { name: "Vite", icon: SiVite, color: "#A78BFA" },
  motion: { name: "Motion", icon: SiFramer, color: "#4D8DFF" },
  i18next: { name: "i18next", icon: SiI18Next, color: "#26A69A" },
  next: { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  nest: { name: "Nest.js", icon: SiNestjs, color: "#E0234E" },
  node: { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  expo: { name: "Expo", icon: SiExpo, color: "#FFFFFF" },
  firebase: { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  reactNative: { name: "React Native", icon: SiReact, color: "#61DAFB" },
  postgres: { name: "PostgreSQL", icon: SiPostgresql, color: "#FFFFFF" },
  figma: { name: "Figma", icon: SiFigma, color: "#FFFFFF" },
} satisfies Record<string, Tech>;
