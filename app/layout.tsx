import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "@/app-styles.css";
import Layout from "@/layout";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.as-web.dev"),
  title: "Andi Sina – Web Developer",
  description: "Andi Sina portfolio, web developer building fast, accessible web apps.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Andi Sina",
    locale: "en_US",
    title: "Andi Sina – Web Developer",
    description: "Andi Sina portfolio, web developer building fast, accessible web apps.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Andi Sina, Web Developer – as-web.dev" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers><Layout>{children}</Layout></Providers>
      </body>
    </html>
  );
}
