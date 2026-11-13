'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Play,
  RotateCw,
  Smartphone,
  X,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import PlayableFrame from '@/components/game/PlayableFrame';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { playableAds, playableCategories, getPlayablesByCategory, type PlayableAd } from '@/data/playableAds';

const getCategorySvg = (category: string) => {
  switch (category) {
    case 'puzzle':
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M7.5 10.5h9v3h-9z" fill="currentColor" fillOpacity="0.25" />
          <path d="M10.5 7.5h3v9h-3z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );
    case 'hyper-casual':
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" fillOpacity="0.25" />
          <path d="M6 12h4M8 10v4" />
          <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="18.5" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'sorting':
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v15a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3M18 3v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3" />
          <line x1="4" y1="3" x2="14" y2="3" />
          <line x1="16" y1="3" x2="22" y2="3" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="21" cy="9" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'screw':
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M9 5h6M9 9h6M9 13h6M9 17h6" />
          <rect x="7" y="2" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );
    case 'simulation':
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 22V9l9-6 9 6v13H3z" fill="currentColor" fillOpacity="0.25" />
          <rect x="9" y="15" width="6" height="7" fill="currentColor" fillOpacity="0.2" />
          <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg className="w-9 h-9 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" fillOpacity="0.25" />
          <path d="M6 12h4M8 10v4" />
        </svg>
      );
  }
};

const INITIAL_VISIBLE_ADS = 10;

export default function PlayableAdsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllAds, setShowAllAds] = useState(false);
  const [activeAd, setActiveAd] = useState<PlayableAd | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeBuildIndex, setActiveBuildIndex] = useState<number>(0);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [highlightedAdId, setHighlightedAdId] = useState<string | null>(null);

  const openPlayer = (ad: PlayableAd) => {
    setActiveAd(ad);
    setIsFullscreen(false);
    setIsLandscape(false);
    
    const buildsCount = ad.demoBuilds ? ad.demoBuilds.length : 1;
    const randomIndex = Math.floor(Math.random() * buildsCount);
    setActiveBuildIndex(randomIndex);
    
    setReloadKey(0);
  };

  useEffect(() => {
    const handlePlayGame = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>;
      const ad = playableAds.find((ad) => ad.slug === customEvent.detail.slug);
      if (ad) {
        // 1. Ensure we see all games first (so the card is in the DOM)
        setActiveFilter('all');
        setShowAllAds(true);

        // 2. Scroll to the specific card centered in the viewport
        setTimeout(() => {
          const cardElement = document.getElementById(`playable-ad-${ad.slug}`);
          if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            const section = document.getElementById('playable');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);

        // 3. Highlight the specific card when scroll is near completion
        setTimeout(() => {
          setHighlightedAdId(ad.id);
        }, 750);

        // 4. Open player after showing the highlighted effect
        setTimeout(() => {
          setHighlightedAdId(null);
          openPlayer(ad);
        }, 2050);
      }
    };
    window.addEventListener('play-game', handlePlayGame);
    return () => window.removeEventListener('play-game', handlePlayGame);
  }, []);

  const filteredAds = getPlayablesByCategory(activeFilter);
  const visibleAds =
    activeFilter === 'all' && !showAllAds
      ? filteredAds.slice(0, INITIAL_VISIBLE_ADS)
      : filteredAds;

  const handlePrevAd = () => {
    if (!activeAd) return;
    const currentIndex = playableAds.findIndex((ad) => ad.id === activeAd.id);
    const prevIndex = (currentIndex - 1 + playableAds.length) % playableAds.length;
    openPlayer(playableAds[prevIndex]);
  };

  const handleNextAd = () => {
    if (!activeAd) return;
    const currentIndex = playableAds.findIndex((ad) => ad.id === activeAd.id);
    const nextIndex = (currentIndex + 1) % playableAds.length;
    openPlayer(playableAds[nextIndex]);
  };

  const closePlayer = () => {
    setActiveAd(null);
    setIsFullscreen(false);
  };

  return (
    <section id="playable" className="relative py-10 md:py-12">
      <div className="section-container">
        {/* Compact header: copy on the left, metrics on the right. */}
        <div className="mb-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeader
            id="playable"
            index="01"
            title="Playable Ads"
            subtitle={`${playableAds.length} playable ads shipped. Click "Play" to try them directly in your browser.`}
            className="mb-0 min-w-0 flex-1 lg:max-w-xl"
          />

          <RevealOnScroll className="w-full shrink-0 lg:w-auto lg:pb-0.5">
            <div className="grid w-full grid-cols-3 lg:min-w-[390px]" aria-label="Playable ads statistics">
              <div className="flex min-w-0 flex-col px-3 sm:px-5 lg:pl-0">
                <span className="font-code text-lg font-bold leading-none text-primary sm:text-xl">
                  {playableAds.length}+
                </span>
                <span className="mt-1 text-[10px] text-text-secondary sm:text-xs">Total Games</span>
              </div>
              <div className="flex min-w-0 flex-col border-l border-border/70 px-3 sm:px-5">
                <span className="font-code text-lg font-bold leading-none text-accent sm:text-xl">{'<5MB'}</span>
                <span className="mt-1 text-[10px] text-text-secondary sm:text-xs">Each</span>
              </div>
              <div className="flex min-w-0 flex-col border-l border-border/70 px-3 sm:px-5 lg:pr-0">
                <span className="font-code text-lg font-bold leading-none text-purple sm:text-xl">Playable</span>
                <span className="mt-1 text-[10px] text-text-secondary sm:text-xs">In Browser</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Filter Tabs */}
        <div
          className="scrollbar-none -mx-4 mb-5 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter playable ads by category"
        >
          {playableCategories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              aria-label={`Show ${cat.label} playable ads`}
              aria-pressed={activeFilter === cat.value}
              className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                activeFilter === cat.value
                  ? 'text-primary bg-primary/10 border border-primary/30'
                  : 'border-border/70 bg-card/60 text-text-secondary hover:border-border-hover hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            id="playable-ads-grid"
            key={activeFilter}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-[18px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {visibleAds.map((ad, index) => {
              const isHighlighted = highlightedAdId === ad.id;
              return (
                <motion.button
                  type="button"
                  key={ad.id}
                  id={`playable-ad-${ad.slug}`}
                  className="group relative block w-full appearance-none rounded-xl bg-transparent p-0 text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  animate={isHighlighted ? {
                    scale: 1.05,
                    y: -10,
                  } : { scale: 1, y: 0 }}
                  onClick={() => openPlayer(ad)}
                  aria-label={`Play ${ad.title}`}
                >
                  {/* Card */}
                  <div
                    className={`glass-premium relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-xl border p-3 transition-all duration-300 ${
                      isHighlighted
                        ? 'border-primary shadow-[0_0_35px_rgba(79,142,247,0.7)] z-30'
                        : 'border-border/50 group-hover:-translate-y-0.5 group-hover:border-primary/45 group-hover:shadow-[0_10px_28px_rgba(79,142,247,0.09)]'
                    }`}
                  >
                    {isHighlighted && (
                      <div className="pointer-events-none absolute inset-0 z-20 animate-pulse rounded-xl border-2 border-primary" />
                    )}
                    {/* Blurred icon and color wash keep each card tied to its game art. */}
                    {ad.icon ? (
                      <img
                        src={ad.icon}
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-[0.14] blur-2xl transition-transform duration-500 group-hover:scale-[1.35]"
                      />
                    ) : null}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.16] transition-opacity duration-300 group-hover:opacity-[0.22]"
                      style={{
                        background: `linear-gradient(145deg, ${ad.coverColor}, ${ad.coverColorSecondary})`,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-bg-primary/20" />

                    <div className="relative z-10 flex w-full flex-col items-center justify-center">
                      <div className="relative h-14 w-14 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-16 sm:w-16 lg:h-[68px] lg:w-[68px]">
                        {ad.icon ? (
                          <img
                            src={ad.icon}
                            alt={`${ad.title} icon`}
                            className="h-full w-full rounded-[22%] border border-white/15 object-cover shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
                          />
                        ) : (
                          <div
                            className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[22%] border border-white/15 p-2 shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
                            style={{
                              background: `linear-gradient(135deg, ${ad.coverColor}, ${ad.coverColorSecondary})`,
                            }}
                          >
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
                            <div className="z-10 transition-transform duration-300 group-hover:scale-110">
                              {getCategorySvg(ad.category)}
                            </div>
                            <span className="absolute bottom-1 z-10 select-none rounded border border-white/5 bg-black/35 px-1 py-0.5 font-code text-[7px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-[2px]">
                              {ad.title.slice(0, 3)}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center rounded-[22%] bg-black/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/20">
                            <Play size={13} className="ml-0.5 text-primary" fill="currentColor" />
                          </span>
                        </div>
                      </div>

                      <span className="mt-3 line-clamp-1 max-w-full px-1 text-center font-display text-xs font-bold leading-tight text-white/95 transition-colors duration-200 group-hover:text-primary sm:text-[13px]">
                        {ad.title}
                      </span>
                      <span className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-2 py-0.5 font-code text-[8px] capitalize leading-none text-text-secondary backdrop-blur-md transition-colors duration-200 group-hover:border-primary/20 group-hover:text-text">
                        {ad.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {activeFilter === 'all' && filteredAds.length > INITIAL_VISIBLE_ADS && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllAds((current) => !current)}
              aria-controls="playable-ads-grid"
              aria-expanded={showAllAds}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-bg-primary/30 px-4 py-2 font-code text-[11px] font-medium text-primary transition-colors duration-200 hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              {showAllAds ? 'Show Fewer Playable Ads' : 'View More Playable Ads'}
              {showAllAds ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {activeAd && (
          <motion.div
            className={`fixed z-[100] flex items-center justify-center transition-all ${
              isFullscreen ? 'inset-x-0 bottom-0 top-[82px] p-0' : 'inset-0 p-4 md:p-6'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md"
              onClick={closePlayer}
            />

            {/* Split Player Container */}
            <motion.div
              className={`relative z-10 flex flex-col md:flex-row items-stretch bg-[#141720] border border-border/80 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ${
                isFullscreen
                  ? 'w-full h-full rounded-none'
                  : isLandscape
                    ? 'w-full h-[85vh] md:w-[1160px] md:h-[620px] rounded-2xl'
                    : 'w-full h-[85vh] md:w-[840px] md:h-[620px] rounded-2xl'
              } transition-all duration-300`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              {/* Game Simulator Column */}
              <div className={`relative flex flex-col justify-center items-center bg-[#07090e] ${
                isFullscreen
                  ? 'w-full h-full p-0'
                  : isLandscape
                    ? 'w-full md:w-[670px] h-[50%] md:h-full flex-shrink-0 border-b md:border-b-0 md:border-r border-border/30 p-0'
                    : 'w-full md:w-[350px] h-[55%] md:h-full flex-shrink-0 border-b md:border-b-0 md:border-r border-border/30 p-0'
              } transition-all duration-300`}>
                {isFullscreen ? (
                  /* Fullscreen Iframe */
                  <div className={`relative overflow-hidden bg-black mx-auto transition-all ${
                    isFullscreen && !isLandscape
                      ? 'h-full aspect-[9/16] max-w-full shadow-2xl border-x border-white/10'
                      : 'w-full h-full'
                  }`}>
                    <PlayableFrame
                      key={`${activeAd.id}-${activeBuildIndex}-${reloadKey}-${isLandscape}`}
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${
                        activeAd.demoBuilds && activeAd.demoBuilds[activeBuildIndex]
                          ? activeAd.demoBuilds[activeBuildIndex].publicPath
                          : activeAd.publicPath
                      }`}
                      title={activeAd.title}
                      googlePlay={activeAd.googlePlay}
                      appStore={activeAd.appStore}
                    />
                  </div>
                ) : (
                  /* Simple Iframe Wrapper */
                  <div className="relative w-full h-full overflow-hidden bg-black transition-all duration-300">
                    <PlayableFrame
                      key={`${activeAd.id}-${activeBuildIndex}-${reloadKey}-${isLandscape}`}
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${
                        activeAd.demoBuilds && activeAd.demoBuilds[activeBuildIndex]
                          ? activeAd.demoBuilds[activeBuildIndex].publicPath
                          : activeAd.publicPath
                      }`}
                      title={activeAd.title}
                      googlePlay={activeAd.googlePlay}
                      appStore={activeAd.appStore}
                    />
                  </div>
                )}

                {/* Overlaid controls when in Fullscreen */}
                {isFullscreen && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-border/50 text-text hover:text-primary hover:bg-black transition-all"
                      title="Exit Fullscreen"
                    >
                      <Minimize2 size={16} />
                    </button>
                    <button
                      onClick={closePlayer}
                      className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-border/50 text-text hover:text-danger hover:bg-black transition-all"
                      title="Close Game"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Info & Config Column (Only show when not fullscreen) */}
              {!isFullscreen && (
                <div
                  className="flex-1 flex flex-col justify-between p-6 md:p-8 overflow-y-auto h-[50%] md:h-full border-t md:border-t-0 border-border/30"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    backgroundColor: '#090a0f',
                  }}
                >
                  {/* Top Bar with Quick Controls */}
                  <div className="flex items-center justify-end border-b border-violet-500/30 pb-3.5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrevAd}
                        className="h-9 px-4.5 rounded-lg text-violet-300 hover:text-white bg-violet-500/5 hover:bg-violet-500/20 border border-violet-500/50 hover:border-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all text-xs font-code font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        title="Previous Game"
                      >
                        ← PREV
                      </button>
                      <button
                        onClick={handleNextAd}
                        className="h-9 px-4.5 rounded-lg text-violet-300 hover:text-white bg-violet-500/5 hover:bg-violet-500/20 border border-violet-500/50 hover:border-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all text-xs font-code font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        title="Next Game"
                      >
                        NEXT →
                      </button>
                      <button
                        onClick={() => setIsLandscape(!isLandscape)}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                          isLandscape
                            ? 'bg-violet-500/20 border-violet-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                            : 'bg-transparent border-violet-500/50 text-violet-300 hover:bg-violet-500/20 hover:text-white hover:border-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.18)]'
                        }`}
                        title="Rotate Simulator"
                      >
                        <Smartphone size={15} className={isLandscape ? 'rotate-90 transition-transform duration-300' : 'transition-transform duration-300'} />
                      </button>
                      <button
                        onClick={() => setReloadKey(prev => prev + 1)}
                        className="w-9 h-9 rounded-full border border-violet-500/50 flex items-center justify-center bg-violet-500/5 text-violet-300 hover:text-white hover:bg-violet-500/20 hover:border-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all"
                        title="Reload Game"
                      >
                        <RotateCw size={15} />
                      </button>
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="w-9 h-9 rounded-full border border-violet-500/50 flex items-center justify-center bg-violet-500/5 text-violet-300 hover:text-white hover:bg-violet-500/20 hover:border-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all"
                        title="Maximize Player"
                      >
                        <Maximize2 size={15} />
                      </button>
                      <button
                        onClick={closePlayer}
                        className="w-9 h-9 rounded-full border border-violet-500/50 flex items-center justify-center bg-violet-500/5 text-violet-300 hover:text-danger hover:bg-danger/15 hover:border-danger/35 shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all"
                        title="Close Panel"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Variant Switcher (If multiple versions exist) */}
                  {activeAd.demoBuilds && activeAd.demoBuilds.length > 1 && (
                    <div className="mb-4 mt-4 bg-[#141720]/45 border border-violet-500/45 p-3 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.12)]">
                      <label className="text-[9px] text-violet-400/80 font-code block uppercase tracking-widest mb-1.5 font-bold">
                        Select Build Version / Variant ({activeAd.demoBuilds.length})
                      </label>
                      <select
                        value={activeBuildIndex}
                        onChange={(e) => {
                          const idx = parseInt(e.target.value);
                          setActiveBuildIndex(idx);
                        }}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#090a0f] border border-violet-500/50 text-xs text-text-secondary hover:text-white font-code outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-violet-400 font-semibold shadow-[0_0_15px_rgba(168,85,247,0.18)] cursor-pointer"
                      >
                        {activeAd.demoBuilds.map((build, i) => (
                          <option key={i} value={i}>
                            🎮 Version {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Description Content */}
                  <div className="space-y-4 flex-1 pr-1 overflow-y-auto mt-4">
                    <div className="flex flex-col items-center text-center py-4">
                      {/* Preview Image / Fallback */}
                      <div className="w-36 h-36 md:w-40 md:h-40 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-violet-500/70 shadow-[0_0_25px_rgba(168,85,247,0.45)] mb-6">
                        {activeAd.icon ? (
                          <img
                            src={activeAd.icon}
                            alt={activeAd.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${activeAd.coverColor}, ${activeAd.coverColorSecondary})`,
                            }}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
                            <div className="scale-150 mb-3">
                              {getCategorySvg(activeAd.category)}
                            </div>
                            <span className="text-2xl font-display font-black text-white/90 uppercase tracking-widest bg-black/35 px-2.5 py-1 rounded backdrop-blur-[2px] border border-white/5 select-none">
                              {activeAd.title.slice(0, 3)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Game Title */}
                      <div className="mb-1 text-center">
                        <h3 className="font-display font-black text-3xl md:text-4xl tracking-wider text-white uppercase drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                          {activeAd.title}
                        </h3>
                      </div>

                      {/* Sub-title decorator */}
                      <div className="flex items-center justify-center gap-3 w-full max-w-[280px] mx-auto mb-6 text-violet-400/80">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-violet-500/50" />
                        <span className="font-code text-[9px] uppercase tracking-[0.25em] font-bold">
                          • Playable Ads •
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-violet-500/50" />
                      </div>

                      {/* Badges / Tags */}
                      <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                        <span
                          style={{ backgroundColor: '#2c1d4d', color: '#e0bbfd', borderColor: '#6b47c2' }}
                          className="px-4 py-1.5 rounded-full text-xs font-code font-bold border shadow-md select-none"
                        >
                          {activeAd.engine}
                        </span>
                        <span
                          style={{ backgroundColor: '#2c1d4d', color: '#e0bbfd', borderColor: '#6b47c2' }}
                          className="px-4 py-1.5 rounded-full text-xs font-code font-bold border shadow-md select-none"
                        >
                          TypeScript
                        </span>
                        <span
                          style={{ backgroundColor: '#2c1d4d', color: '#e0bbfd', borderColor: '#6b47c2' }}
                          className="px-4 py-1.5 rounded-full text-xs font-code font-bold border shadow-md select-none"
                        >
                          2D
                        </span>
                      </div>

                      {/* Game Description */}
                      <p className="text-white font-display font-bold text-sm md:text-base leading-relaxed max-w-md mb-6">
                        {activeAd.description || 'Coming soon...'}
                      </p>


                    </div>
                  </div>

                  {/* App Store / Google Play Download Links */}
                  {(activeAd.googlePlay || activeAd.appStore) && (
                    <div className="mt-4 pt-3.5 border-t border-violet-500/35 flex flex-col sm:flex-row gap-3">
                      <a
                        href={activeAd.googlePlay || activeAd.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-between px-5 h-13 rounded-xl bg-[#090a0f] border border-violet-500/55 hover:border-violet-400 hover:bg-[#141720]/60 text-sm font-sans font-semibold text-white tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                              <path d="M3.25 1.77c-.15.2-.25.46-.25.79v18.88c0 .33.1.59.25.79l.06.06L13.9 12.7v-.23L3.31 1.71l-.06.06z" fill="#00F0FF" />
                              <path d="M17.43 16.32l-3.53-3.53v-.23l3.53-3.53.08.05 4.18 2.38c1.19.67 1.19 1.78 0 2.46l-4.18 2.38-.08.02z" fill="#FF3A44" />
                              <path d="M13.9 12.56L3.31 22.25c.39.41 1.02.46 1.73.06l12.4-7.05-3.54-3.54v-.23l.03-.02z" fill="#FFC107" />
                              <path d="M13.9 11.44l3.54-3.54L5.04 1.69c-.71-.4-1.34-.35-1.73.06L13.9 11.44z" fill="#00E676" />
                            </g>
                          </svg>
                          Google Play
                        </div>
                        <span className="text-violet-400/80 font-code font-bold text-sm select-none">&gt;</span>
                      </a>
                      <a
                        href={activeAd.appStore || activeAd.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-between px-5 h-13 rounded-xl bg-[#090a0f] border border-violet-500/55 hover:border-violet-400 hover:bg-[#141720]/60 text-sm font-sans font-semibold text-white tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 170 170">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.27-6.08-3.35-2.79-7.27-7.48-11.77-14.07-8.27-11.95-14.37-25.26-18.3-39.92-3.93-14.65-5.9-28.79-5.9-42.42 0-14.07 3.35-25.79 10.06-35.16 6.7-9.38 15.22-14.16 25.56-14.34 5.02 0 10.39 1.45 16.12 4.35 5.73 2.9 9.69 4.35 11.9 4.35 1.79 0 5.42-1.34 10.88-4.02 5.46-2.68 10.22-3.9 14.3-3.68 15.22.45 26.83 5.92 34.82 16.41-12.84 7.82-19.16 18.2-18.94 31.14.22 10.27 4.13 18.87 11.72 25.8 7.59 6.92 16.3 10.55 26.13 10.9-2.01 5.92-4.91 12.06-8.71 18.42zM120.3 35.16c0-7.82 2.79-15.02 8.37-21.6 5.58-6.59 12.39-10.4 20.43-11.45.11 1 .17 1.84.17 2.51 0 7.48-2.85 14.63-8.54 21.43-5.69 6.81-12.67 10.6-20.93 11.39-.33-.67-.5-1.45-.5-2.28z" />
                          </svg>
                          App Store
                        </div>
                        <span className="text-violet-400/80 font-code font-bold text-sm select-none">&gt;</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
