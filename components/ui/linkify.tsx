"use client";

import Link from "next/link";

const LINK_REGEX = /(https?:\/\/[^\s]+|\/projects\/[\w-]+)/g;

export function Linkify({ text }: { text: string }) {
  const linkClass =
    "text-white hover:drop-shadow-text-glow underline underline-offset-2 ";

  return (
    <>
      {text.split(LINK_REGEX).map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {part}
            </a>
          );
        }
        if (part.startsWith("/projects/")) {
          return (
            <Link key={i} href={part} className={linkClass}>
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
