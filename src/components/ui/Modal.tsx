'use client';

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};

/** Native modal semantics provide focus containment, inert background and Escape. */
export default function Modal({ open, onClose, label, children, returnFocus }: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  returnFocus?: RefObject<HTMLElement | null>;
}) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!mounted || !open || !dialog) return;
    const previousFocus = returnFocus?.current ?? document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [mounted, open, returnFocus]);

  if (!mounted || !open) return null;
  return createPortal(
    <dialog ref={ref} aria-label={label} aria-modal="true" className="portfolio-modal"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {children}
    </dialog>, document.body,
  );
}
