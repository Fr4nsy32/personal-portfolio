import React, { useState } from "react";
import logo from "../../assets/svg/personal_logo.svg";
import DownloadResumeButton from "../../components/download-resume-button";

const NAV_LINKS = [
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Contacts", href: "#" },
];

const NavbarComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`
        z-50 flex
        w-[calc(100%-2rem)] max-w-4xl
        px-6 py-4
        text-white text-sm
        bg-black
        border border-slate-700
        transition-[border-radius]
        fixed top-4 left-1/2 -translate-x-1/2 items-center justify-between duration-50 ease-in-out
        ${isMenuOpen ? "rounded-t-4xl" : "rounded-full"}
      `}
    >
      {" "}
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          className="
            w-10 h-10
          "
        />
      </a>
      {/* Desktop: links + buttons pushed to the end with ml-auto */}
      <div
        className="
          hidden
          ml-auto
          items-center gap-6
          md:flex
        "
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="
              overflow-hidden
              h-6
              relative group
            "
          >
            <span
              className="
                block
                transition-transform
                group-hover:-translate-y-[10%] duration-300
              "
            >
              {label}
            </span>
            <span
              className="
                block
                transition-transform
                absolute top-full left-0 group-hover:translate-y-full duration-300
              "
            >
              {label}
            </span>
          </a>
        ))}

        <div
          className="
            flex
            ml-4
            items-center gap-4
          "
        >
          <DownloadResumeButton />
        </div>
      </div>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
        className="
          text-gray-600
          md:hidden
        "
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            w-6 h-6
          "
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {/* Mobile menu: always mounted so its open/close can animate instead of
          snapping in and out. The outer div animates a grid row from 0fr to 1fr
          (a CSS trick for animating to an auto/content height), paired with an
          opacity fade; the inner div clips the content while it grows/shrinks. */}
      <div
        aria-hidden={!isMenuOpen}
        className={`
          grid z-10
          transition-[grid-template-rows,opacity]
          absolute top-full -inset-x-px -mt-px duration-200 ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div
          className="
            overflow-hidden
          "
        >
          <div
            className="
              flex flex-col
              text-base
              bg-black
              border border-t-0 border-slate-700 rounded-b-3xl
              items-center
            "
          >
            {NAV_LINKS.map(({ label, href }, index) => (
              <React.Fragment key={label}>
                <a
                  href={href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="
                    py-4
                  "
                >
                  {label}
                </a>
                {index < NAV_LINKS.length - 1 && (
                  <div
                    className="
                      w-50 h-px
                      bg-slate-700
                    "
                  />
                )}
              </React.Fragment>
            ))}
            <DownloadResumeButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
