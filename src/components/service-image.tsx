"use client";

import { useState } from "react";
import Image from "next/image";

import type { CardImage } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceImageProps = {
  image?: CardImage;
  alt?: string;
  /** CSS aspect-ratio utility, e.g. "aspect-[16/10]" or "aspect-[4/3]". */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Image wrapper for category cards, service cards, and the detail hero.
 *
 * Falls back to a neutral tile with a tooth icon when `src` is missing or fails
 * to load, so a card never renders a broken image or stray alt text.
 */
export function ServiceImage({
  image,
  alt,
  ratio = "aspect-[4/3]",
  sizes,
  priority = false,
  className,
  imgClassName,
}: ServiceImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !image?.src || failed;
  const label = image?.alt ?? alt ?? "";

  const objectPosition = image?.focus ?? "center";

  return (
    <div className={cn("relative overflow-hidden bg-surface", ratio, className)}>
      {showFallback ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-surface"
          role="img"
          aria-label={label}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-1/3 w-1/3 max-h-12 max-w-12 text-primary/30"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5.5c-1.6-1.2-4.2-1.4-5.6.4-1.2 1.5-.8 3.7-.3 5.4.4 1.4.5 2.7.6 4.1.1 1.2.3 2.4.9 3.3.5.8 1.4 1.3 2.3 1.1.9-.2 1.3-1.1 1.5-2 .2-1 .4-2 1.6-2s1.4 1 1.6 2c.2.9.6 1.8 1.5 2 .9.2 1.8-.3 2.3-1.1.6-.9.8-2.1.9-3.3.1-1.4.2-2.7.6-4.1.5-1.7.9-3.9-.3-5.4-1.4-1.8-4-1.6-5.6-.4Z" />
          </svg>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}