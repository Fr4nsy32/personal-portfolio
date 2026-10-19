import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";
import ProjectRow from "./project-row";

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

export default ProjectGroup;
