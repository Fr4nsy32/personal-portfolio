import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, MotionConfig } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaGithub, FaGlobe } from "react-icons/fa6";
import { RouteNames } from "@/routes/route-names";
import { motionContainer, motionItem } from "@/constants";
import { PROJECTS, projectPath } from "@/constants/projects";
import ProjectGallery from "./project-gallery";
import type { Project } from "@/services/types";
import TechBadge from "@/components/tech-badge";

const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const SectionHeading: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="mb-3 font-heading text-lg font-medium text-white lg:text-xl">
    {children}
  </h2>
);

const SiblingButton: React.FC<{
  project?: Project;
  direction: "prev" | "next";
  label: string;
}> = ({ project, direction, label }) => {
  const { t } = useTranslation();
  const Icon = direction === "next" ? ArrowRight : ArrowLeft;
  const shape =
    "flex h-7 w-7 items-center justify-center rounded-full border transition";

  // Keeps the pair aligned on the first/last project
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

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const index = PROJECTS.findIndex((p) => p.id === slug);
  if (index === -1) return <Navigate to={RouteNames.PROJECTS} replace />;

  const project = PROJECTS[index];
  const prev = PROJECTS[index - 1];
  const next = PROJECTS[index + 1];
  const base = `projects.items.${project.id}`;

  const list = (key: string): string[] => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };
  const about = list(`${base}.about`);
  const highlights = list(`${base}.highlights`);
  const title = project.title;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 xl:px-12"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Top bar: back link on the left, previous/next on the right */}
        <motion.div
          variants={motionItem}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <Link
            to={RouteNames.PROJECTS}
            className={`inline-flex items-center gap-2 rounded text-sm text-neutral-500 transition hover:text-white hover:drop-shadow-text-glow ${focusRing}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("projects.detail.back")}
          </Link>

          {(prev || next) && (
            <nav
              aria-label={t("projects.detail.siblings")}
              className="flex items-center gap-2"
            >
              <SiblingButton
                project={prev}
                direction="prev"
                label={t("projects.detail.previous")}
              />
              <SiblingButton
                project={next}
                direction="next"
                label={t("projects.detail.next")}
              />
            </nav>
          )}
        </motion.div>

        {/* Top: screenshots on the left, summary on the right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <motion.div variants={motionItem}>
            <ProjectGallery
              key={project.id}
              images={project.images}
              title={title}
            />
          </motion.div>

          <motion.div variants={motionItem} className="space-y-8">
            <header className="space-y-3">
              <p className="flex gap-3 text-xs text-neutral-500 lg:text-sm">
                <span>{t(`projects.categories.${project.category}`)}</span>
                <span className="text-white">{project.year}</span>
              </p>
              <h1 className="font-heading text-3xl font-medium text-white lg:text-4xl">
                {title}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-neutral-300 lg:text-base">
                {t(`${base}.tagline`)}
              </p>
            </header>

            {(project.demo || project.repo) && (
              <div className="flex flex-wrap gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:drop-shadow-border-glow ${focusRing}`}
                  >
                    <FaGlobe className="h-4 w-4" aria-hidden />
                    {t("projects.detail.demo")}
                    {/* <ArrowUpRight className="h-4 w-4" aria-hidden /> */}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:drop-shadow-border-glow focus-visible:border-white ${focusRing}`}
                  >
                    <FaGithub className="h-4 w-4" aria-hidden />
                    {t("projects.detail.repo")}
                  </a>
                )}
              </div>
            )}

            <section>
              <SectionHeading>{t("projects.detail.stack")}</SectionHeading>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech.name}>
                    <TechBadge tech={tech} />
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        </div>

        {/* Bottom: description */}
        {(about.length > 0 || highlights.length > 0) && (
          <motion.div
            variants={motionItem}
            className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 "
          >
            {about.length > 0 && (
              <section>
                <SectionHeading>{t("projects.detail.about")}</SectionHeading>
                <div className="max-w-xl space-y-3 text-sm leading-relaxed text-neutral-300 lg:text-base">
                  {about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {highlights.length > 0 && (
              <section>
                <SectionHeading>
                  {t("projects.detail.highlights")}
                </SectionHeading>
                <ul className="max-w-xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300 marker:text-neutral-600 lg:text-base">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </motion.div>
        )}
      </motion.div>
    </MotionConfig>
  );
};

export default ProjectDetailPage;
