"use client";

/**
 * One shared chant player for the whole site (and the launch page).
 * A module-level singleton, so the music keeps playing across page changes.
 * The audio file is only downloaded once the visitor turns the music on.
 */

const SRC = "/audio/om-namah-shivaya-chant.mp3";
const STORAGE_KEY = "chant";
/** Soft background level (the file itself is already mastered quietly). */
const TARGET_VOLUME = 0.45;

type Listener = () => void;
const listeners = new Set<Listener>();
let audio: HTMLAudioElement | null = null;
let playing = false;
let fadeTimer: number | undefined;
let resumeArmed = false;

function emit() {
  listeners.forEach((l) => l());
}

function getAudio() {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.addEventListener("pause", () => {
      if (playing && audio && !audio.ended) {
        playing = false;
        emit();
      }
    });
  }
  return audio;
}

function fadeTo(target: number, ms: number, done?: () => void) {
  const a = getAudio();
  window.clearInterval(fadeTimer);
  const steps = Math.max(1, Math.round(ms / 50));
  const start = a.volume;
  let i = 0;
  fadeTimer = window.setInterval(() => {
    i += 1;
    a.volume = Math.min(1, Math.max(0, start + ((target - start) * i) / steps));
    if (i >= steps) {
      window.clearInterval(fadeTimer);
      done?.();
    }
  }, 50);
}

function remember(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* ignore */
  }
}

export async function playChant() {
  const a = getAudio();
  try {
    await a.play();
    playing = true;
    remember(true);
    emit();
    fadeTo(TARGET_VOLUME, 1500);
  } catch {
    // Autoplay blocked until the visitor interacts — start on their next tap/key.
    armResume();
  }
}

export function pauseChant() {
  if (!audio) return;
  playing = false;
  remember(false);
  emit();
  fadeTo(0, 600, () => audio?.pause());
}

export function toggleChant() {
  if (playing) pauseChant();
  else void playChant();
}

function armResume() {
  if (resumeArmed) return;
  resumeArmed = true;
  const start = () => {
    resumeArmed = false;
    window.removeEventListener("pointerdown", start);
    window.removeEventListener("keydown", start);
    void playChant();
  };
  window.addEventListener("pointerdown", start, { once: true });
  window.addEventListener("keydown", start, { once: true });
}

/** If the visitor left the chant on last time, resume it on their first interaction. */
export function resumeIfRemembered() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "on" && !playing) armResume();
  } catch {
    /* ignore */
  }
}

export function subscribeChant(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isChantPlaying() {
  return playing;
}
