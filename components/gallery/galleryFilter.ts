"use client";

import { createSharedFilter } from "@/components/ui/SharedFilter";

export type Album =
  | "maataji"
  | "annadhanam"
  | "deepam"
  | "mounasamy"
  | "satsang";

export type GalleryFilterValue = Album | "all" | "videos";

export const galleryFilter = createSharedFilter<GalleryFilterValue>("all");

export const galleryFilterOptions: {
  value: GalleryFilterValue;
  label: string;
  /** Section the chip scrolls to. */
  target: string;
}[] = [
  { value: "all", label: "All", target: "photos" },
  { value: "maataji", label: "Maataji", target: "photos" },
  { value: "annadhanam", label: "Annadhanam", target: "photos" },
  { value: "deepam", label: "Deepam & Pournami", target: "photos" },
  { value: "mounasamy", label: "Mounasamy Siddhar", target: "mounasamy" },
  { value: "satsang", label: "Satsang & classes", target: "photos" },
  { value: "videos", label: "Videos", target: "videos" },
];
