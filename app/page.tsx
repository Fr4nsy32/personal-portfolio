import { pageMetadata } from "@/lib/seo";
import seo from "@/locales/en/seo.json";

export const metadata = pageMetadata(seo.home.title, seo.home.description, "/");

export { default } from "@/features/home";
