import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { products as seededProducts } from "@/lib/shopData";

export const LOCAL_MODE = !process.env.MONGODB_URI;

const storeDir = path.join(process.cwd(), ".local-data");
const storeFile = path.join(storeDir, "store.json");
let memoryStore: Store | null = null;

type Store = {
  blogs: Record<string, any>[];
  events: Record<string, any>[];
  appointments: Record<string, any>[];
  contactMessages: Record<string, any>[];
  donations: Record<string, any>[];
  eventRegistrations: Record<string, any>[];
  galleryImages: Record<string, any>[];
  virtualSevaBookings: Record<string, any>[];
  settings: Record<string, any>;
  shopProducts: Record<string, any>[];
  shopOrders: Record<string, any>[];
  adminAccount: Record<string, any>;
  loginHistory: Record<string, any>[];
  passwordResetTokens: Record<string, any>[];
};

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  return randomUUID();
}

function seedStore(): Store {
  const createdAt = nowIso();

  const events = [
    {
      _id: makeId(),
      title: "Karthigai Deepam Festival",
      slug: "karthigai-deepam-festival",
      description: "The grand festival of divine light at Arunachala.",
      longDescription:
        "Karthigai Deepam is one of the holiest festivals in Thiruvannamalai. Devotees gather for prayer, annadhanam, bhajans, and the sacred lighting of the deepam.",
      date: new Date(Date.now() + 30 * 86400000).toISOString(),
      time: "5:00 AM - 11:00 PM",
      location: "Amma Ashram, Thiruvannamalai",
      category: "festival",
      isRecurring: false,
      maxAttendees: 500,
      registeredCount: 0,
      isFeatured: true,
      isPublished: true,
      createdAt,
      updatedAt: createdAt,
    },
    {
      _id: makeId(),
      title: "Weekly Satsang with Amma",
      slug: "weekly-satsang-with-amma",
      description: "Friday satsang with guidance, silence, and blessings.",
      longDescription:
        "An intimate satsang with chanting, Q&A, and meditation for seekers visiting the Ashram.",
      date: new Date(Date.now() + 7 * 86400000).toISOString(),
      time: "7:00 PM - 9:00 PM",
      location: "Ashram Meditation Hall",
      category: "satsang",
      isRecurring: true,
      maxAttendees: 120,
      registeredCount: 0,
      isFeatured: false,
      isPublished: true,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const blogs = [
    {
      _id: makeId(),
      title: "The Fire of Arunachala",
      slug: "the-fire-of-arunachala",
      excerpt: "A reflection on the sacred hill and the inner fire of awakening.",
      content:
        "Arunachala is not merely a hill. It is a living presence that calls seekers inward. Through silence, devotion, and surrender, the fire of grace burns away what is false and reveals what is eternal.",
      author: "Amma Ashram",
      category: "teachings",
      tags: ["arunachala", "teachings"],
      isFeatured: true,
      isPublished: true,
      readTime: 3,
      views: 0,
      createdAt,
      updatedAt: createdAt,
    },
    {
      _id: makeId(),
      title: "Annadhanam as a Spiritual Practice",
      slug: "annadhanam-as-a-spiritual-practice",
      excerpt: "Why feeding devotees and pilgrims is one of the highest offerings.",
      content:
        "Annadhanam is not charity alone. It is seva done with humility, gratitude, and love. When food is offered with devotion, both the giver and receiver are blessed.",
      author: "Amma Ashram",
      category: "annadhanam",
      tags: ["annadhanam", "seva"],
      isFeatured: false,
      isPublished: true,
      readTime: 2,
      views: 0,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const shopProducts = seededProducts.map((product, index) => ({
    _id: product.id,
    slug: product.slug,
    title: product.name,
    description: product.description,
    longDescription: product.longDescription,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    emoji: product.emoji,
    tags: product.tags,
    badge: product.badge,
    badgeColor: product.badgeColor,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.inStock,
    stockQuantity: product.inStock ? 25 - (index % 7) * 2 : 0,
    image: "",
    imagePublicId: "",
    sizeLabel: "",
    sizes: [],
    variations: [],
    isPublished: true,
    isFeatured: index < 4,
    sku: `AMMA-${product.id.toUpperCase()}`,
    createdAt,
    updatedAt: createdAt,
  }));

  return {
    blogs,
    events,
    appointments: [],
    contactMessages: [],
    donations: [],
    eventRegistrations: [],
    galleryImages: [],
    virtualSevaBookings: [],
    shopProducts,
    shopOrders: [],
    adminAccount: {
      _id: LOCAL_ADMIN_ID,
      name: "Local Admin",
      email: process.env.ADMIN_EMAIL || "admin@amma.org",
      password: process.env.ADMIN_PASSWORD || "admin",
      role: "superadmin",
      updatedAt: createdAt,
    },
    loginHistory: [],
    passwordResetTokens: [],
    settings: {
      youtubeLiveId: "",
      siteAnnouncement: "",
      announcementActive: false,
      maintenanceMode: false,
      contactEmail: "info@ammaashram.org",
      contactPhone: "",
      donationUpiId: "",
      ashramAddress: "Siva Sri Thiyaneswar Amma Ashram, Thiruvannamalai, Tamil Nadu 606601",
      createdAt,
      updatedAt: createdAt,
    },
  };
}

export function readStore(): Store {
  const seeded = seedStore();

  try {
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }

    if (!fs.existsSync(storeFile)) {
      fs.writeFileSync(storeFile, JSON.stringify(seeded, null, 2), "utf8");
      memoryStore = seeded;
      return seeded;
    }

    const stored = JSON.parse(fs.readFileSync(storeFile, "utf8")) as Partial<Store>;
    const merged: Store = {
      ...seeded,
      ...stored,
      settings: {
        ...seeded.settings,
        ...(stored.settings || {}),
      },
      shopProducts: stored.shopProducts && stored.shopProducts.length > 0 ? stored.shopProducts : seeded.shopProducts,
      shopOrders: stored.shopOrders || [],
      adminAccount: {
        ...seeded.adminAccount,
        ...(stored.adminAccount || {}),
      },
      loginHistory: stored.loginHistory || [],
      passwordResetTokens: stored.passwordResetTokens || [],
    };

    if (!stored.shopProducts || !stored.shopOrders || !stored.adminAccount || !stored.loginHistory || !stored.passwordResetTokens) {
      writeStore(merged);
    }

    memoryStore = merged;
    return merged;
  } catch {
    if (!memoryStore) {
      memoryStore = seeded;
    }
    return memoryStore;
  }
}

export function writeStore(store: Store) {
  memoryStore = store;

  try {
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }

    fs.writeFileSync(storeFile, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // On serverless hosts the filesystem may be read-only; keep data in memory for the request lifecycle.
  }
}

export function updateStore<T>(updater: (store: Store) => T): T {
  const store = readStore();
  const result = updater(store);
  writeStore(store);
  return result;
}

export const LOCAL_ADMIN_ID = "local-admin";

export function getLocalAdminAccount() {
  return readStore().adminAccount;
}

export function updateLocalAdminAccount(patch: Record<string, any>) {
  let account: Record<string, any> | null = null;
  updateStore((store) => {
    store.adminAccount = {
      ...store.adminAccount,
      ...patch,
      updatedAt: nowIso(),
    };
    account = store.adminAccount;
  });
  return account;
}

export function recordLoginHistory(entry: Record<string, any>) {
  updateStore((store) => {
    store.loginHistory.unshift(
      createLocalRecord({
        ...entry,
      })
    );
    store.loginHistory = store.loginHistory.slice(0, 100);
  });
}

export function getLoginHistory(limit = 25) {
  return readStore().loginHistory.slice(0, limit);
}

export function createPasswordResetToken(email: string) {
  const token = `AMMA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  updateStore((store) => {
    store.passwordResetTokens = store.passwordResetTokens.filter(
      (item) => item.email !== email && new Date(item.expiresAt).getTime() > Date.now()
    );
    store.passwordResetTokens.unshift(
      createLocalRecord({
        email,
        token,
        expiresAt,
        usedAt: null,
      })
    );
  });

  return { token, expiresAt };
}

export function consumePasswordResetToken(email: string, token: string) {
  let valid = false;
  updateStore((store) => {
    store.passwordResetTokens = store.passwordResetTokens.map((item) => {
      if (
        item.email === email &&
        item.token === token &&
        !item.usedAt &&
        new Date(item.expiresAt).getTime() > Date.now()
      ) {
        valid = true;
        return {
          ...item,
          usedAt: nowIso(),
        };
      }
      return item;
    });
  });
  return valid;
}

export function createLocalRecord<T extends Record<string, any>>(data: T): T & {
  _id: string;
  createdAt: string;
  updatedAt: string;
} {
  const timestamp = nowIso();
  return {
    _id: makeId(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...data,
  };
}

export function touch<T extends Record<string, any>>(record: T): T {
  return {
    ...record,
    updatedAt: nowIso(),
  };
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length;
  const start = (page - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    pagination: {
      total,
      page,
      limit,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}
