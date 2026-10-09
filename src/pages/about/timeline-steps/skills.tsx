import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { Languages, MessageCircle, Timer, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* EDIT THIS: keep only what you really use. Colors are brand colors;  */
/* icons that are black by default (GitHub) are set to white.          */
/* ------------------------------------------------------------------ */

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface Group {
  id: string;
  label: string;
  skills: Skill[];
}

const GROUPS: Group[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "Vite", icon: SiVite, color: "#A78BFA" },
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#6E93D6" },
      { name: "Ruby", icon: SiRuby, color: "#E0483F" },
      { name: "Rails", icon: SiRubyonrails, color: "#E0483F" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    id: "people",
    label: "People & mindset",
    skills: [
      { name: "Teamwork", icon: Users, color: "#34D399" },
      { name: "Customer communication", icon: MessageCircle, color: "#38BDF8" },
      { name: "Working under pressure", icon: Timer, color: "#FBBF24" },
      { name: "Analytical thinking", icon: TrendingUp, color: "#A78BFA" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Italian", icon: Languages, color: "#F472B6" },
      { name: "English", icon: Languages, color: "#F472B6" },
      { name: "Albanian", icon: Languages, color: "#F472B6" },
      { name: "French", icon: Languages, color: "#F472B6" },
    ],
  },
];

/* ------------------------------------------------------------------ */

export const Skills: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  const visible =
    filter === "all" ? GROUPS : GROUPS.filter((g) => g.id === filter);

  const filters = [{ id: "all", label: "All" }, ...GROUPS];

  return (
    <div className="space-y-6">
      <p className="max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
        The technologies I work with, plus the people skills I picked up
        before writing code.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors md:text-sm",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                active
                  ? "border-white bg-white text-black"
                  : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          {visible.map((group) => (
            <section key={group.id}>
              <h4 className="mb-3 text-xs uppercase tracking-widest text-neutral-500">
                {group.label}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li
                      key={`${group.id}-${skill.name}`}
                      className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-600 md:text-sm"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: skill.color }}
                        aria-hidden
                      />
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Skills;
