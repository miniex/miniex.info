import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "@/locales/en/translation.json";
import koTranslations from "@/locales/ko/translation.json";
import jaTranslations from "@/locales/ja/translation.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            ko: { translation: koTranslations },
            ja: { translation: jaTranslations },
        },
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
