import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Teachings & Blog",
  description:
    "Amma's teachings, devotee stories, ashram life updates, and sacred wisdom from Thiruvannamalai.",
};

export default function BlogPage() {
  return <BlogContent />;
}
