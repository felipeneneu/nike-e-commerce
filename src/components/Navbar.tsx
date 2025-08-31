'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Men', href: '/products?gender=men' },
  { label: 'Women', href: '/products?gender=women' },
  { label: 'Kids', href: '/products?gender=unisex' },
  { label: 'Collections', href: '/collections' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link aria-label="Nike Home" className="flex items-center" href="/">
          <Image
            alt="Nike"
            className="invert"
            height={28}
            priority
            src="/logo.svg"
            width={28}
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
                href={l.href}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <button className="text-body text-dark-900 transition-colors hover:text-dark-700">
            Search
          </button>
          <button className="text-body text-dark-900 transition-colors hover:text-dark-700">
            My Cart (2)
          </button>
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <Menu />
        </button>
      </nav>

      <div
        className={`border-light-300 border-t md:hidden ${open ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <ul className="space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center justify-between pt-2">
            <button className="text-body">Search</button>
            <button className="text-body">My Cart (2)</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
