import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Play } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { videoSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { VideoCard } from "@/components/ui/VideoCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid, type GalleryTile } from "@/components/gallery/GalleryGrid";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/gallery",
    title: "Gallery — Photos & Videos of Maataji and the Ashram",
    description:
      "Photographs of Maataji, Mounasamy Siddhar, annadhanam on the Girivalam road, Deepam and Pournami nights at Siva Sri Thiyaneswar Amma Ashram, Tiruvannamalai — and videos.",
    image: images.maatajiThrone,
  });
}

const tiles: GalleryTile[] = [
  {
    id: "throne",
    albums: ["maataji"],
    size: "wideTall",
    image: images.maatajiThrone,
    position: "50% 20%",
    caption: "Maataji during Guru pooja at the ashram",
  },
  {
    id: "portrait",
    albums: ["maataji"],
    size: "tall",
    image: images.maatajiPortrait,
    position: "50% 20%",
    caption: "Maataji at the ashram office",
  },
  {
    id: "flowers",
    albums: ["maataji", "deepam"],
    size: "tall",
    image: images.maatajiFlowers,
    position: "50% 20%",
    caption: "Pushpanjali during Pournami pooja",
  },
  {
    id: "seva",
    albums: ["annadhanam", "maataji"],
    size: "mid",
    image: images.maatajiSeva,
    caption: "Vastram and annadhanam for sadhus, Girivalam road",
  },
  {
    id: "seated",
    albums: ["maataji", "deepam"],
    size: "mid",
    image: images.maatajiSeated,
    position: "50% 15%",
    caption: "Maataji, Guru Pournami",
  },
  {
    id: "deepam-night",
    albums: ["deepam"],
    size: "wideMid",
    image: images.arunachalaNight,
    caption: "Deepam night over Tiruvannamalai",
  },
  {
    id: "girivalam",
    albums: ["deepam"],
    size: "wideMid",
    image: images.girivalamWalk,
    caption: "Pournami Girivalam",
  },
  {
    id: "kitchen",
    albums: ["annadhanam"],
    size: "mid",
    caption: "Annadhanam kitchen at dawn",
    placeholder: "Photo · Annadhanam kitchen at dawn",
  },
  {
    id: "vathiyam",
    albums: ["satsang"],
    size: "mid",
    caption: "Kailaya Vathiyam children's class",
    placeholder: "Photo · Kailaya Vathiyam children's class",
  },
  {
    id: "maheswara",
    albums: ["annadhanam"],
    size: "short",
    caption: "Maheswara Poojai for sadhus",
    placeholder: "Photo · Maheswara Poojai for sadhus",
  },
  {
    id: "deepam-line",
    albums: ["deepam", "annadhanam"],
    size: "short",
    caption: "Deepam annadhanam line",
    placeholder: "Photo · Deepam annadhanam line",
  },
  {
    id: "path-cleaning",
    albums: ["annadhanam"],
    size: "short",
    caption: "Girivalam path cleaning seva",
    placeholder: "Photo · Girivalam path cleaning seva",
  },
  {
    id: "satsang-evening",
    albums: ["satsang"],
    size: "short",
    caption: "Satsang evening",
    placeholder: "Photo · Satsang evening",
  },
];

const mounasamyTiles: GalleryTile[] = [
  {
    id: "m-flame",
    albums: ["mounasamy"],
    size: "album",
    image: images.mounasamyFlame,
    position: "50% 20%",
    caption: "Deepa aradhana",
  },
  {
    id: "m-garland",
    albums: ["mounasamy"],
    size: "album",
    image: images.mounasamyGarland,
    position: "50% 15%",
    caption: "Maheswara Poojai",
  },
  {
    id: "m-flowers",
    albums: ["mounasamy"],
    size: "album",
    image: images.mounasamyFlowers,
    position: "50% 35%",
    caption: "In silence, Guru Pournami",
  },
  {
    id: "m-altar",
    albums: ["mounasamy"],
    size: "album",
    image: images.mounasamyAltar,
    caption: "Before his altar, day and night",
  },
  {
    id: "m-guru",
    albums: ["mounasamy", "maataji"],
    size: "album",
    image: images.maatajiStudio,
    position: "62% 30%",
    caption: "Maataji — his guru",
  },
];

const otherVideos = [
  {
    title: "Karthigai Deepam annadhanam —",
    titlePlaceholder: "YEAR",
    titleSuffix: "film",
    note: "event film",
    poster: images.arunachalaNight,
    position: "50% 50%",
  },
  {
    title: "Sivayogam — a session with the ashram",
    note: "from the ashram channel",
    poster: images.girivalamWalk,
    position: "50% 50%",
  },
];

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={videoSchema()} />

      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="Gallery"
        title="Maataji, the ashram, and the road around the hill."
        lede={
          <>
            Real photographs are marked <strong>Photo</strong>. Artwork made to evoke Arunachala
            and Tiruvannamalai is marked <strong>Illustration</strong>, so no one mistakes one
            for the other.
          </>
        }
        extra={<GalleryFilters />}
      />

      {/* Photo grid */}
      <section id="photos" className="container-site py-12 md:py-[72px] flex flex-col gap-4 scroll-mt-20">
        <Reveal>
          <GalleryGrid tiles={tiles} mounasamyTiles={mounasamyTiles} />
        </Reveal>
      </section>

      {/* Videos */}
      <section id="videos" className="bg-night text-on-night scroll-mt-20">
        <div className="container-site section-pad-lg flex flex-col gap-8 md:gap-9">
          <Reveal>
            <SectionHeading
              onNight
              eyebrow="Videos"
              title="Watch the ashram in motion."
              action={
                <ArrowLink href={site.song.youtubeUrl} tone="gold">
                  YouTube channel
                </ArrowLink>
              }
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <RevealItem>
              <VideoCard
                youtubeId={site.song.youtubeId}
                poster={images.maatajiPortrait}
                title="Thiyaneshwara song — Jothi TV"
                label="Watch Thiyaneshwara song"
                className="rounded-card!"
                caption={
                  <>
                    <span lang="ta" className="ta text-[19px] font-bold">
                      {site.song.title}
                    </span>
                    <span className="text-[13px] text-on-night-2">
                      {site.song.channel} · {site.song.views} views
                    </span>
                  </>
                }
              />
            </RevealItem>
            {otherVideos.map((v) => (
              <RevealItem key={v.title}>
                <figure className="relative m-0 w-full overflow-hidden rounded-card border border-gold/50 bg-night aspect-video">
                  <Image
                    src={v.poster.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    style={{ objectPosition: v.position }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,26,60,0)_40%,rgba(14,26,60,.85))]"
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-saffron/60 text-ink flex items-center justify-center"
                  >
                    <Play size={26} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                  </span>
                  <figcaption className="absolute left-[18px] right-[18px] bottom-3.5 flex flex-col gap-1">
                    <span className="font-display text-[19px] text-on-night-head">
                      {v.title}{" "}
                      {v.titlePlaceholder ? (
                        <>
                          <Placeholder label={v.titlePlaceholder} /> {v.titleSuffix}
                        </>
                      ) : null}
                    </span>
                    <span className="text-[13px] text-on-night-2 flex flex-wrap items-center gap-1.5">
                      <Placeholder label="LENGTH" /> · {v.note} · <Placeholder label="YouTube id" />
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Share your photos */}
      <section className="container-site section-pad flex flex-wrap items-center justify-between gap-6">
        <Reveal className="flex flex-col gap-2 max-w-[640px]">
          <h2 className="font-display text-[28px] md:text-[34px]">
            Were you here? Share your photographs.
          </h2>
          <p className="text-ink-2">
            Send your pictures of annadhanam, Deepam night or satsang on WhatsApp and we may add
            them to the gallery with your name.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href={site.whatsappHref} variant="night" size="lg">
            <WhatsappIcon size={18} aria-hidden /> Send on WhatsApp
          </Button>
        </Reveal>
      </section>
    </>
  );
}
