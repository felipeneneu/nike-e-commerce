// src/components/SessionBanner.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Nike-ish palette & type scale (approx. from nike.com)
 * - Text primary: #111111
 * - Text muted:  #707072
 * - Background:  #ffffff
 * - Accent / CTA: black button, white text
 * - Font: use system sans stack close to Nike's (Helvetica/Arial)
 *
 * Tailwind config should ensure `font-sans` is the app default.
 */

export type BannerItem = {
  /** Path to an image placed under `public/` */
  imageSrc: string;
  /** Accessible alt text for the image */
  imageAlt: string;
  /** Main heading (e.g., "React Presto") */
  title: string;
  /** Optional kicker/subtitle (e.g., "Trending Now") */
  kicker?: string;
  /** Optional supporting description */
  description?: string;
  /** CTA label (e.g., "Shop Now") */
  ctaLabel?: string;
  /** Optional href for the CTA */
  href?: string;
  /** Optional dark overlay intensity (0–100). Default: 35 */
  overlay?: number;
};

export interface SessionBannerProps extends React.HTMLAttributes<HTMLElement> {
  /** Large hero banner shown on top */
  hero: BannerItem;
  /** Exactly two items for the secondary row */
  secondary: [BannerItem, BannerItem];
  /** Optional aria-label for the section landmark */
  ariaLabel?: string;
}

/**
 * Small reusable banner card
 */
function BannerCard({
  item,
  variant = 'small',
  className,
}: {
  item: BannerItem;
  variant?: 'small' | 'large';
  className?: string;
}) {
  const overlay = Math.max(0, Math.min(item.overlay ?? 35, 100));
  const isLarge = variant === 'large';

  return (
    <article
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl',
        // subtle shadow similar to nike tiles
        'shadow-[0_2px_20px_rgba(0,0,0,0.08)]',
        // maintain aspect ratio
        isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]',
        className
      )}
    >
      <Image
        alt={item.imageAlt}
        className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
        fill
        priority={isLarge}
        sizes={
          isLarge
            ? '(min-width:1024px) 1200px, 100vw'
            : '(min-width:1024px) 600px, 100vw'
        }
        src={item.imageSrc}
      />
      {/* dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay / 100})` }}
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex h-full flex-col text-white',
          isLarge
            ? 'justify-start p-6 sm:p-8 lg:p-10'
            : 'justify-end p-4 sm:p-5'
        )}
      >
        {item.kicker ? (
          <p className="mb-1 font-semibold text-white/80 text-xs uppercase tracking-[0.12em]">
            {item.kicker}
          </p>
        ) : null}

        <h3
          className={cn(
            'font-extrabold leading-tight',
            isLarge ? 'text-3xl sm:text-4xl lg:text-6xl' : 'text-xl sm:text-2xl'
          )}
        >
          {item.title}
        </h3>

        {item.description ? (
          <p
            className={cn(
              'mt-2 max-w-prose text-sm sm:text-base',
              'text-white/90'
            )}
          >
            {item.description}
          </p>
        ) : null}

        {item.ctaLabel ? (
          item.href ? (
            <Button
              asChild
              className={cn(
                'mt-4 w-fit rounded-full bg-black text-white hover:bg-black/90',
                'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
              )}
              size={isLarge ? 'lg' : 'sm'}
            >
              <Link aria-label={item.ctaLabel} href={item.href}>
                {item.ctaLabel}
              </Link>
            </Button>
          ) : (
            <Button
              aria-label={item.ctaLabel}
              className={cn(
                'mt-4 w-fit rounded-full bg-black text-white hover:bg-black/90',
                'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
              )}
              size={isLarge ? 'lg' : 'sm'}
              type="button"
            >
              {item.ctaLabel}
            </Button>
          )
        ) : null}
      </div>
    </article>
  );
}

/**
 * SessionBanner
 * - 1 large hero banner
 * - 2 small banners below
 * - Mobile first, responsive, accessible
 */
export function SessionBanner({
  hero,
  secondary,
  ariaLabel = 'Trending Now',
  className,
  ...props
}: SessionBannerProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn('w-full', className)}
      {...props}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Kicker / optional section title slot (screen-reader friendly) */}
        <h2 className="sr-only">{ariaLabel}</h2>

        {/* HERO */}
        <BannerCard className="mb-4 sm:mb-6" item={hero} variant="large" />

        {/* SECONDARY GRID */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <BannerCard item={secondary[0]} />
          <BannerCard item={secondary[1]} />
        </div>
      </div>
    </section>
  );
}

export default SessionBanner;
