import type { Post } from "@/content/posts";

export type Category = Post["category"];

/** Reader-facing labels for the Post categories (the design's chips). */
export const categoryLabels: Record<Category, string> = {
  Guide: "Tiruvannamalai guides",
  Mounasamy: "Mounasamy Siddhar",
  Festivals: "Festivals",
  "Ashram life": "Ashram life",
  Teachings: "Teachings",
};

/** "5 Nov 2026" (short) or "5 November 2026". */
export function formatDate(iso: string, short = false) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: short ? "short" : "long",
    year: "numeric",
  });
}
