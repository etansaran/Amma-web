"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  /** Platform iframe URL — loaded only after the visitor presses play. */
  embedSrc: string;
  /** The original post, for "open on …". */
  href: string;
  platform: string;
  icon: ReactNode;
  title: string;
  meta: string;
  poster: SiteImage;
  className?: string;
};

/**
 * Click-to-load social video (Instagram / Facebook reels). No third-party
 * script, cookie or request happens until the visitor asks for the video.
 */
export function SocialEmbed({ embedSrc, href, platform, icon, title, meta, poster, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <figure className={cn("flex flex-col gap-3 w-full max-w-[360px] mx-auto", className)}>
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-[22px] border border-gold/50 bg-night">
        {open ? (
          <iframe
            className="absolute inset-0 w-full h-full bg-white"
            src={embedSrc}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play here: ${title} (loads ${platform})`}
            className="group absolute inset-0 w-full h-full text-left text-on-night"
          >
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="360px"
              className="object-cover opacity-45 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
            />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,.55),rgba(14,26,60,.2)_40%,rgba(14,26,60,.92))]" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill bg-night/80 border border-night-line-2 px-3 py-1.5 text-[13px] font-semibold">
              {icon} {platform}
            </span>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full bg-saffron text-ink flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            >
              <Play size={32} fill="currentColor" strokeWidth={0} className="ml-1" />
            </span>
            <span className="absolute left-5 right-5 bottom-5 flex flex-col gap-1">
              <span className="font-display text-[19px] leading-snug text-on-night-head">{title}</span>
              <span className="text-[13px] text-on-night-2">{meta}</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-3 text-[13px] text-ink-2">
        <span>Loads from {platform} when you press play.</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 min-h-11 font-semibold text-saffron-text underline-offset-2 hover:underline shrink-0"
        >
          Open <ExternalLink size={14} aria-hidden />
        </a>
      </figcaption>
    </figure>
  );
}
