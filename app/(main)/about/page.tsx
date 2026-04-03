import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Amma",
  description:
    "Learn about Siva Sri Thiyaneswar Amma — her life, mission, and divine teachings at the foot of Arunachala in Thiruvannamalai.",
};

export default function AboutPage() {
  return <AboutContent />;
}
