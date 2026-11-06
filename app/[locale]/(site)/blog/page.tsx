import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Calendar, Clock, Languages, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { posts } from "@/content/posts";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { PostFilter, type PostCard } from "@/components/blog/PostFilter";
import { SubscribeForm } from "@/components/blog/SubscribeForm";
import { categoryLabels, formatDate } from "@/components/blog/postMeta";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/blog",
    title: "News & Blog: ashram updates and Tiruvannamalai guides",
    description:
      "Ashram news, event reports and guides to Tiruvannamalai: temple timings, Karthigai Deepam 2026, Girivalam dates and the ashram's own account of Mouna Siddhar.",
    image: images.arunachalaNight,
  });
}

const FEATURED_SLUG = "karthigai-deepam-2026-tiruvannamalai";
const HIGHLIGHT_SLUG = "who-is-mouna-siddhar-tiruvannamalai";

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featured = sorted.find((p) => p.slug === FEATURED_SLUG) ?? sorted[0];
  const cards: PostCard[] = sorted.map(
    ({ slug, title, excerpt, category, publishedAt, readMinutes, image }) => ({
      slug,
      title,
      excerpt,
      category,
      publishedAt,
      readMinutes,
      image,
    }),
  );

  return (
    <>
      <PageHero
        variant="sand"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & blog" }]}
        eyebrow="News & blog"
        title="Ashram updates, event reports, and guides to Tiruvannamalai."
        lede="Every article is published in Tamil first, then English, Telugu and Hindi. Guides answer the questions pilgrims search for — temple timings, Deepam dates, Girivalam calendar — so that devotees find the ashram on their way to the hill."
        extra={
          <div className="flex flex-wrap gap-2.5">
            <span className="chip">
              <Languages size={14} className="text-saffron-text" aria-hidden /> தமிழ் · English · తెలుగు · हिन्दी
            </span>
            <span className="chip">
              <Calendar size={14} className="text-saffron-text" aria-hidden /> Updated for Karthigai Deepam 2026
            </span>
          </div>
        }
      />

      {/* Featured */}
      {featured ? (
        <section className="container-site pt-12 md:pt-[72px] pb-6">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="flex flex-wrap bg-night text-on-night rounded-lg overflow-hidden card-hover border border-night"
            >
              <div className="relative flex-[1_1_520px] min-w-0 min-h-[220px] sm:min-h-[300px] lg:min-h-[400px]">
                <Image
                  src={images[featured.image].src}
                  alt={images[featured.image].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
                <span className="absolute left-3.5 bottom-3.5 text-[11px] tracking-[.14em] uppercase font-bold px-2 py-1 rounded-md bg-white/90 text-ink-2 border border-line">
                  {images[featured.image].kind === "photo" ? "Photo" : "Illustration"}
                </span>
              </div>
              <div className="flex-[1_1_440px] p-6 md:p-10 flex flex-col gap-3.5 justify-center">
                <span className="text-[12px] tracking-[.16em] uppercase text-gold-light font-semibold">
                  Featured guide · {categoryLabels[featured.category]}
                </span>
                <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] text-on-night-head">
                  {featured.title}
                </h2>
                <p className="text-on-night-body">{featured.excerpt}</p>
                <span className="flex flex-wrap gap-x-3 gap-y-1.5 items-center text-[13px] text-on-night-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} aria-hidden /> Updated {formatDate(featured.publishedAt, true)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden /> {featured.readMinutes} min read
                  </span>
                  <span className="inline-flex gap-1" aria-label="Available in Tamil, English, Telugu and Hindi">
                    {["TA", "EN", "TE", "HI"].map((l) => (
                      <span key={l} className="px-1.5 py-px border border-night-line rounded-[4px] text-[11px] font-semibold">
                        {l}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="link-arrow-gold mt-1">
                  Read the guide <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      ) : null}

      {/* Posts */}
      <section id="posts" className="container-site pt-6 pb-14 md:pb-24 flex flex-col gap-8 md:gap-10">
        <Reveal>
          <PostFilter posts={cards} highlightSlug={HIGHLIGHT_SLUG} />
        </Reveal>

        {/* Mounasamy hub */}
        <Reveal>
          <div className="card-ivory p-6 md:p-8 flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex-[0_1_180px] w-full max-w-[180px] mx-auto sm:mx-0">
              <PhotoFigure
                image={images.mounasamyAltar}
                ratio="4/3"
                rounded="card"
                sizes="(max-width: 640px) 180px, 180px"
              />
            </div>
            <div className="flex-[1_1_320px] flex flex-col gap-2.5">
              <p className="eyebrow">Mounasamy Siddhar · the official pages</p>
              <h2 className="font-display text-[24px] md:text-[28px] leading-tight">
                Looking for Mouna Siddhar of Tiruvannamalai?
              </h2>
              <p className="text-ink-2 text-[15px]">
                The silent sadhu lives at this ashram. His story, the guru–shishya account and the
                darshan page with map and timings are kept together in one hub.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mt-1">
                <Button href="/mounasamy" variant="night" size="sm">
                  Mounasamy hub
                </Button>
                <ArrowLink href="/mounasamy/darshan">Darshan: location &amp; timings</ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Subscribe */}
      <section className="bg-night text-on-night border-t border-night-line">
        <div className="container-site py-14 md:py-[72px] flex flex-wrap items-center justify-between gap-8">
          <Reveal className="flex flex-col gap-2.5 max-w-[560px]">
            <p className="eyebrow text-gold-light! inline-flex items-center gap-2">
              <MessageCircle size={14} aria-hidden /> WhatsApp or email
            </p>
            <h2 className="font-display text-[28px] md:text-[34px] leading-[1.15] text-on-night-head">
              Pournami reminders and ashram news, once a month.
            </h2>
            <p className="text-on-night-body">
              On WhatsApp or email, in the language you choose. No more than two messages a month.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_440px]">
            <SubscribeForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
