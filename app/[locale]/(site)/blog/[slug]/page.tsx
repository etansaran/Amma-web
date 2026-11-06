import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getPost, posts, type PostBlock } from "@/content/posts";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { categoryLabels, formatDate } from "@/components/blog/postMeta";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return buildMetadata({
      locale,
      path: `/blog/${slug}`,
      title: "Article not found",
      description: "This article does not exist.",
      noIndex: true,
    });
  }
  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: images[post.image],
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const index = sorted.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? sorted[index - 1] : undefined;
  const older = index < sorted.length - 1 ? sorted[index + 1] : undefined;
  const related = [
    ...sorted.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...sorted.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);
  const cover = images[post.image];
  const path = `/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/${locale}${path}`,
            datePublished: post.publishedAt,
            image: cover.src,
          }),
          breadcrumbSchema([
            { name: "Home", path: `/${locale}` },
            { name: "News & blog", path: `/${locale}/blog` },
            { name: post.title, path: `/${locale}${path}` },
          ]),
        ]}
      />

      <PageHero
        variant="sand"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News & blog", href: "/blog" },
          { label: post.title },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Tag size={13} aria-hidden /> {categoryLabels[post.category]}
          </span>
        }
        title={post.title}
        lede={post.excerpt}
        extra={
          <div className="flex flex-wrap gap-2.5">
            <span className="chip">
              <Calendar size={14} className="text-saffron-text" aria-hidden />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="chip">
              <Clock size={14} className="text-saffron-text" aria-hidden /> {post.readMinutes} min read
            </span>
            <span className="chip" aria-label="Available in Tamil, English, Telugu and Hindi">
              TA · EN · TE · HI
            </span>
          </div>
        }
        aside={
          <PhotoFigure
            image={cover}
            ratio="4/3"
            position={post.image === "mounasamyGarland" ? "50% 15%" : "50% 50%"}
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        }
        asideClassName="flex-[0_1_420px]"
      />

      {/* Body */}
      <article className="container-site section-pad flex flex-col lg:flex-row gap-10 lg:gap-16">
        <Reveal className="flex-1 min-w-0">
          <div className="prose-site text-[17px] leading-[1.7]">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:w-[320px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-24 self-start w-full">
          <div className="card-night p-6 flex flex-col gap-3">
            <p className="eyebrow text-gold-light!">Mounasamy Siddhar</p>
            <p className="font-display text-[22px] leading-tight text-on-night-head">
              The silent sadhu of Tiruvannamalai lives at this ashram.
            </p>
            <p className="text-sm text-on-night-body">
              Story, guru–shishya account, and the darshan page with map and timings.
            </p>
            <Button href="/mounasamy" variant="outline-gold" size="sm">
              Mounasamy hub
            </Button>
          </div>
          <div className="card-ivory p-6 flex flex-col gap-3">
            <p className="eyebrow">Plan your visit</p>
            <p className="text-[15px] text-ink-2">
              Request a date, receive a clear reply from the office, and plan your Girivalam around it.
            </p>
            <Button href="/book-a-visit" size="sm">
              Book a visit
            </Button>
            <ArrowLink href="/tiruvannamalai-guide">Tiruvannamalai guide</ArrowLink>
          </div>
        </Reveal>
      </article>

      {/* CTA + prev/next */}
      <section className="bg-sand border-y border-line">
        <div className="container-site py-10 md:py-14 flex flex-col gap-8">
          <Reveal className="flex flex-wrap items-center justify-between gap-5">
            <p className="font-display text-[22px] md:text-[26px] max-w-[560px]">
              Come to Adi Annamalai: darshan every day, a hot meal for every sadhu.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button href="/mounasamy" variant="night">
                About Mounasamy
              </Button>
              <Button href="/book-a-visit" variant="outline-saffron">
                Book a visit
              </Button>
            </div>
          </Reveal>
          <Reveal>
            <nav aria-label="More articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="card card-hover p-5 flex items-start gap-3 text-ink"
                >
                  <ArrowLeft size={18} className="text-saffron-text shrink-0 mt-1" aria-hidden />
                  <span className="flex flex-col gap-1 min-w-0">
                    <span className="eyebrow-gold">Previous</span>
                    <span className="font-display text-[18px] leading-snug">{older.title}</span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden />
              )}
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="card card-hover p-5 flex items-start justify-end gap-3 text-ink text-right"
                >
                  <span className="flex flex-col gap-1 min-w-0 items-end">
                    <span className="eyebrow-gold">Next</span>
                    <span className="font-display text-[18px] leading-snug">{newer.title}</span>
                  </span>
                  <ArrowRight size={18} className="text-saffron-text shrink-0 mt-1" aria-hidden />
                </Link>
              ) : null}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="container-site section-pad flex flex-col gap-8">
        <Reveal>
          <SectionHeading
            eyebrow="Related"
            title="More from the ashram."
            action={<ArrowLink href="/blog">All articles</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((p) => (
            <RevealItem key={p.slug} as="article" className="h-full">
              <Link
                href={`/blog/${p.slug}`}
                className="card card-hover overflow-hidden flex flex-col h-full text-ink rounded-[20px]"
              >
                <PhotoFigure
                  image={images[p.image]}
                  ratio="16/10"
                  frame="none"
                  rounded="card"
                  position={p.image === "mounasamyGarland" ? "50% 15%" : "50% 50%"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="[&>div]:rounded-b-none"
                />
                <span className="p-[22px] flex flex-col gap-2 flex-1">
                  <span className="eyebrow-gold">{categoryLabels[p.category]}</span>
                  <span className="font-display text-[20px] leading-[1.3]">{p.title}</span>
                  <span className="mt-auto pt-2 flex flex-wrap items-center gap-x-3 text-[13px] text-ink-2">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} aria-hidden /> {formatDate(p.publishedAt, true)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} aria-hidden /> {p.readMinutes} min
                    </span>
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
