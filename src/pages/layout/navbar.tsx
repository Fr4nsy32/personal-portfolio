import React, { useState } from "react";
import logo from "@/assets/svg/personal_logo.svg";
import DownloadResumeButton from "@/components/download-resume-button";
import { RouteNames } from "@/routes/route-names";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent: React.FC = () => {
  const NAV_LINKS = [
    { label: "About", route: RouteNames.ABOUT },
    { label: "Projects", route: RouteNames.PROJECTS },
    { label: "Contacts", route: RouteNames.CONTACTS },
  ];
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
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <img
          src={logo}
          alt="Logo"
          className="
            w-10 h-10
          "
        />
      </Link>
      {/* Desktop navigation links and download button */}
      <div
        className="
          hidden
          ml-auto
          items-center gap-6
          md:flex
        "
      >
        {NAV_LINKS.map(({ label, route }) => (
          <NavLink
            key={label}
            to={route}
            className={({ isActive }) => `
              overflow-hidden
              h-6
              relative group
              ${isActive ? "text-white font-medium" : "text-gray-300"}
            `}
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
          </NavLink>
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
      {/* Mobile menu button and dropdown */}
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
            {NAV_LINKS.map(({ label, route }, index) => (
              <React.Fragment key={label}>
                <NavLink
                  to={route}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `
                    py-4
                    ${isActive ? "text-white font-medium" : "text-gray-300"}
                  `}
                >
                  {label}
                </NavLink>
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
