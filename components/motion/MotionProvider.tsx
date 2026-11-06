"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

type MotionContextValue = {
  /** True when the visitor has not turned motion off and the OS does not ask for reduced motion. */
  enabled: boolean;
  /** The visitor's own header toggle (independent of the OS preference). */
  userEnabled: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  enabled: true,
  userEnabled: true,
  toggle: () => {},
});

const STORAGE_KEY = "motion";

/* --- user preference store (localStorage) --- */
const listeners = new Set<() => void>();
function readUserEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}
function subscribeUser(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function writeUserEnabled(next: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb());
}

/* --- OS preference store (matchMedia) --- */
const QUERY = "(prefers-reduced-motion: reduce)";
function subscribeOs(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function readOsReduced() {
  return window.matchMedia(QUERY).matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const userEnabled = useSyncExternalStore(subscribeUser, readUserEnabled, () => true);
  const osReduced = useSyncExternalStore(subscribeOs, readOsReduced, () => false);

  useEffect(() => {
    document.documentElement.classList.toggle("no-motion", !userEnabled);
  }, [userEnabled]);

  const toggle = useCallback(() => writeUserEnabled(!readUserEnabled()), []);

  const value = useMemo(
    () => ({ enabled: userEnabled && !osReduced, userEnabled, toggle }),
    [userEnabled, osReduced, toggle],
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion={value.enabled ? "never" : "always"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}
