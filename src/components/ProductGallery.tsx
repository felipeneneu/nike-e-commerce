'use client';

import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { cn } from '@/lib/utils';

type ImageT = { src: string; alt: string };
export type Variant = {
  id: string;
  name: string;
  colorHex: string;
  images: ImageT[];
};

interface Props {
  variants: Variant[];
  /** ex.: “Highly Rated” */
  badgeLabel?: string;
}

/** Carrega apenas imagens válidas para não quebrar a galeria */
async function preloadValid(images: ImageT[]): Promise<ImageT[]> {
  const checks = await Promise.all(
    images.map(
      (img) =>
        new Promise<ImageT | null>((resolve) => {
          const probe = new globalThis.Image();
          probe.onload = () => resolve(img);
          probe.onerror = () => resolve(null);
          probe.src = img.src;
        })
    )
  );
  return checks.filter(Boolean) as ImageT[];
}

export default function ProductGallery({ variants, badgeLabel }: Props) {
  const [activeVar, setActiveVar] = React.useState(0);
  const [valid, setValid] = React.useState<ImageT[]>([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    preloadValid(variants[activeVar]?.images ?? []).then((imgs) => {
      if (!mounted) return;
      setValid(imgs);
      setIndex(0);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [activeVar, variants]);

  const next = () =>
    setIndex((i) => Math.min(i + 1, Math.max(valid.length - 1, 0)));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="w-full">
      {/* Layout: thumbs verticais + stage */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[84px_minmax(84px,_1fr)_100px] lg:gap-2">
        {/* Thumbs (desktop) */}
        <div className="hidden lg:block lg:w-[84px]">
          <ul className="flex w-[84px] flex-col gap-3">
            {valid.map((img, i) => (
              <li key={`${img.src}-${i}`}>
                <button
                  aria-label={`Show image ${i + 1}`}
                  className={cn(
                    'relative aspect-square w-full overflow-hidden rounded-lg border bg-white',
                    i === index
                      ? 'border-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  )}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    alt={img.alt}
                    className="object-cover"
                    fill
                    priority={i === 0}
                    sizes="84px"
                    src={img.src}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stage */}
        <div className="relative col-span-2 overflow-hidden rounded-[18px] bg-[#f5f5f5]">
          {/* selo */}
          {badgeLabel && (
            <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-semibold text-xs shadow">
              <span className="inline-block h-2 w-2 rounded-full bg-black" />
              {badgeLabel}
            </span>
          )}

          {/* frame com altura controlada para evitar blur/upscale */}
          <div className="relative mx-auto h-[380px] w-full sm:h-[420px] md:h-[460px] lg:h-[560px]">
            {loading ? (
              <div className="absolute inset-0 animate-pulse rounded-[18px] bg-neutral-200" />
            ) : valid.length ? (
              <Image
                alt={valid[index].alt}
                className="object-contain"
                fill
                key={`${valid[index].src}-${index}`}
                priority
                quality={90}
                sizes="(min-width:1280px) 820px, (min-width:1024px) 620px, (min-width:640px) 92vw, 92vw"
                src={valid[index].src}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-500">
                <ImageOff className="h-10 w-10" />
              </div>
            )}
          </div>

          {/* setas no canto inferior-direito */}
          {valid.length > 1 && (
            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              <button
                aria-label="Previous image"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                onClick={prev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thumbs horizontais (mobile) */}
      <div className="mt-3 lg:hidden">
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {valid.map((img, i) => (
            <li className="shrink-0" key={`${img.src}-${i}`}>
              <button
                aria-label={`Show image ${i + 1}`}
                className={cn(
                  'relative aspect-square w-20 overflow-hidden rounded-lg border bg-white',
                  i === index ? 'border-black' : 'border-neutral-200'
                )}
                onClick={() => setIndex(i)}
              >
                <Image
                  alt={img.alt}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={img.src}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Swatches por variante (miniaturas da 1ª imagem de cada variante) */}
    </div>
  );
}
