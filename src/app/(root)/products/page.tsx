import type { Metadata } from 'next';
import Link from 'next/link';
import qs from 'query-string';
import AppBreadcrumb from '@/components/AppBreadcrumb';
import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import Sort from '@/components/Sort';
import { PRODUCTS, type Product } from '@/lib/mocks/products';
import {
  buildUrl,
  parseQuery,
  QS_OPTS,
  removeFromQuery,
} from '@/lib/utils/query';

export const metadata: Metadata = {
  title: 'Products — Nike Styled',
};

type SP = { [key: string]: string | string[] | undefined };
function normalizeSP(sp: SP | Promise<SP>): Promise<SP> {
  return sp instanceof Promise ? sp : Promise.resolve(sp);
}

function inPriceRanges(price: number, ranges: string[]) {
  if (!ranges.length) return true;
  return ranges.some((r) => {
    if (r.endsWith('+')) return price >= Number(r.replace('+', ''));
    const [min, max] = r.split('-').map(Number);
    return price >= min && price <= max;
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SP | Promise<SP>;
}) {
  const sp = await normalizeSP(searchParams);
  const queryStr = qs.stringify(sp, QS_OPTS);
  const q = parseQuery(queryStr);

  // Filtering (server-side) sobre o mock centralizado
  let results: Product[] = PRODUCTS.filter((p) => {
    const genderOk =
      !q.gender?.length || q.gender.some((g) => p.gender.includes(g as any));
    const sizeOk = !q.size?.length || q.size.some((s) => p.sizes.includes(s));
    const colorOk =
      !q.color?.length || q.color.some((c) => p.colors.includes(c));
    const priceOk = !q.price?.length || inPriceRanges(p.price, q.price);
    return genderOk && sizeOk && colorOk && priceOk;
  });

  // Sorting (server-side)
  switch (q.sort) {
    case 'price_desc':
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case 'price_asc':
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case 'newest':
      results = [...results].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      break;
    case 'featured':
    default:
      results = [...results].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
  }

  // Chips ativos
  const chips: {
    key: 'gender' | 'size' | 'color' | 'price';
    value: string;
    label: string;
  }[] = [];
  (q.gender || []).forEach((v) =>
    chips.push({
      key: 'gender',
      value: v,
      label: v[0].toUpperCase() + v.slice(1),
    })
  );
  (q.size || []).forEach((v) =>
    chips.push({ key: 'size', value: v, label: `Size ${v}` })
  );
  (q.color || []).forEach((v) =>
    chips.push({
      key: 'color',
      value: v,
      label: v[0].toUpperCase() + v.slice(1),
    })
  );
  (q.price || []).forEach((v) =>
    chips.push({
      key: 'price',
      value: v,
      label: v.replace('-', '–').replace('+', '+'),
    })
  );

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
      <header className="mb-5 flex items-center justify-between">
        <div className="flex flex-col">
          <AppBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products' }, // atual
            ]}
          />
          <h1 className="font-extrabold text-[22px] sm:text-[28px]">
            Produtos Desconto (5654)
          </h1>
        </div>

        <Sort />
      </header>

      {/* layout: sidebar à esquerda só em lg↑; mobile usa drawer */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <aside className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <Filters />
        </aside>

        {/* no mobile, o botão "Show Filters" vem do próprio componente */}
        <div className="lg:hidden">
          <Filters />
        </div>

        <section aria-label="Products" className="min-w-0 lg:col-span-9">
          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {chips.map((chip) => {
                const href = removeFromQuery(
                  '/products',
                  '?' + queryStr,
                  chip.key,
                  chip.value
                );
                return (
                  <Link
                    className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm hover:border-black"
                    href={href}
                    key={`${chip.key}-${chip.value}`}
                    scroll={false}
                  >
                    <span>{chip.label}</span>
                    <span
                      aria-hidden
                      className="text-neutral-500 group-hover:text-black"
                    >
                      ×
                    </span>
                  </Link>
                );
              })}
              <Link
                className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1.5 text-sm hover:border-black"
                href={buildUrl('/products', { sort: q.sort })}
                scroll={false}
              >
                Clear all
              </Link>
            </div>
          )}

          {results.length === 0 ? (
            <div className="rounded-2xl border p-10 text-center">
              <p className="font-semibold text-lg">
                No products match your filters.
              </p>
              <p className="text-neutral-600 text-sm">
                Try adjusting or clearing filters.
              </p>
            </div>
          ) : (
            // 1 col (mobile) → 2 (sm) → 3 (lg)
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard
                  badgeLabel={p.card?.badge?.label}
                  badgeVariant={p.card?.badge?.variant as any}
                  colourCountLabel={p.card?.colourCountLabel ?? '1 Colour'}
                  genderLabel={p.card?.genderLabel ?? p.subtitle}
                  href={`/products/${p.id}`}
                  id={p.id}
                  image={p.card?.image ?? p.variants[0]?.images[0]?.src ?? ''}
                  key={p.id}
                  name={p.title}
                  price={p.price}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
