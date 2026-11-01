import { pageMetadata } from "@/lib/seo";
import seo from "@/locales/en/seo.json";

export const metadata = pageMetadata(seo.projects.title, seo.projects.description, "/projects");

export { default } from "@/features/projects";
