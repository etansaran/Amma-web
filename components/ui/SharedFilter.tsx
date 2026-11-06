"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny client-side store so a chip row in the hero and a list further down the page
 * can share one selected filter without lifting state through server components.
 */
export function createSharedFilter<T extends string>(initial: T) {
  let value: T = initial;
  const listeners = new Set<() => void>();

  const subscribe = (cb: () => void) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  };
  const get = () => value;
  const set = (next: T) => {
    if (next === value) return;
    value = next;
    listeners.forEach((cb) => cb());
  };
  const useValue = () => useSyncExternalStore(subscribe, get, () => initial);

  return { useValue, set, get };
}

/** Scroll an in-page target into view, honouring reduced motion. */
export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce =
    document.documentElement.classList.contains("no-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
