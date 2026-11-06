/**
 * Every photo in /public/images with its true pixel size and a descriptive alt.
 * Use with next/image: <Image {...images.maatajiThrone} />
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: "photo" | "illustration";
};

export const images = {
  logo: {
    src: "/images/siva-sri-thiyaneswar-amma-ashram-logo.webp",
    width: 720,
    height: 720,
    alt: "Siva Sri Thiyaneswar Amma Ashram logo",
    kind: "illustration",
  },
  arunachalaNight: {
    src: "/images/arunachala-hill-tiruvannamalai-night.jpg",
    width: 1672,
    height: 941,
    alt: "Arunachala hill at Tiruvannamalai under a night sky",
    kind: "illustration",
  },
  girivalamMap: {
    src: "/images/girivalam-route-map-tiruvannamalai.jpg",
    width: 1672,
    height: 941,
    alt: "Illustrated Girivalam route around Arunachala hill with the eight lingams",
    kind: "illustration",
  },
  girivalamWalk: {
    src: "/images/girivalam-path-walk-tiruvannamalai.jpg",
    width: 1672,
    height: 941,
    alt: "Pilgrims walking the Girivalam path around Arunachala, Tiruvannamalai",
    kind: "illustration",
  },
  maatajiBanner: {
    src: "/images/thiyaneswar-amma-maataji-banner.jpg",
    width: 2172,
    height: 724,
    alt: "Find peace within — begin your spiritual journey with Siva Sri Thiyaneswar Amma, Tiruvannamalai",
    kind: "photo",
  },
  maatajiFlowers: {
    src: "/images/thiyaneswar-amma-maataji-flowers.jpg",
    width: 335,
    height: 597,
    alt: "Maataji, Sathguru Siva Sri Thiyaneswar Amma, garlanded with flowers",
    kind: "photo",
  },
  maatajiPortrait: {
    src: "/images/thiyaneswar-amma-maataji-portrait.jpg",
    width: 900,
    height: 900,
    alt: "Portrait of Maataji, Sathguru Siva Sri Thiyaneswar Amma of Tiruvannamalai",
    kind: "photo",
  },
  maatajiSeated: {
    src: "/images/thiyaneswar-amma-maataji-seated.jpg",
    width: 768,
    height: 768,
    alt: "Maataji, Siva Sri Thiyaneswar Amma, seated in saffron",
    kind: "photo",
  },
  maatajiSeva: {
    src: "/images/thiyaneswar-amma-maataji-annadhanam-seva.jpg",
    width: 447,
    height: 447,
    alt: "Maataji distributing saffron cloth and food to sadhus on the Girivalam road",
    kind: "photo",
  },
  maatajiStudio: {
    src: "/images/thiyaneswar-amma-maataji-studio.jpg",
    width: 1672,
    height: 941,
    alt: "Maataji seated in a wooden chair in saffron, with vibhuti and rudraksha",
    kind: "photo",
  },
  maatajiThrone: {
    src: "/images/thiyaneswar-amma-maataji-throne.jpg",
    width: 765,
    height: 1020,
    alt: "Maataji, Sathguru Siva Sri Thiyaneswar Amma, seated in saffron",
    kind: "photo",
  },
  mounasamyAltar: {
    src: "/images/mouna-siddhar-tiruvannamalai-altar.jpg",
    width: 1280,
    height: 720,
    alt: "Mounasamy Siddhar seated before his altar at the ashram in Adi Annamalai, Tiruvannamalai",
    kind: "photo",
  },
  mounasamyFlame: {
    src: "/images/mouna-siddhar-tiruvannamalai-flame.jpg",
    width: 365,
    height: 547,
    alt: "Mounasamy Siddhar, the silent sadhu of Tiruvannamalai, beside a lamp flame",
    kind: "photo",
  },
  mounasamyFlowers: {
    src: "/images/mouna-siddhar-tiruvannamalai-flowers.jpg",
    width: 452,
    height: 678,
    alt: "Mounasamy Siddhar of Tiruvannamalai with flower offerings",
    kind: "photo",
  },
  mounasamyGarland: {
    src: "/images/mouna-siddhar-tiruvannamalai-garland.jpg",
    width: 365,
    height: 547,
    alt: "Mounasamy Siddhar, the silent sadhu of Tiruvannamalai, garlanded with jasmine and roses",
    kind: "photo",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
