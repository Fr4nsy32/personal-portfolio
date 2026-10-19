import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projectPath } from "@/data/projects";
import type { Project } from "@/types";

const SiblingButton: React.FC<{
  project?: Project;
  direction: "prev" | "next";
  label: string;
  focusRing: string;
}> = ({ project, direction, label, focusRing }) => {
  const { t } = useTranslation();
  const Icon = direction === "next" ? ArrowRight : ArrowLeft;
  const shape =
    "flex h-7 w-7 items-center justify-center rounded-full border transition";

  if (!project) {
    return (
      <span
        aria-hidden
        className={`${shape} border-neutral-900 text-neutral-700`}
      >
        <Icon className="h-4 w-4" />
      </span>
    );
  }

  const name = t(`projects.items.${project.id}.title`);

  return (
    <Link
      to={projectPath(project.id)}
      aria-label={`${label}: ${name}`}
      title={name}
      className={`${shape} border-neutral-800 bg-black text-neutral-300 hover:border-white hover:text-white hover:drop-shadow-border-glow ${focusRing}`}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </Link>
  );
};

export default SiblingButton;
