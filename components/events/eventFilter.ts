"use client";

import { createSharedFilter } from "@/components/ui/SharedFilter";
import type { EventType } from "@/content/events";

export type EventFilter = EventType | "all";

export const eventFilter = createSharedFilter<EventFilter>("all");

export const eventFilterOptions: { value: EventFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pournami", label: "Pournami" },
  { value: "festival", label: "Festivals" },
  { value: "satsang", label: "Satsang & classes" },
  { value: "annadhanam", label: "Annadhanam seva" },
];
