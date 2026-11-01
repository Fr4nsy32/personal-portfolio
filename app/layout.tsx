import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "@/app-styles.css";
import Layout from "@/layout";
import Providers from "./providers";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Andi Sina – Web Developer",
  description: "Andi Sina portfolio, web developer building fast, accessible web apps.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
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
