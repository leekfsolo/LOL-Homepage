import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationVN from "./locales/vn.json";
import translationEN from "./locales/en.json";
import translationKR from "./locales/kr.json";
import { ScopeKey, ScopeValue } from "./enum";

const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
  kr: {
    translation: translationKR,
  },
};

let lang = localStorage.getItem(ScopeKey.LANG);
if (!lang) lang = ScopeValue.ENG;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
