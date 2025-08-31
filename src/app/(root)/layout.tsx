import { Footer, Navbar } from '@/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <section className="padding padding-x padding-t bg-black pb-8">
        <Footer />
      </section>
    </>
  );
}
