import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";

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
    "Senior Game Developer specializing in Playable Ads, Hyper Casual Games, and Puzzle Games. Expert in Cocos Creator, performance optimization, and HTML5 game development. 30+ playable ads shipped.",
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
  openGraph: {
    title: "Trịnh Văn Duy — Senior Game Developer",
    description: "Explore my game portfolio. Play demos directly in your browser.",
    type: "website",
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
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
