'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  sizes: string[];
  disabled?: string[];
}

export default function SizePicker({ sizes, disabled = [] }: Props) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    // grade fiel à referência: 8 col no desktop, 6 no tablet, 4 no mobile
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
      {sizes.map((s) => {
        const isDisabled = disabled.includes(s);
        const selected = active === s;
        return (
          <button
            aria-pressed={selected}
            className={cn(
              'h-10 rounded-md border font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
              isDisabled
                ? 'cursor-not-allowed border-neutral-200 text-neutral-400'
                : selected
                  ? 'border-black'
                  : 'border-neutral-300 hover:border-neutral-500'
            )}
            disabled={isDisabled}
            key={s}
            onClick={() => !isDisabled && setActive(s)}
            type="button"
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
