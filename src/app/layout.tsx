import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { siteUrl, socialImage } from '@/lib/site';
import { profile } from '@/data/profile';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trịnh Văn Duy — Senior Game Developer | Playable Ads & Hyper Casual Games",
  description:
    "Senior Game Developer with 6+ years of experience in Cocos Creator, Unity and HTML5/Instant Games. Scalable client architectures, playable-ad automation and mobile performance optimization.",
  keywords: [
    "Game Developer",
    "Playable Ads",
    "Hyper Casual Game",
    "Puzzle Game",
    "Cocos Creator",
    "HTML5 Game",
    "WebGL",
    "Game Portfolio",
    "Trịnh Văn Duy",
  ],
  authors: [{ name: "Trịnh Văn Duy" }],
  metadataBase: new URL("https://duytv081298.github.io"),
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Trịnh Văn Duy — Senior Game Developer",
    description: "Explore my game portfolio. Play demos directly in your browser.",
    type: "website",
    url: "/Duytv081298/",
    siteName: "Trịnh Văn Duy | Game Developer Portfolio",
    locale: "en_US",
    alternateLocale: ['vi_VN', 'zh_CN'],
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trịnh Văn Duy — Senior Game Developer",
    description: "Playable ads, game engineering and performance optimization.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-text antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Person', '@id': `${siteUrl}#person`,
          name: profile.name, jobTitle: profile.role, url: siteUrl,
          sameAs: [profile.github, profile.linkedin],
          knowsAbout: ['Cocos Creator', 'Unity', 'HTML5 games', 'Playable ads'],
        }).replace(/</g, '\\u003c') }} />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
