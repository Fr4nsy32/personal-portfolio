import type { Metadata } from "next";

export const SITE_URL = "https://as-web.dev";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Andi Sina",
      locale: "en_US",
      title,
      description,
      url: path,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Andi Sina, Web Developer – as-web.dev" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
