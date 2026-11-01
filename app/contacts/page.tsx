import { pageMetadata } from "@/lib/seo";
import seo from "@/locales/en/seo.json";

export const metadata = pageMetadata(seo.contacts.title, seo.contacts.description, "/contacts");

export { default } from "@/features/contacts";
