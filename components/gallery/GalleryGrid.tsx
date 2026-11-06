"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { useMotionPreference } from "@/components/motion/MotionProvider";
import { galleryFilter, type Album } from "./galleryFilter";

export type GalleryTile = {
  id: string;
  albums: Album[];
  /** Flex basis / aspect as in the design rows. */
  size: "wideTall" | "tall" | "wideMid" | "mid" | "short" | "album";
  caption: string;
  image?: SiteImage;
  position?: string;
  /** "[PHOTO · …]" tiles the office still has to supply. */
  placeholder?: string;
};

type Props = {
  tiles: GalleryTile[];
  mounasamyTiles: GalleryTile[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const sizeClass: Record<GalleryTile["size"], { flex: string; ratio: string }> = {
  wideTall: { flex: "flex-[2_1_520px]", ratio: "40/21" },
  tall: { flex: "flex-[1_1_300px]", ratio: "19/21" },
  wideMid: { flex: "flex-[2_1_520px]", ratio: "5/2" },
  mid: { flex: "flex-[1_1_300px]", ratio: "19/16" },
  short: { flex: "flex-[1_1_260px]", ratio: "10/9" },
  album: { flex: "flex-[1_1_260px]", ratio: "3/4" },
};

function Tile({
  tile,
  onOpen,
}: {
  tile: GalleryTile;
  onOpen?: () => void;
}) {
  const s = sizeClass[tile.size];
  if (tile.placeholder || !tile.image) {
    return (
      <figure
        className={cn(
          s.flex,
          "m-0 rounded-[20px] border border-dashed border-gold bg-white flex flex-col items-center justify-center text-center gap-3 p-5 min-h-[220px]",
        )}
        style={{ aspectRatio: s.ratio }}
      >
        <Camera size={26} className="text-gold-text" aria-hidden />
        <Placeholder label={tile.placeholder ?? tile.caption} />
      </figure>
    );
  }
  return (
    <div className={cn(s.flex, "relative group min-w-0")}>
      <PhotoFigure
        image={tile.image}
        ratio={s.ratio}
        position={tile.position}
        rounded="card"
        caption={tile.caption}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
        imgClassName="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
      />
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open photo: ${tile.caption}`}
          className="absolute inset-x-0 top-0 rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron cursor-zoom-in"
          style={{ aspectRatio: s.ratio }}
        >
          <span
            aria-hidden
            className="absolute right-3 top-3 w-9 h-9 rounded-full bg-night/70 text-on-night inline-flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
          >
            <Maximize2 size={16} />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** Album-filtered photo grid with an accessible lightbox. */
export function GalleryGrid({ tiles, mounasamyTiles }: Props) {
  const filter = galleryFilter.useValue();
  const { enabled } = useMotionPreference();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const album = filter === "all" || filter === "videos" ? null : filter;
  const visible =
    album === "mounasamy"
      ? []
      : tiles.filter((t) => !album || t.albums.includes(album));
  const showMounasamy = album === null || album === "mounasamy";

  /** Everything with a real photo, in page order, for next / previous. */
  const photos = [...visible, ...(showMounasamy ? mounasamyTiles : [])].filter((t) => t.image);

  const isOpen = current !== null;
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* The native dialog closes itself on Escape — keep React state in sync. */
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onNativeClose = () => setCurrent(null);
    d.addEventListener("close", onNativeClose);
    return () => d.removeEventListener("close", onNativeClose);
  }, []);

  const open = (id: string) => {
    const idx = photos.findIndex((t) => t.id === id);
    if (idx < 0) return;
    setCurrent(idx);
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  };

  const close = () => {
    const d = dialogRef.current;
    if (d?.open) d.close();
    setCurrent(null);
  };

  const count = photos.length;
  const step = (delta: number) => {
    setCurrent((c) => (c === null ? c : (c + delta + count) % count));
  };

  const onKey = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const active = current !== null ? photos[current] : null;

  const renderTile = (t: GalleryTile) => (
    <Tile key={t.id} tile={t} onOpen={t.image ? () => open(t.id) : undefined} />
  );

  return (
    <>
      <div className="flex flex-wrap gap-4" aria-live="polite">
        {visible.length === 0 && !showMounasamy ? (
          <p className="card px-5 py-6 text-ink-2 w-full text-center">
            No photos in this album yet.
          </p>
        ) : null}
        {enabled ? (
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn(sizeClass[t.size].flex, "flex min-w-0")}
              >
                <div className="w-full">{renderTile({ ...t })}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          visible.map(renderTile)
        )}
      </div>

      {showMounasamy ? (
        <>
          <h2
            id="mounasamy"
            className="font-display text-[26px] md:text-[30px] mt-6 scroll-mt-24"
          >
            Mounasamy Siddhar ·{" "}
            <span lang="ta" className="ta text-[20px] md:text-[24px] text-saffron-text">
              மௌன சித்தர்
            </span>
          </h2>
          <div className="flex flex-wrap gap-4">{mounasamyTiles.map(renderTile)}</div>
        </>
      ) : null}

      <div className="flex flex-col items-center gap-2 mt-3">
        <Button variant="outline-saffron" size="lg" disabled aria-disabled>
          Load more photos
        </Button>
        <span className="text-[13px] text-ink-2">
          <Placeholder label="more photos from the ashram office" />
        </span>
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onKeyDown={onKey}
        aria-label={active ? active.caption : "Photo"}
        className="m-auto max-w-[min(96vw,1200px)] w-full bg-transparent p-0 backdrop:bg-night/90 backdrop:backdrop-blur-sm open:flex open:flex-col open:items-center text-on-night"
      >
        {active ? (
          <div className="relative w-full flex flex-col items-center gap-3 p-3 md:p-6">
            <div className="relative w-full h-[70vh] md:h-[78vh]">
              {enabled ? (
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={active.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Image
                      src={active.image!.src}
                      alt={active.image!.alt}
                      fill
                      sizes="96vw"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <Image
                  src={active.image!.src}
                  alt={active.image!.alt}
                  fill
                  sizes="96vw"
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-sm md:text-[15px] text-on-night-body text-center flex flex-wrap items-center justify-center gap-2.5">
              <span
                className={cn(
                  "text-[11px] tracking-[.14em] uppercase font-bold px-2 py-1 rounded-md",
                  active.image!.kind === "photo"
                    ? "bg-saffron text-ink"
                    : "bg-white/90 text-ink-2",
                )}
              >
                {active.image!.kind === "photo" ? "Photo" : "Illustration"}
              </span>
              {active.caption}
              <span className="text-on-night-2">
                {current! + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 md:right-6 md:top-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-on-night inline-flex items-center justify-center transition-colors"
            >
              <X size={20} aria-hidden />
            </button>
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-on-night inline-flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={22} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-on-night inline-flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={22} aria-hidden />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
