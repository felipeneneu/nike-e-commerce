import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CollapsibleSection from '@/components/CollapsibleSection';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import SizePicker from '@/components/SizePicker';
import { getProductById, getSuggestedProducts } from '@/lib/mocks/products';

export const metadata: Metadata = {
  title: 'Product — Nike Styled',
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10">
        <h1 className="font-bold text-2xl">Product not found</h1>
        <p className="mt-2 text-neutral-600">
          The product you’re looking for doesn’t exist.{' '}
          <Link className="underline" href="/products">
            Back to products
          </Link>
          .
        </p>
      </main>
    );
  }

  const hasDiscount =
    typeof product.compareAtPrice === 'number' &&
    product.compareAtPrice > product.price;

  const also = getSuggestedProducts(product.id, 3);

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      {/* TOP */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProductGallery
            badgeLabel="Highly Rated"
            variants={product.variants}
          />
        </div>

        <aside className="lg:col-span-5">
          <header>
            <h1 className="font-extrabold text-2xl sm:text-3xl">
              {product.title}
            </h1>
            <p className="mt-1 text-neutral-600 text-sm">{product.subtitle}</p>

            <div className="mt-4">
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-xl">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-neutral-500 line-through">
                      ${product.compareAtPrice?.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-700 text-xs">
                      Save{' '}
                      {Math.round(
                        100 -
                          (product.price / (product.compareAtPrice ?? 1)) * 100
                      )}
                      %
                    </span>
                  </>
                )}
              </div>
              {product.promo && (
                <p className="mt-1 font-medium text-[#29A757] text-xs">
                  {product.promo}
                </p>
              )}
            </div>
          </header>

          {/* swatches ficam na própria galeria; agora vem o size picker */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-sm">Select Size</span>
              <button className="text-neutral-600 text-sm underline">
                Size Guide
              </button>
            </div>
            <SizePicker
              disabled={['10.5', '11', '11.5', '12']}
              sizes={[
                '5',
                '5.5',
                '6',
                '6.5',
                '7',
                '7.5',
                '8',
                '8.5',
                '9',
                '9.5',
                '10',
                '10.5',
                '11',
                '11.5',
                '12',
              ]}
            />
          </div>

          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <button className="w-full rounded-full bg-black px-6 py-4 text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
              <span className="inline-flex items-center gap-2 font-semibold text-[15px]">
                <ShoppingBag className="h-5 w-5" />
                Add to Bag
              </span>
            </button>
            <button className="w-full rounded-full border px-6 py-4 hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
              <span className="inline-flex items-center gap-2 font-semibold text-[15px]">
                <Heart className="h-5 w-5" />
                Favorite
              </span>
            </button>
          </div>

          {/* Collapsibles */}
          <div className="mt-8 divide-y">
            <CollapsibleSection defaultOpen title="Product Details">
              <div className="space-y-3 text-neutral-700 text-sm">
                {product.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <ul className="mt-2 list-disc pl-5">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Shipping & Returns">
              <p className="text-neutral-700 text-sm">
                Free standard shipping on orders over $100. Free 30-day returns.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              right={
                <div className="inline-flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star className="h-4 w-4 fill-black text-black" key={i} />
                  ))}
                </div>
              }
              title="Reviews (10)"
            >
              <p className="text-neutral-700 text-sm">
                Reviews UI not implemented in this demo.
              </p>
            </CollapsibleSection>
          </div>
        </aside>
      </section>

      {/* YOU MIGHT ALSO LIKE */}
      <section className="mt-12">
        <h2 className="mb-4 font-extrabold text-lg">You Might Also Like</h2>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {also.map((p) => (
            <Link href={`/products/${p.id}`} key={p.id}>
              <ProductCard
                badgeLabel={p.card?.badge?.label}
                badgeVariant={p.card?.badge?.variant as any}
                colourCountLabel={p.card?.colourCountLabel ?? '1 Colour'}
                genderLabel={p.card?.genderLabel ?? p.subtitle}
                id={p.id}
                image={p.card?.image ?? p.variants[0]?.images[0]?.src ?? ''}
                name={p.title}
                price={p.price}
              />
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
