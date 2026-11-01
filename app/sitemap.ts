import type { MetadataRoute } from "next";
import { PROJECTS, projectPath } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/projects", "/contacts", ...PROJECTS.map((project) => projectPath(project.id))]
    .map((path) => ({ url: new URL(path, SITE_URL).href }));
}
