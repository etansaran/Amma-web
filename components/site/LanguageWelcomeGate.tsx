"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// The pop-up (and its animation code) downloads only for first-time visitors.
const LanguageWelcomeModal = dynamic(
  () => import("./LanguageWelcomeModal").then((m) => m.LanguageWelcomeModal),
  { ssr: false },
);

const CHOSEN_KEY = "lang-chosen";
const subscribe = () => () => {};

function hasChosen() {
  try {
    return (
      localStorage.getItem(CHOSEN_KEY) === "1" || sessionStorage.getItem(CHOSEN_KEY) === "1"
    );
  } catch {
    return true;
  }
}

export function LanguageWelcomeGate() {
  // Server render and first paint assume "chosen", so nothing is shown or loaded early.
  const chosen = useSyncExternalStore(subscribe, hasChosen, () => true);
  return chosen ? null : <LanguageWelcomeModal />;
}
