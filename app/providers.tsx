"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "@/i18n";

export default function Providers({ children }: PropsWithChildren) {
  const [i18n] = useState(createI18n);

  useEffect(() => {
    let languages = [...navigator.languages];
    try {
      const saved = localStorage.getItem("i18nextLng");
      if (saved) languages = [saved, ...languages];
    } catch { /* Language selection also works when storage is unavailable. */ }
    const language = languages.map((value) => value.toLowerCase().split("-")[0])
      .find((value) => value === "en" || value === "it") ?? "en";
    const syncLanguage = (value: string) => {
      document.documentElement.lang = value;
      try { localStorage.setItem("i18nextLng", value); } catch { /* Optional persistence. */ }
    };
    i18n.on("languageChanged", syncLanguage);
    void i18n.changeLanguage(language);
    return () => { i18n.off("languageChanged", syncLanguage); };
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
