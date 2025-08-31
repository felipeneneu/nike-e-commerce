import SessionBanner from '@/components/SessionBanner';
import SessionBannerFooter from '@/components/SessionBannerFooter';
import Hero from '@/sections/Hero';
import PopularProducts from '@/sections/PopularProducts';

const Page = () => {
  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b bg-[#F6F6F6]">
        <Hero />
      </section>

      <section className="mt-10">
        <PopularProducts />
      </section>
      <section className="mt-10">
        <PopularProducts title="Novos" />
      </section>
      <section className="mt-10 mb-10">
        <SessionBanner
          hero={{
            imageSrc: '/banners/banner1.png',
            imageAlt: 'Bright React Presto shoes on a track',
            kicker: 'Trending Now',
            title: 'REACT PRESTO',
            description:
              'With React foam for the most comfortable Presto ever.',
            ctaLabel: 'Shop Now',
            href: '#',
          }}
          secondary={[
            {
              imageSrc: '/banners/banner2.png',
              imageAlt: 'Air Max Dia on city streets',
              title: 'Summer Must-Haves: Air Max Dia',
              ctaLabel: 'Shop',
              href: '#',
            },
            {
              imageSrc: '/banners/banner3.png',
              imageAlt: 'Air Jordan 11 Retro Low',
              title: 'Air Jordan 11 Retro Low LE',
              ctaLabel: 'Shop',
              href: '#',
            },
          ]}
        />
      </section>
      <section className="mt-10 mb-10">
        <SessionBannerFooter
          cta={{ label: 'Shop Now', href: '#' }}
          description="Take advantage of brand new, proprietary cushioning technology with a fresh pair of Nike react shoes."
          imageAlt="Pair of blue Nike React shoes with orange laces"
          imageSrc="/feature.png"
          kicker="Bold & Sporty"
          title={
            <>
              NIKE REACT
              <br /> PRESTO BY YOU
            </>
          }
        />
      </section>
    </main>
  );
};

export default Page;
