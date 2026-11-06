"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  youtubeId: string;
  poster: SiteImage;
  posterPosition?: string;
  title: string;
  /** Text block shown over the poster bottom-left. */
  caption?: React.ReactNode;
  className?: string;
  /** Accessible label for the play control. */
  label?: string;
  priority?: boolean;
};

/** Click-to-load YouTube embed: no third-party script until the visitor presses play. */
export function VideoCard({
  youtubeId,
  poster,
  posterPosition = "50% 25%",
  title,
  caption,
  className,
  label,
  priority,
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative block w-full overflow-hidden rounded-[22px] border border-gold/50 bg-night aspect-video",
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label ?? `Play: ${title}`}
          className="group absolute inset-0 w-full h-full text-left text-on-night"
        >
          <Image
            src={poster.src}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover saturate-[1.05] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
            style={{ objectPosition: posterPosition }}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,0)_40%,rgba(14,26,60,.85))]"
          />
          <span
            aria-hidden
            className="animate-halo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full bg-saffron text-ink flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          >
            <Play size={34} fill="currentColor" strokeWidth={0} className="ml-1" />
          </span>
          {caption ? (
            <span className="absolute left-5 right-5 bottom-4 md:left-6 md:right-6 md:bottom-5 flex flex-col gap-1">
              {caption}
            </span>
          ) : null}
        </button>
      )}
    </div>
  );
}
