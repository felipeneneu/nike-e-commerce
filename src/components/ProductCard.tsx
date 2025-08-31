'use client';

import { HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export type BadgeVariant = 'best' | 'extra' | 'sustainable' | undefined;

export interface ProductCardProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  name: string;
  genderLabel: string; // ex: "Men's Shoes"
  colourCountLabel: string; // ex: "6 Colour"
  price: number;
  image: string; // path from /public/store
  badgeLabel?: string;
  badgeVariant?: BadgeVariant;
  wishIcon?: boolean;
  href?: string;
}

const badgeStyles: Record<Exclude<BadgeVariant, undefined>, string> = {
  best: 'bg-[#FFEFE5] text-[#FF3B00]',
  extra: 'bg-[#EAF9EE] text-[#29A757]',
  sustainable: 'bg-[#ECF7F3] text-[#1A7F61]',
};

export default function ProductCard({
  id,
  name,
  genderLabel,
  colourCountLabel,
  price,
  image,
  badgeLabel,
  badgeVariant,
  wishIcon = true,
  href, // <<<<< novo
  className,
  ...props
}: ProductCardProps) {
  return (
    <li
      className={cn(
        'group relative cursor-pointer bg-white transition-shadow',
        className
      )}
      {...props}
    >
      {/* overlay clicável quando href existe */}
      {href ? (
        <Link
          aria-label={`View details of ${name}`}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          href={href}
        />
      ) : null}
      <div className="relative isolate overflow-hidden bg-[#f5f5f5]">
        {badgeLabel && badgeVariant ? (
          <span
            className={cn(
              'absolute top-3 left-3 z-30 rounded-full px-2.5 py-1 font-semibold text-[11px]',
              badgeStyles[badgeVariant]
            )}
          >
            {badgeLabel}
          </span>
        ) : null}

        {wishIcon && (
          <Button
            aria-label="Add to favorites"
            className="absolute top-3 right-3 z-40 rounded-full p-1 text-neutral-500 hover:bg-white/70"
          >
            <HeartIcon />
          </Button>
        )}

        <div className="relative mx-auto aspect-[4/3] w-full">
          <Image
            alt={name}
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            src={image}
          />
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-0.5 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-medium text-[15px] sm:text-base">
            {name}
          </h3>
          <p className="shrink-0 font-medium text-[15px] sm:text-base">
            ${price.toFixed(2)}
          </p>
        </div>
        <p className="text-neutral-600 text-sm">{genderLabel}</p>
        <p className="mt-1 text-neutral-600 text-sm">{colourCountLabel}</p>
      </div>
    </li>
  );
}
