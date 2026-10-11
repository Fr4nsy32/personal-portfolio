import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Contact {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
}

const ContactLink: React.FC<{ contact: Contact }> = ({ contact }) => {
  const Icon = contact.icon;

  return (
    <a
      href={contact.href}
      {...(contact.external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-black p-4 transition hover:border-white hover:drop-shadow-border-glow focus-visible:border-white focus-visible:drop-shadow-border-glow"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Icon
          className="h-5 w-5 text-white transition group-hover:drop-shadow-text-glow group-focus-visible:drop-shadow-text-glow"
          aria-hidden
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-neutral-500 lg:text-sm">
          {contact.label}
        </span>
        <span className="block truncate text-sm font-medium text-white lg:text-base">
          {contact.value}
        </span>
      </span>

      {contact.external && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-neutral-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-hover:drop-shadow-text-glow"
          aria-hidden
        />
      )}
    </a>
  );
};

export default ContactLink;
