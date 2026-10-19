import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, PROJECTS, projectPath } from "@/constants";
import type { Project, ProjectCategory } from "@/services/types";
import TechBadge from "@/components/tech-badge";

const MAX_CHIPS = 3;

// Drop-in replacement for ProjectRow in project-tree.tsx (imports unchanged).

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();
  const base = `projects.items.${project.id}`;

  // Render and count from the same list so the icons and "+N" always agree
  const visible = project.stack.slice(0, MAX_CHIPS) ?? [];
  const extra = (project.stack.length ?? 0) - visible.length;

  return (
    <li className="group/row relative">
      {/* Branch connecting the row to the tree line */}
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

          {/* items-center: stops the chips stretching to the height of "+N" */}
          <span className="mt-3 hidden flex-wrap items-center gap-2 sm:flex">
            {visible.map((tech) => (
              <TechBadge key={tech.name} tech={tech} iconOnly />
            ))}
            {/* {visible.map(({ name, icon: Icon, color }) => (
              <span
                key={name}
                title={name}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-600"
              >
                {Icon && (
                  <Icon
                    className="h-3 w-3 shrink-0"
                    style={{ color }}
                    aria-hidden
                  />
                )}
                <span className="sr-only">{name}</span>
              </span>
            ))} */}
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

const ProjectGroup: React.FC<{
  category: ProjectCategory;
  projects: Project[];
}> = ({ category, projects }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const panelId = `projects-group-${category}`;
  const Icon = open ? FolderOpen : Folder;

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 rounded-lg py-2 text-left font-heading text-lg font-medium text-white outline-none transition  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:text-xl"
      >
        <Icon
          className="h-5 w-5 text-white drop-shadow-text-glow"
          aria-hidden
        />
        <span>{t(`projects.categories.${category}`)}</span>
        <span className="text-sm font-normal text-neutral-500">
          {projects.length}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 text-neutral-500 transition-transform duration-200",
            !open && "-rotate-90",
          )}
          aria-hidden
        />
      </button>

      {/* `invisible` when closed removes the links from the tab order,
          and visibility only flips at the end of the transition. */}
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-in-out",
          open
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="mt-2 ml-2.5 space-y-3 border-l border-neutral-800 pr-3 pb-3 pl-6">
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const ProjectTree: React.FC = () => {
  const groups = CATEGORIES.map((category) => ({
    category,
    projects: PROJECTS.filter((p) => p.category === category),
  })).filter((g) => g.projects.length > 0);

  return (
    <div className="space-y-6">
      {groups.map(({ category, projects }) => (
        <ProjectGroup key={category} category={category} projects={projects} />
      ))}
    </div>
  );
};

export default ProjectTree;
