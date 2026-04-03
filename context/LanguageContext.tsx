"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  showPopup: boolean;
  closePopup: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("amma-lang") as Language | null;
    if (saved === "ta" || saved === "en") {
      setLangState(saved);
      setShowPopup(false);
    } else {
      // First visit — show popup after tiny delay so page renders first
      const timer = setTimeout(() => setShowPopup(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("amma-lang", newLang);
    setShowPopup(false);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang], showPopup, closePopup }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
