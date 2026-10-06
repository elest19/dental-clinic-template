"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { privacyDoc, termsDoc, type LegalDoc } from "@/content/legal";

const docs = {
  terms: termsDoc,
  privacy: privacyDoc,
} satisfies Record<string, LegalDoc>;

export type LegalDocKey = keyof typeof docs;

export function LegalModal({ doc, onClose }: { doc: LegalDocKey | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!doc) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      previouslyFocused?.focus?.();
    };
  }, [doc, onClose]);

  if (!doc) return null;

  const content = docs[doc];

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <div aria-hidden="true" className="absolute inset-0 bg-foreground/60" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-card"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
          <div>
            <h2 id="legal-dialog-title" className="font-display text-3xl text-foreground">
              {content.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{content.updated}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${content.title}`}
            className="rounded-[var(--radius-sm)] border border-border p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* data-lenis-prevent lets the modal scroll natively under Lenis smooth scroll. */}
        <div data-lenis-prevent className="overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-base leading-relaxed text-muted-foreground">{content.intro}</p>
          <div className="mt-6">
            {content.sections.map((section) => (
              <section key={section.heading} className="border-t border-border py-6">
                <h3 className="font-display text-2xl text-foreground">{section.heading}</h3>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
