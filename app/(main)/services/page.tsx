import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the sacred services at Amma Ashram — Thiyanam (meditation), Yogam (prayer), Annadhanam (free meals), Satsang, and more.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
