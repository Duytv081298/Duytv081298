import { notFound } from 'next/navigation';
import { games, getGameBySlug } from '@/data/games';
import GameDetailClient from './GameDetailClient';
import { siteUrl, socialImage } from '@/lib/site';

// Generate static paths for all games
export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

// Generate metadata for each game page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: 'Game Not Found' };

  return {
    title: `${game.title} — Case Study | Trịnh Văn Duy`,
    description: game.description,
    alternates: { canonical: `${siteUrl}games/${game.slug}/` },
    openGraph: { title: `${game.title} — Engineering Case Study`, description: game.description, type: 'article', url: `${siteUrl}games/${game.slug}/`, images: [socialImage] },
    twitter: { card: 'summary_large_image', title: `${game.title} — Case Study | Trịnh Văn Duy`, description: game.description, images: [socialImage] },
  };
}

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameDetailClient game={game} />;
}
