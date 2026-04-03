import type { Metadata } from "next";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Sacred Events",
  description:
    "Upcoming festivals, poojas, meditation retreats and special events at Siva Sri Thiyaneswar Amma Ashram, Thiruvannamalai.",
};

export default function EventsPage() {
  return <EventsContent />;
}
