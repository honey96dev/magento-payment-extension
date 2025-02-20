import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import en from "./i18n/en";
import ar from "./i18n/ar";
import {setHeader} from "../apis/fetch";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar"];

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,

    resources: {
      en: {
        translation: en
      },
      ar: {
        translation: ar
      },
    },

    interpolation: {
      escapeValue: false
    },
  });

// i18n.changeLanguage("ar");
export const changeLanguage = lang => {
  // const newLang = lang === "en" ? "ar" : "en";
  const newLang = lang;
  i18n.changeLanguage(newLang);
  setHeader({lang: newLang});
};

export default i18n;