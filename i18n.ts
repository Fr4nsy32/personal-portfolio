import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/locales";

export const defaultNS = "common";

// Each provider owns an instance; server rendering and initial hydration use English.
export function createI18n() {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    resources,
    defaultNS,
    ns: Object.keys(resources.en),
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "it"],
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}
