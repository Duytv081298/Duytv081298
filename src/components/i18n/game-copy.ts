import type { Locale } from './locale';
import type { Game } from '@/data/games';
import { messages } from './messages';

export function localizeGame(game: Game, locale: Locale): Game {
  if (locale === 'en') return game;
  const translate = (text: string) => messages[text]?.[locale === 'vi' ? 0 : 1] ?? text;
  return { ...game, subtitle: translate(game.subtitle), description: translate(game.description), architecture: translate(game.architecture), challenges: game.challenges.map(translate), solutions: game.solutions.map(translate) };
}
