"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { clinicImages } from "@/content/images";
import { siteConfig } from "@/content/site";

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShowVideo(!query.matches);
    const onChange = (event: MediaQueryListEvent) => setShowVideo(!event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const video = siteConfig.heroVideo;

  return (
    <section id="home" className="hero-svh relative isolate flex flex-col overflow-hidden bg-foreground">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        {video && showVideo ? (
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: clinicImages.hero.focus }}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          <Image
            src={clinicImages.hero.src}
            alt={clinicImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: clinicImages.hero.focus }}
          />
        )}

        {/* Navy scrim, heaviest behind the text column */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/65 to-foreground/40"
        />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-12 pt-[calc(var(--navbar-h)+2rem)] sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#e2f0f5]">
            {siteConfig.heroNote}
          </p>

          <h1 className="mt-5 text-balance font-display text-5xl leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.2rem]">
            Confident Smiles Start <span className="font-display italic">Here.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#e2f0f5]">
            {siteConfig.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-accent text-foreground hover:bg-accent/90 focus-visible:ring-offset-0"
            >
              <Link href="/#book">Book an Appointment</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:ring-white focus-visible:ring-offset-0"
            >
              <Link href="/#services">Explore Our Services</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-[#d6e6ee]">{siteConfig.availabilityNote}</p>
        </motion.div>
      </div>
    </section>
  );
}