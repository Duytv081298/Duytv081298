export interface Game {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  engine: string;
  platforms: string[];
  coverColor: string; // gradient color for placeholder
  coverColorSecondary: string;
  description: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  tags: string[];
  featured: boolean;
  category: 'mobile' | 'playable' | 'instant' | 'web';
  videoUrl?: string;
}

export const games: Game[] = [
  {
    id: '1',
    slug: 'bloom-sort',
    title: 'Bloom Sort',
    subtitle: 'Relaxing flower sorting puzzle',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin'],
    coverColor: '#FF6B9D',
    coverColorSecondary: '#C44569',
    description: "A flower sorting playable: group matching colors and complete the board. This design review focuses on responsive input and reusable visual feedback.",
    architecture: "Separate board data, touch input and visual feedback. Validate moves before changing the model; emit events for animation and completion. Bound effect pools and release level assets at restart.",
    challenges: ["Responsive dragging without accepting invalid moves", "Texture residency and allocations across restarts", "Visual variety within a network-specific package budget"],
    solutions: ["Validate each move before running its animation", "Group compatible sprites and bound reusable effect pools", "Audit embedded textures, audio and code before selecting compression"],
    tags: ['Puzzle', 'Sorting', 'Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '2',
    slug: 'screw-puzzle',
    title: 'Screw Puzzle: Nuts & Bolts',
    subtitle: 'Satisfying unscrewing mechanics',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin', 'Google Play'],
    coverColor: '#4DA3FF',
    coverColorSecondary: '#2E86DE',
    description: "A screw-and-board playable. Remove boards by moving screws into valid empty holes. This review focuses on move validation and synchronized visual feedback.",
    architecture: "Represent holes, screws and board dependencies as data. Update the board model atomically after validation; animate the result in a separate view layer. Keep restart and completion states explicit.",
    challenges: ["Rapid repeated touches applying a move twice", "Blocked holes and overlapping board dependencies", "Animation and logical state diverging after interruption"],
    solutions: ["Lock the active move until its state update is committed", "Validate occupancy and dependencies before animation", "Reset the logical and visual layers together"],
    tags: ['Puzzle', 'Physics', 'Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '3',
    slug: 'coffee-please',
    title: 'Coffee Please',
    subtitle: 'Brew & serve coffee shop simulation',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Mobile'],
    coverColor: '#8B6914',
    coverColorSecondary: '#6F4E37',
    description: "A coffee service playable combining preparation, orders and visual feedback. This review focuses on predictable state transitions and a lightweight simulation loop.",
    architecture: "Represent orders as waiting, preparing, ready, served or expired. Store recipes as data and emit UI and scoring events from guarded transitions. A lifecycle adapter pauses timers and audio when visibility changes.",
    challenges: ["Multiple orders without duplicate service or rewards", "Readable pouring progress on a rendering budget", "Recovering orders and timers after backgrounding"],
    solutions: ["Guard completion through an explicit order state machine", "Prefer reusable scripted pour effects and shared materials", "Pause and restore the simulation from logical state"],
    tags: ['Simulation', 'Time Management', 'Hyper Casual', 'Cocos Creator'],
    featured: true,
    category: 'playable',
  },
  {
    id: '4',
    slug: 'fall-guy-legend',
    title: 'Fall Guy Legend',
    subtitle: 'Obstacle course runner',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin'],
    coverColor: '#00F5A0',
    coverColorSecondary: '#00C97B',
    description:
      'A vibrant obstacle course game inspired by battle royale runners. Players navigate through rotating platforms, swinging hammers, and slippery slopes to reach the finish line.',
    architecture:
      'Level-based architecture with procedural obstacle placement. Physics-driven character controller with ragdoll fallback for elimination sequences.',
    challenges: [
      'Smooth character physics on moving/rotating platforms',
      'Ragdoll transitions that feel natural',
      'Maintaining 60fps with complex obstacle animations',
    ],
    solutions: [
      'Kinematic character controller with platform velocity inheritance',
      'Pre-baked ragdoll poses with smooth blending from animated state',
      'GPU instancing for repeated obstacle meshes, culling off-screen elements',
    ],
    tags: ['Runner', 'Obstacle Course', 'Hyper Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '5',
    slug: 'tidy-master',
    title: 'Tidy Master',
    subtitle: 'Organize & clean satisfying gameplay',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Web'],
    coverColor: '#7C5CFF',
    coverColorSecondary: '#5A3FD9',
    description:
      'A satisfying cleaning and organization game. Players sort items, clean surfaces, and organize spaces with smooth drag mechanics and ASMR-like completion effects.',
    architecture:
      'Grid-based placement system with snap-to-grid mechanics. Undo/redo stack for player actions. Achievement system with visual progress tracking.',
    challenges: [
      'Natural-feeling item placement with grid snapping',
      'Diverse item shapes requiring flexible grid calculations',
      'Satisfying visual/audio feedback system',
    ],
    solutions: [
      'Weighted grid snapping with proximity-based alignment guides',
      'Polygon-based grid occupation calculation for irregular shapes',
      'Layered particle + screen shake + pitch-shifting audio feedback pipeline',
    ],
    tags: ['Organization', 'Cleaning', 'Puzzle', 'Cocos Creator'],
    featured: false,
    category: 'playable',
  },
  {
    id: '6',
    slug: 'cat-stack',
    title: 'Cat Stack',
    subtitle: 'Stack cute cats as high as you can',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Playable Ad'],
    coverColor: '#FF5E7E',
    coverColorSecondary: '#D63657',
    description:
      'A charming stacking game where players balance adorable cats on top of each other. Simple one-tap mechanics with physics-based stacking and cute character designs.',
    architecture:
      'Simple game loop with physics-based stacking. Spine animation integration for cat characters. Score tracking with local leaderboard.',
    challenges: [
      'Precise physics stacking that feels fair to players',
      'Spine animations syncing with physics bodies',
      'Facebook Playable API integration',
    ],
    solutions: [
      'Custom physics material with high friction and adjusted restitution',
      'Animation-driven physics body shape updates per frame',
      'Abstracted platform layer for cross-platform deployment',
    ],
    tags: ['Stacking', 'Physics', 'Cute', 'Hyper Casual', 'Cocos Creator'],
    featured: false,
    category: 'instant',
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  if (category === 'all') return games;
  return games.filter((g) => g.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}
