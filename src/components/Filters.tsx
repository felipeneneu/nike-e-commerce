'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  clearAllFilters,
  parseQuery,
  toggleValueInQuery,
} from '@/lib/utils/query';

const GENDER = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
];
const SIZES = ['6', '7', '8', '9', '10', '11', '12'].map((s) => ({
  value: s,
  label: s,
}));
const COLORS = ['black', 'white', 'red', 'blue', 'green', 'grey'].map((c) => ({
  value: c,
  label: c[0].toUpperCase() + c.slice(1),
}));
const PRICE = [
  { value: '25-50', label: '$25–$50' },
  { value: '50-100', label: '$50–$100' },
  { value: '100-150', label: '$100–$150' },
  { value: '150+', label: 'Over $150' },
];

type GroupKey = 'gender' | 'size' | 'color' | 'price';
const GROUPS: {
  key: GroupKey;
  name: string;
  options: { value: string; label: string }[];
}[] = [
  { key: 'gender', name: 'Gender', options: GENDER },
  { key: 'size', name: 'Size', options: SIZES },
  { key: 'color', name: 'Color', options: COLORS },
  { key: 'price', name: 'Shop By Price', options: PRICE },
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = React.useMemo(
    () => parseQuery(searchParams.toString()),
    [searchParams]
  );
  const [open, setOpen] = React.useState(false);

  // lock scroll when drawer is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onToggle = (key: GroupKey, value: string) => {
    const nextUrl = toggleValueInQuery(
      pathname,
      '?' + searchParams.toString(),
      key,
      value
    );
    router.push(nextUrl, { scroll: false });
  };

  const onClearAll = () => {
    const nextUrl = clearAllFilters(pathname, '?' + searchParams.toString());
    router.push(nextUrl, { scroll: false });
  };

  const isChecked = (key: GroupKey, value: string) => {
    const arr = (state as any)[key] as string[] | undefined;
    return !!arr?.includes(value);
  };

  const Panel = (
    <div className="h-full w-full max-w-xs overflow-y-auto bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button
          className="cursor-pointer text-sm underline"
          onClick={onClearAll}
          variant="ghost"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {GROUPS.map((group) => (
          <fieldset className="border-t pt-4" key={group.key}>
            <legend className="mb-3 block pr-2 font-semibold text-sm">
              {group.name}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {group.options.map((opt) => {
                const id = `${group.key}-${opt.value}`;
                const checked = isChecked(group.key, opt.value);
                return (
                  <label
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm',
                      checked
                        ? 'border-black'
                        : 'border-neutral-300 hover:border-neutral-400'
                    )}
                    htmlFor={id}
                    key={opt.value}
                  >
                    <input
                      aria-checked={checked}
                      checked={checked}
                      className="peer sr-only"
                      id={id}
                      onChange={() => onToggle(group.key, opt.value)}
                      type="checkbox"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{Panel}</div>

      {/* Mobile trigger */}
      <div className="mb-3 lg:hidden">
        <Button
          aria-expanded={open}
          aria-haspopup="dialog"
          className="rounded-full"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          Show Filters
        </Button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[100] flex lg:hidden"
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          role="dialog"
        >
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            type="button"
          />
          <div className="slide-in-from-left relative ml-0 h-full w-[88%] max-w-sm animate-in bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-semibold text-base">Filters</h3>
              <button
                aria-label="Close"
                className="text-sm underline"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            {Panel}
            <div className="h-6" />
          </div>
        </div>
      )}
    </>
  );
}
