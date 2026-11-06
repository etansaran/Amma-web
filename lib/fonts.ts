import {
  Marcellus,
  Catamaran,
  Noto_Serif_Tamil,
  Hind,
  Noto_Sans_Telugu,
} from "next/font/google";

export const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus",
});

export const catamaran = Catamaran({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "tamil"],
  display: "swap",
  variable: "--font-catamaran",
});

export const notoSerifTamil = Noto_Serif_Tamil({
  weight: ["500", "700"],
  subsets: ["tamil"],
  display: "swap",
  // Loaded on demand when this script appears, not preloaded on every page.
  preload: false,
  variable: "--font-noto-serif-tamil",
});

export const hind = Hind({
  weight: ["400", "600"],
  subsets: ["latin", "devanagari"],
  display: "swap",
  // Loaded on demand when this script appears, not preloaded on every page.
  preload: false,
  variable: "--font-hind",
});

export const notoSansTelugu = Noto_Sans_Telugu({
  weight: ["400", "600"],
  subsets: ["telugu"],
  display: "swap",
  // Loaded on demand when this script appears, not preloaded on every page.
  preload: false,
  variable: "--font-noto-sans-telugu",
});

export const fontVariables = [
  marcellus.variable,
  catamaran.variable,
  notoSerifTamil.variable,
  hind.variable,
  notoSansTelugu.variable,
].join(" ");
