import { notFound } from "next/navigation";

/** Any unknown path under a locale renders the localised 404 inside the site chrome. */
export default function CatchAll() {
  notFound();
}
