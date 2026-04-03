import type { Metadata } from "next";
import { Cinzel, Raleway, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Siva Sri Thiyaneswar Amma Ashram | Thiruvannamalai",
    template: "%s | Amma Ashram",
  },
  description:
    "A sacred spiritual haven at the foot of Arunachala. Experience divine grace through Yogam, Thiyanam, Annadhanam and the blessings of Siva Sri Thiyaneswar Amma. From Arunachala to the World.",
  keywords: [
    "Amma Ashram",
    "Thiruvannamalai",
    "Arunachala",
    "Spiritual",
    "Yoga",
    "Meditation",
    "Annadhanam",
    "Siva",
    "NRI devotees",
    "India ashram",
  ],
  authors: [{ name: "Siva Sri Thiyaneswar Amma Ashram" }],
  creator: "Siva Sri Thiyaneswar Amma Ashram",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Siva Sri Thiyaneswar Amma Ashram",
    title: "Siva Sri Thiyaneswar Amma Ashram",
    description: "From Arunachala to the World — A sacred digital doorway to divine grace.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Siva Sri Thiyaneswar Amma Ashram" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siva Sri Thiyaneswar Amma Ashram",
    description: "From Arunachala to the World — A sacred digital doorway to divine grace.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${cinzel.variable} ${raleway.variable} ${notoDevanagari.variable}`}
    >
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#F5F5F5",
              border: "1px solid rgba(212,168,83,0.3)",
            },
            success: { iconTheme: { primary: "#D4A853", secondary: "#0D0D0D" } },
            error: { iconTheme: { primary: "#C17F4A", secondary: "#0D0D0D" } },
          }}
        />
      </body>
    </html>
  );
}
