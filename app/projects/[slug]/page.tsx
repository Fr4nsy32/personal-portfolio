import { notFound } from "next/navigation";
import { PROJECTS, projectPath } from "@/data/projects";
import ProjectDetailPage from "@/features/projects/project-details";
import { pageMetadata } from "@/lib/seo";
import translations from "@/locales/en/projects.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);
  if (!project) notFound();
  const description = translations.items[slug as keyof typeof translations.items]?.tagline
    ?? `${project.title}, a development project by Andi Sina.`;
  return pageMetadata(`${project.title} – Andi Sina`, description, projectPath(project.id));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PROJECTS.some((project) => project.id === slug)) notFound();
  return <ProjectDetailPage />;
}
