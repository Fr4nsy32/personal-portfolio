import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { projectPath } from "@/data";
import type { Project } from "@/types";
import TechBadge from "@/components/tech-badge";

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();
  const base = `projects.items.${project.id}`;
  const visible = project.stack.slice(0, 3) ?? [];
  const extra = (project.stack.length ?? 0) - visible.length;

  return (
    <li className="group/row relative">
      <span
        aria-hidden
        className="absolute top-1/2 -left-6 h-px w-6 bg-neutral-800 transition-colors group-hover/row:bg-white group-focus-within/row:bg-white"
      />

      <NavLink
        to={projectPath(project.id)}
        className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-black p-4 transition hover:border-white hover:drop-shadow-border-glow focus-visible:border-white focus-visible:drop-shadow-border-glow"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate font-heading text-base font-medium text-white group-hover:drop-shadow-text-glow group-focus-visible:drop-shadow-text-glow lg:text-lg">
            {project.title}
          </span>
          <span className="mt-1 line-clamp-2 block text-xs text-neutral-500 lg:text-sm">
            {t(`${base}.tagline`)}
          </span>

          <span className="mt-3 hidden flex-wrap items-center gap-2 sm:flex">
            {visible.map((tech) => (
              <TechBadge key={tech.name} tech={tech} iconOnly />
            ))}
            {extra > 0 && (
              <span className="px-1 text-[11px] text-neutral-500 lg:text-xs">
                +{extra}
              </span>
            )}
          </span>
        </span>

        <span className="shrink-0 text-xs text-neutral-500 lg:text-sm">
          {project.year}
        </span>

        <ArrowRight
          className="h-4 w-4 shrink-0 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-white group-hover:drop-shadow-text-glow group-focus-visible:text-white"
          aria-hidden
        />
      </NavLink>
    </li>
  );
};

export default ProjectRow;
