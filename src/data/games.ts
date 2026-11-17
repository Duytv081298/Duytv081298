import { caseStudies, caseStudySlugs } from './caseStudies';

export interface Game {
  id: string; slug: string; title: string; subtitle: string; genre: string; engine: string;
  platforms: string[]; coverColor: string; coverColorSecondary: string;
  description: string; architecture: string; challenges: string[]; solutions: string[];
  tags: string[]; featured: boolean; category: 'mobile' | 'playable' | 'instant' | 'web'; videoUrl?: string;
}

const legacyGames = [
  { slug: 'bloom-sort', title: 'Bloom Sort', color: '#C44569', subtitle: 'Layered flower sorting',
    description: 'A flower-sorting playable with layered bouquets, collection objectives and animated feedback.',
    architecture: 'The scene contains separate flower, vase, conveyor, order and pool components, with 2D rigid bodies and flower animation components.' },
  { slug: 'screw-puzzle', title: 'Screw Puzzle: Nuts & Bolts', color: '#2E86DE', subtitle: 'Screws, boards & 2D physics',
    description: 'A wooden-board puzzle that combines screw selection, empty holes and physically connected boards.',
    architecture: 'WoodController and NailController organize the board interaction. The inspected scene contains rigid bodies, revolute joints, hole components and separate nail interface elements.' },
  { slug: 'coffee-please', title: 'Coffee Please', color: '#6F4E37', subtitle: 'Cup sorting & conveyor coordination',
    description: 'A cup-and-tray sorting playable with a conveyor, collection objectives and a countdown.',
    architecture: 'The inspected scene separates GrabManager, SortManager, Conveyor and OrderController. Map configuration, tray spawning and cup visuals are represented by dedicated components.' },
  { slug: 'fall-guy-legend', title: 'Fall Guy', color: '#006B63', subtitle: 'Motorcycle character demo',
    description: 'The available browser creative presents character selection and motorcycle gameplay.',
    architecture: 'A packaged Unity/Luna browser creative. The visible build supports character selection; a detailed implementation case study is available for the featured projects.' },
  { slug: 'tidy-master', title: 'Tidy Master', color: '#5A3FD9', subtitle: 'Food placement & tactile feedback',
    description: 'A food-placement playable with shaped containers, draggable items and completion feedback.',
    architecture: 'Shared BasePlayable components cover responsive layout, pooling and game lifecycle. ItemStart and ItemEnd components represent the placement interaction, alongside 2D bodies and colliders.' },
  { slug: 'cat-stack', title: 'Cat Stack', color: '#C44569', subtitle: '2D physics, cards & perks',
    description: 'A cat-themed playable combining 2D physical interaction, obstacles, cards and selectable perks.',
    architecture: 'CatController, CardController and PerkController separate the main gameplay areas. The scene includes 2D rigid bodies, polygon colliders and dedicated cat animation components.' },
];

export const games: Game[] = [
  ...caseStudySlugs.map((slug, index): Game => {
    const study = caseStudies[slug];
    const titles = { arrow: 'Arrow', 'screw-town': 'Screw Town', 'car-blast': 'Car Blast' };
    return {
      id: `engineering-${slug}`, slug, title: titles[slug], subtitle: study.focus,
      genre: 'Puzzle', engine: 'Cocos Creator', platforms: ['Playable Ad', 'AppLovin'],
      coverColor: ['#C44569', '#5A3FD9', '#0652DD'][index], coverColorSecondary: '#07101d',
      description: study.context, architecture: study.architecture,
      challenges: [study.context], solutions: study.decisions.map(decision => decision.body),
      tags: slug === 'arrow' ? ['Custom rendering', 'Mesh + UV', 'Cocos Creator'] : slug === 'screw-town' ? ['3D interaction', 'Physics', 'Cocos Creator'] : ['Data-driven levels', '3D', 'Cocos Creator'],
      featured: true, category: 'playable',
    };
  }),
  ...legacyGames.map((game): Game => ({
    ...game, id: game.slug, genre: 'Puzzle', engine: game.slug === 'fall-guy-legend' ? 'Unity / Luna' : 'Cocos Creator',
    platforms: ['Playable Ad'], coverColor: game.color, coverColorSecondary: '#07101d',
    challenges: [game.description], solutions: [game.architecture], tags: ['Casual', 'Playable Ad'],
    featured: false, category: 'playable',
  })),
];

export function getGameBySlug(slug: string): Game | undefined { return games.find(game => game.slug === slug); }
export function getGamesByCategory(category: string): Game[] { return category === 'all' ? games : games.filter(game => game.category === category); }
export function getFeaturedGames(): Game[] { return games.filter(game => game.featured); }
