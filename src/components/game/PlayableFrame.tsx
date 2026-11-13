'use client';

import { useState, type SyntheticEvent } from 'react';
import { CheckCircle2, ExternalLink, RotateCw } from 'lucide-react';

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

  const connectStoreNotice = (event: SyntheticEvent<HTMLIFrameElement>) => {
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
        className="block h-full w-full border-0"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
        title={`Play ${title}`}
        allow="autoplay"
        inert={demoEnded}
      />
      {demoEnded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto bg-[#07090e]/95 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-sm rounded-2xl border border-violet-400/40 bg-[#141720] p-5 text-center shadow-2xl sm:p-6">
            <div role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto mb-3 text-violet-300" size={32} aria-hidden="true" />
              <h4 className="font-display text-xl font-bold text-white">Demo complete!</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                You’ve reached the end of this playable demo. Get the full game from the store to keep playing.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-violet-200">
                Store pages can’t open inside this player. Use the buttons below to open a new tab.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {[
                { label: 'Google Play', url: googlePlay },
                { label: 'App Store', url: appStore },
              ].filter((store) => store.url).map((store) => (
                <a
                  key={store.label}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-violet-400/50 bg-violet-500/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                >
                  {store.label} <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setDemoEnded(false);
                  setReloadKey((key) => key + 1);
                }}
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
