import React, { useState } from "react";
import logo from "@/assets/svg/personal_logo.svg";
import { RouteNames } from "@/routes/route-names";
import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "@/components/language-toggle";
import { useTranslation } from "react-i18next";
import cv_eng from "@/assets/pdf/Andi_Sina_CV_Eng.pdf";
import cv_ita from "@/assets/pdf/Andi_Sina_CV_Ita.pdf";
import LottieButton from "@/components/lottie-button";
import downloadAnimation from "@/assets/lottie/downloadAnimation.json";

const NavbarComponent: React.FC = () => {
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t("nav.about"), route: RouteNames.ABOUT },
    { label: t("nav.projects"), route: RouteNames.PROJECTS },
    { label: t("nav.contacts"), route: RouteNames.CONTACTS },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const downloadCv = () => {
    const isEnglish = document.documentElement.lang === "en";

    const link = document.createElement("a");
    link.href = isEnglish ? cv_eng : cv_ita;
    link.download = isEnglish ? "Andi_Sina_CV_Eng.pdf" : "Andi_Sina_CV_Ita.pdf";
    link.click();
  };

  return (
    <nav
      className={`
        z-50 flex
        w-[calc(100%-2rem)] max-w-4xl
        px-6 py-4
        text-white text-md
        bg-black
        border border-white/30
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
          sm:flex
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
              font-heading
              ${isActive ? "text-white font-medium drop-shadow-text-glow" : "text-gray-300"}
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
          <LottieButton
            text={"CV"}
            animation={downloadAnimation}
            speed={2}
            onComplete={downloadCv}
            className="mb-3 sm:mb-0"
          />{" "}
          <LanguageToggle />
        </div>
      </div>
      {/* Mobile menu button and dropdown */}
      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
        className="
          text-white/30
          sm:hidden
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
          sm:hidden
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
              border border-t-0  border-white/30 rounded-b-3xl
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
                    font-heading
                    ${isActive ? "text-white font-medium drop-shadow-text-glow" : "text-gray-300"}
                  `}
                >
                  {label}
                </NavLink>
                {index < NAV_LINKS.length - 1 && (
                  <div
                    className="
                      w-50 h-px
                      bg-white/30
                    "
                  />
                )}
              </React.Fragment>
            ))}
            <div className="flex gap-3 align-middle">
              <LottieButton
                text={"CV"}
                animation={downloadAnimation}
                speed={2}
                onComplete={downloadCv}
                className="mb-3 sm:mb-0"
              />{" "}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
