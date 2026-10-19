import { useTranslation } from "react-i18next";
import { useState } from "react";
import TranslateIcon from "./translate-icon";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
] as const;

const LanguageToggle: React.FC = () => {
  const [openTranslate, setOpenTranslate] = useState(false);
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div className="flex  items-center text-sm mb-3 sm:mb-0">
      {openTranslate &&
        LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => {
              i18n.changeLanguage(code);
              setOpenTranslate(false);
            }}
            aria-pressed={current === code}
            className={`px-2 py-1 rounded-full transition-colors ${
              current === code
                ? "text-white font-medium font-heading"
                : "text-gray-500 hover:text-gray-200 dark:hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      <TranslateIcon
        className={`w-5 h-5 cursor-pointer ${openTranslate ? "drop-shadow-text-glow" : ""}`}
        onClick={() => setOpenTranslate(!openTranslate)}
      />
    </div>
  );
};

export default LanguageToggle;
