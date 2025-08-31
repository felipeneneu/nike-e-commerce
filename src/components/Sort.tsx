'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { setScalarInQuery } from '@/lib/utils/query';

const OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'price_asc', label: 'Price: Low → High' },
];

export default function Sort() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('sort') ?? 'featured';

  const onChange = (value: string) => {
    const nextUrl = setScalarInQuery(
      pathname,
      '?' + searchParams.toString(),
      'sort',
      value
    );
    // Reset page is handled in util; perform shallow push
    router.push(nextUrl, { scroll: false });
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-neutral-600">Sort By</span>
      <select
        aria-label="Sort products"
        className="rounded-full border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        onChange={(e) => onChange(e.target.value)}
        value={selected}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
