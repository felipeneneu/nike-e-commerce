import Link from 'next/link';
import Card from '@/components/Card';
import { products } from '@/constants';

type PopularProductsProps = {
  title?: string;
};

const PopularProducts = ({ title }: PopularProductsProps) => {
  return (
    <section className="max-container max-sm:mt-12" id="products">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="font-bold font-inter text-4xl">
          {title || 'Best of Air Max'}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link href="/products" key={product.name}>
            <Card key={product.name} {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
