'use client';

import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  defaultOpen?: boolean;
  right?: React.ReactNode; // conteúdo à direita do título (ex: estrelas)
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  right,
  children,
}: Props) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <section className="py-4">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between py-1 text-left"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="font-semibold text-[15px]">{title}</span>
        <span className="inline-flex items-center gap-2 text-neutral-600">
          {right}
          <ChevronDown
            className={cn('h-5 w-5 transition-transform', open && 'rotate-180')}
          />
        </span>
      </button>
      <div
        className={cn(
          'grid transition-all',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden pt-3">{children}</div>
      </div>
    </section>
  );
}
