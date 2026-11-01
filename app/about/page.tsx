import { pageMetadata } from "@/lib/seo";
import seo from "@/locales/en/seo.json";

export const metadata = pageMetadata(seo.about.title, seo.about.description, "/about");

export { default } from "@/features/about";
