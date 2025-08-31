// src/components/SessionBannerFooter.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Nike-like banner footer with text (left) and PNG image (right).
 * - Mobile-first, responsive
 * - Uses shadcn/ui Button
 * - Reads image from /public
 */

type CTA = {
  label: string;
  href?: string;
  'aria-label'?: string;
};

export interface SessionBannerFooterProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Small overline text (ex: "Bold & Sporty") */
  kicker?: string;
  /** Bold headline (supports a line-break with <br/>) */
  title: React.ReactNode;
  /** Supporting copy */
  description?: string;
  /** Primary call-to-action */
  cta?: CTA;
  /** Path to PNG under /public (transparent background recommended) */
  imageSrc: string;
  /** Alt text for the PNG image */
  imageAlt: string;
  /** Optional diagonal accent color (defaults to Nike-style orange) */
  accentColor?: string;
  /** Section accessible label */
  ariaLabel?: string;
}

export default function SessionBannerFooter({
  kicker,
  title,
  description,
  cta,
  imageSrc,
  imageAlt,
  accentColor = '#ffa15c', // close to Nike orange used in the reference
  ariaLabel = 'Featured',
  className,
  ...props
}: SessionBannerFooterProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        'relative w-full overflow-hidden bg-white text-[#111]',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 py-10 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
          {/* LEFT: TEXT */}
          <div>
            {kicker ? (
              <p className="mb-2 font-semibold text-[#e21f26] text-sm tracking-wide">
                {kicker}
              </p>
            ) : null}

            <h2 className="font-extrabold text-3xl leading-[1.05] sm:text-4xl lg:text-6xl">
              {title}
            </h2>

            {description ? (
              <p className="mt-4 max-w-prose text-[#707072] text-[15px] leading-6 sm:text-base">
                {description}
              </p>
            ) : null}

            {cta?.label ? (
              cta.href ? (
                <Button
                  asChild
                  className="mt-6 rounded-full bg-black px-6 text-white hover:bg-black/90"
                  size="lg"
                >
                  <Link
                    aria-label={cta['aria-label'] ?? cta.label}
                    href={cta.href}
                  >
                    {cta.label}
                  </Link>
                </Button>
              ) : (
                <Button
                  aria-label={cta['aria-label'] ?? cta.label}
                  className="mt-6 rounded-full bg-black px-6 text-white hover:bg-black/90"
                  size="lg"
                >
                  {cta.label}
                </Button>
              )
            ) : null}
          </div>

          {/* RIGHT: IMAGE with diagonal accent */}
          <div className="relative">
            <div className="relative z-10 mx-auto w-[88%] sm:w-[75%] lg:w-full">
              <Image
                alt={imageAlt}
                className="h-auto w-full object-contain"
                height={520}
                priority
                src={imageSrc}
                width={920}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
