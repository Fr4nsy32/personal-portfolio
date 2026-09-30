import { Link } from "react-router-dom";

const LINK_REGEX = /(https?:\/\/[^\s]+|\/projects\/[\w-]+)/g;
const linkClass =
  "text-sky-400 underline underline-offset-2 hover:text-sky-300";

export function Linkify({ text }: { text: string }) {
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
            <Link key={i} to={part} className={linkClass}>
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
