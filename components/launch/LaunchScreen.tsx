"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, KeyRound, Rocket, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { playChant } from "@/lib/chant";
import { cn } from "@/lib/cn";

/*
 * Website launch ceremony screen (/<locale>/launch).
 *
 * Countdown target, in order of preference:
 *   ?at=2026-11-24T18:00:00+05:30   a fixed launch moment
 *   ?minutes=5                       N minutes from first opening (rehearsals)
 *   default                          60 minutes from first opening on this device
 * The target is remembered on the device, so a refresh does not restart it.
 * ?reset=1 clears the remembered target and launched state.
 *
 * The password is a ceremony formality, not security: it is checked in the browser.
 */
const LAUNCH_PASSWORD = "2026";
const DEFAULT_MINUTES = 60;
const TARGET_KEY = "launch-target";
const DONE_KEY = "launch-done";

/* ---------- target time (read once on the client) ---------- */
let cachedTarget: number | null = null;
function readTarget(): number {
  if (cachedTarget !== null) return cachedTarget;
  const params = new URLSearchParams(window.location.search);
  try {
    if (params.get("reset") === "1") {
      localStorage.removeItem(TARGET_KEY);
      localStorage.removeItem(DONE_KEY);
    }
  } catch {
    /* ignore */
  }
  const at = params.get("at");
  if (at && !Number.isNaN(Date.parse(at))) {
    cachedTarget = Date.parse(at);
    return cachedTarget;
  }
  const minutes = Number(params.get("minutes"));
  const span = (Number.isFinite(minutes) && minutes > 0 ? minutes : DEFAULT_MINUTES) * 60_000;
  let stored: number | null = null;
  try {
    const raw = localStorage.getItem(TARGET_KEY);
    stored = raw ? Number(raw) : null;
  } catch {
    /* ignore */
  }
  if (stored && params.get("minutes") === null) {
    cachedTarget = stored;
  } else {
    cachedTarget = Date.now() + span;
    try {
      localStorage.setItem(TARGET_KEY, String(cachedTarget));
    } catch {
      /* ignore */
    }
  }
  return cachedTarget;
}

/* ---------- a ticking clock (one update per second) ---------- */
function subscribeClock(cb: () => void) {
  const id = window.setInterval(cb, 250);
  return () => window.clearInterval(id);
}
const nowSecond = () => Math.floor(Date.now() / 1000);

/* ---------- launched flag ---------- */
const doneListeners = new Set<() => void>();
function readDone() {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}
function setDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {
    /* ignore */
  }
  doneListeners.forEach((l) => l());
}
function subscribeDone(cb: () => void) {
  doneListeners.add(cb);
  return () => {
    doneListeners.delete(cb);
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// Fixed petal layout (no randomness at render time, so server and client match).
const PETALS = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: ((i * 53) % 40) / 10,
  duration: 6 + ((i * 29) % 50) / 10,
  size: 10 + ((i * 17) % 12),
  hue: i % 3,
}));

export function LaunchScreen() {
  const target = useSyncExternalStore(
    () => () => {},
    readTarget,
    () => null,
  );
  const second = useSyncExternalStore(subscribeClock, nowSecond, () => null);
  const launched = useSyncExternalStore(subscribeDone, readDone, () => false);

  const [askPassword, setAskPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const ready = target !== null && second !== null;
  const remaining = ready ? Math.max(0, Math.ceil(target / 1000) - second) : null;
  const timeUp = remaining === 0;
  const h = remaining !== null ? Math.floor(remaining / 3600) : null;
  const m = remaining !== null ? Math.floor((remaining % 3600) / 60) : null;
  const s = remaining !== null ? remaining % 60 : null;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (value === LAUNCH_PASSWORD) {
      setAskPassword(false);
      setError(false);
      setDone();
      void playChant();
    } else {
      setError(true);
      setShake((n) => n + 1);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-night text-on-night flex flex-col">
      <Image
        src={images.arunachalaNight.src}
        alt=""
        aria-hidden
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover opacity-60 animate-drift"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,26,60,.55)_0%,rgba(14,26,60,.88)_60%,rgba(14,26,60,.97)_100%)]"
      />

      {/* Rising embers */}
      <div aria-hidden className="launch-embers absolute inset-0 pointer-events-none">
        {PETALS.slice(0, 18).map((p, i) => (
          <span
            key={i}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration + 4}s`,
            }}
          />
        ))}
      </div>

      {launched ? (
        <div aria-hidden className="launch-petals absolute inset-0 pointer-events-none z-20">
          {PETALS.map((p, i) => (
            <span
              key={i}
              className={cn(p.hue === 0 && "is-saffron", p.hue === 1 && "is-gold", p.hue === 2 && "is-rose")}
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 1.3,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-6 md:gap-8 px-5 py-12">
        <div className="relative animate-halo rounded-full bg-ivory/95 p-3 md:p-4">
          <Image
            src={images.logo.src}
            alt={images.logo.alt}
            width={140}
            height={140}
            loading="eager"
            fetchPriority="high"
            className="w-24 h-24 md:w-[140px] md:h-[140px] object-contain"
          />
        </div>

        <div className="flex flex-col gap-2 max-w-[760px]">
          <p className="eyebrow text-gold-light! text-[12px] md:text-[13px]">
            {launched ? "Om Namah Shivaya" : "Website launch"}
          </p>
          <h1 className="font-display text-[32px] sm:text-[44px] md:text-[56px] leading-[1.08] text-on-night-head">
            {site.name}
          </h1>
          <p lang="ta" className="ta text-[17px] md:text-[22px] text-gold-light">
            {site.nameTamil} · திருவண்ணாமலை
          </p>
        </div>

        {launched ? (
          <div className="flex flex-col items-center gap-5 launch-reveal">
            <p className="font-display text-[26px] md:text-[38px] text-on-night-head leading-tight">
              thiyaneswaramma.org is live
            </p>
            <p lang="ta" className="ta text-[20px] md:text-[26px] text-saffron">
              ஓம் நமசிவாய · அன்பே சிவம்
            </p>
            <p className="text-on-night-body max-w-[520px]">
              With Maataji's blessings, the ashram's new home on the web is open to devotees
              everywhere.
            </p>
            <Link href="/" className="btn btn-saffron btn-lg mt-2">
              Enter the website <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <div
              className="flex items-start justify-center gap-3 md:gap-5"
              role="timer"
              aria-live="off"
              aria-label={
                remaining !== null
                  ? `Launch in ${h} hours ${m} minutes ${s} seconds`
                  : "Launch countdown"
              }
            >
              {[
                { v: h, label: "Hours" },
                { v: m, label: "Minutes" },
                { v: s, label: "Seconds" },
              ].map((u, i) => (
                <div key={u.label} className="flex items-start gap-3 md:gap-5">
                  {i > 0 ? (
                    <span className="font-display text-[40px] md:text-[64px] leading-none text-gold/70 pt-3 md:pt-5" aria-hidden>
                      :
                    </span>
                  ) : null}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-[84px] h-[92px] md:w-[132px] md:h-[140px] rounded-[20px] md:rounded-[26px] bg-night-2/80 border border-gold/40 shadow-night flex items-center justify-center font-display text-[48px] md:text-[80px] leading-none text-gold-light tabular-nums">
                      {u.v === null ? "--" : pad(u.v)}
                    </span>
                    <span className="text-[11px] md:text-[13px] tracking-[.18em] uppercase text-on-night-2 font-semibold">
                      {u.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {timeUp ? (
              <div className="flex flex-col items-center gap-3 launch-reveal">
                <p className="text-on-night-body">The moment has come.</p>
                <button
                  type="button"
                  onClick={() => {
                    setAskPassword(true);
                    setError(false);
                  }}
                  className="btn btn-saffron btn-lg animate-halo relative h-16! px-10! text-[18px]!"
                >
                  <Rocket size={22} aria-hidden /> Launch the website
                </button>
              </div>
            ) : (
              <p className="text-sm md:text-base text-on-night-2 max-w-[460px]">
                The launch button appears here when the countdown ends.
              </p>
            )}
          </>
        )}
      </div>

      <p className="relative z-10 pb-20 md:pb-6 px-20 md:px-5 text-center text-[13px] text-on-night-2">
        <span lang="ta" className="ta">{site.motto}</span> · Adi Annamalai, Tiruvannamalai
      </p>

      {askPassword ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm">
          <form
            key={shake}
            role="dialog"
            aria-modal="true"
            aria-labelledby="launch-pass-title"
            onSubmit={submit}
            className={cn(
              "relative w-full max-w-[420px] bg-ivory text-ink rounded-[24px] p-6 md:p-8 shadow-modal flex flex-col gap-4 launch-reveal",
              error && "launch-shake",
            )}
          >
            <button
              type="button"
              onClick={() => setAskPassword(false)}
              aria-label="Close"
              className="absolute right-3 top-3 w-11 h-11 rounded-full inline-flex items-center justify-center text-ink-2 hover:bg-sand"
            >
              <X size={20} aria-hidden />
            </button>
            <span className="icon-circle w-12! h-12!" aria-hidden>
              <KeyRound size={22} />
            </span>
            <h2 id="launch-pass-title" className="font-display text-[26px] leading-tight">
              Enter the launch password
            </h2>
            <label htmlFor="launch-pass" className="sr-only">
              Launch password
            </label>
            <input
              ref={inputRef}
              id="launch-pass"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              required
              aria-invalid={error || undefined}
              aria-describedby={error ? "launch-pass-error" : undefined}
              className="input text-center text-[24px] tracking-[.5em] h-14!"
            />
            {error ? (
              <p id="launch-pass-error" role="alert" className="text-sm font-semibold text-[#b42318] text-center">
                That is not the launch password. Please try again.
              </p>
            ) : null}
            <button type="submit" className="btn btn-saffron btn-lg w-full">
              <Rocket size={20} aria-hidden /> Launch
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
