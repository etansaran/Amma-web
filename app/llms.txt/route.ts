import { site } from "@/lib/site";
import { posts } from "@/content/posts";
import { ashramFaqs, maatajiFaqs } from "@/content/faqs";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text guide to the site for AI assistants (llmstxt.org).
 * Optional for Google, read by several AI tools. Facts mirror the pages.
 */
export function GET() {
  const u = (path: string) => `${site.url}/en${path === "/" ? "" : path}`;
  const body = `# ${site.name}

> Ashram and charitable trust of Sathguru Siva Sri Thiyaneswar Amma (Maataji) at Adi Annamalai on the Girivalam path, Tiruvannamalai, Tamil Nadu, India. Daily annadhanam for sadhus, Shiva pooja, Thiruvasagam and Kailaya Vathiyam classes, satsang — and home of Mounasamy Siddhar (Mouna Siddhar), Maataji's shishya.

## Key facts
- Name: ${site.name} (Tamil: ${site.nameTamil})
- Founder and guru: Sathguru Siva Sri Thiyaneswar Amma, known as Maataji (Smt. Rajeswari)
- Charitable trust founded ${site.trust.foundedText}, registration ${site.trust.registration}
- Address: ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}, ${site.address.region}, India
- Phone: ${site.phone} · WhatsApp: ${site.whatsapp} · Email: ${site.email}
- Open daily. Satsang, classes and annadhanam: ${site.daily.programme}
- Maataji's darshan: Fridays and Pournami, 9 AM – 7 PM (as her health allows; a meeting is not guaranteed)
- Mounasamy Siddhar stands for darshan daily, ${site.mounasamyStanding}; free
- Annadhanam: free, 365 days; about ${site.annadhanam.dailyPlates} plates a day, about ${site.annadhanam.pournamiPlates} on Pournami nights
- Rooms available for devotees; advance booking required
- Motto: ${site.motto} ("${site.mottoEnglish}")
- Maataji wrote the lyrics of the song "${site.song.titleLatin}" (Jothi TV, 2024, 6.2M+ views): ${site.song.youtubeUrl}

## Main pages
- [Home](${u("/")}): the ashram and Maataji
- [Maataji — Sathguru Siva Sri Thiyaneswar Amma](${u("/maataji")}): life, teachings, books
- [About the ashram](${u("/ashram")}): daily life, timings, visitor information
- [Annadhanam](${u("/annadhanam")}): free meals for sadhus; sponsor a day; volunteer
- [Mounasamy Siddhar (Mouna Siddhar)](${u("/mounasamy")}): the silent sadhu of Tiruvannamalai
- [Mounasamy darshan: location and timings](${u("/mounasamy/darshan")})
- [Teachings and satsang](${u("/teachings")})
- [Pooja and events calendar](${u("/events")})
- [Tiruvannamalai guide: temple timings, Girivalam dates, Karthigai Deepam](${u("/tiruvannamalai-guide")})
- [Book a visit](${u("/book-a-visit")}) · [Donate](${u("/donate")}) · [Contact](${u("/contact")})

## Articles
${posts.map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}

## Frequently asked
${[...maatajiFaqs, ...ashramFaqs].map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

## Languages
English (/en), Tamil (/ta), Telugu (/te), Hindi (/hi).
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
