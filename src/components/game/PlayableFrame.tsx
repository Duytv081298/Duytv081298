'use client';

import { useEffect, useState, type SyntheticEvent } from 'react';
import { CheckCircle2, LoaderCircle, RotateCw } from 'lucide-react';
import StoreLink from './StoreLink';

type PlayableWindow = Window & {
  super_html?: { download: (...args: unknown[]) => unknown };
  mraid?: { open: (...args: unknown[]) => unknown };
  ExitApi?: { exit: () => void };
  FbPlayableAd?: { onCTAClick: () => void };
  dapi?: { openStoreUrl: () => void };
  openStore?: () => void;
};

interface PlayableFrameProps {
  src: string;
  title: string;
  googlePlay?: string;
  appStore?: string;
}

export default function PlayableFrame({ src, title, googlePlay, appStore }: PlayableFrameProps) {
  const [demoEnded, setDemoEnded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [loadState, setLoadState] = useState<'loading' | 'slow' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    if (loadState !== 'loading') return;
    const timer = setTimeout(() => setLoadState('slow'), 20000);
    return () => clearTimeout(timer);
  }, [loadState, reloadKey]);

  const restart = () => {
    setDemoEnded(false);
    setLoadState('loading');
    setReloadKey((key) => key + 1);
  };

  const connectStoreNotice = (event: SyntheticEvent<HTMLIFrameElement>) => {
    // iframe load only confirms the document loaded, not engine readiness.
    const gameDocument = event.currentTarget.contentDocument;
    if (!gameDocument || !gameDocument.querySelector('canvas')) {
      setLoadState('error');
      return;
    }
    setLoadState('loaded');
    const gameWindow = event.currentTarget.contentWindow as PlayableWindow | null;
    if (!gameWindow) return;

    // These demos use different ad SDKs. Handle their store CTA in the host
    // because sandboxed frames cannot open a store tab themselves.
    const showNotice = () => setDemoEnded(true);
    gameWindow.open = () => {
      showNotice();
      return null;
    };
    if (gameWindow.super_html) gameWindow.super_html.download = showNotice;
    if (gameWindow.mraid) gameWindow.mraid.open = showNotice;
    if (gameWindow.ExitApi) gameWindow.ExitApi.exit = showNotice;
    if (gameWindow.FbPlayableAd) gameWindow.FbPlayableAd.onCTAClick = showNotice;
    if (gameWindow.dapi) gameWindow.dapi.openStoreUrl = showNotice;
    if (gameWindow.openStore) gameWindow.openStore = showNotice;
  };

  return (
    <div className="relative h-full w-full">
      <iframe
        key={reloadKey}
        src={src}
        onLoad={connectStoreNotice}
        onError={() => setLoadState('error')}
        className="block h-full w-full border-0"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        title={`Play ${title}`}
        allow="autoplay"
        inert={demoEnded}
      />
      {loadState !== 'loaded' && !demoEnded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#07090e]/95 p-5 text-center" role="status" aria-live="polite">
          {loadState === 'loading' && <LoaderCircle className="animate-spin text-violet-300" size={28} aria-hidden="true" />}
          <p className="text-sm font-semibold text-white">
            {loadState === 'error' ? 'Unable to load this demo' : loadState === 'slow' ? 'This demo is taking longer to load' : 'Loading demo…'}
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-text-secondary">
            {loadState === 'loading' ? 'Preparing your playable demo. Please wait.' : 'Check your connection and try again, or choose another game.'}
          </p>
          {loadState !== 'loading' && (
            <button type="button" onClick={restart} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-violet-400/50 px-4 py-2 text-sm text-white hover:bg-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
              <RotateCw size={14} aria-hidden="true" /> Try again
            </button>
          )}
        </div>
      )}
      {demoEnded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto bg-[#07090e]/95 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-sm rounded-2xl border border-violet-400/40 bg-[#141720] p-5 text-center shadow-2xl sm:p-6">
            <div role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto mb-3 text-violet-300" size={32} aria-hidden="true" />
              <h4 className="font-display text-xl font-bold text-white">Demo complete!</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                You’ve reached the end of this playable demo. {googlePlay || appStore ? 'Get the full game from the store to keep playing.' : 'You can play again using the button below.'}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-violet-200">
                {googlePlay || appStore ? 'Available store links open in a new tab. Dimmed buttons have no link yet.' : 'Store links are not available for this game yet.'}
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {[
                { label: 'Google Play', url: googlePlay },
                { label: 'App Store', url: appStore },
              ].map((store) => (
                <StoreLink
                  key={store.label}
                  href={store.url}
                  label={store.label}
                />
              ))}
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                <RotateCw size={14} aria-hidden="true" /> Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
