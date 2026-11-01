import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import ProjectDetailPage from "@/features/projects/project-details";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PROJECTS.some((project) => project.id === slug)) notFound();
  return <ProjectDetailPage />;
}
