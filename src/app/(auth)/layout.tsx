import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-black p-10 text-zinc-100 lg:flex">
        <div className="flex items-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-200">
            <Image
              alt="Nike"
              className="invert"
              height={20}
              src="/logo.svg"
              width={20}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="--font-inter font-bold text-4xl">Just Do It</h2>
          <p className="max-w-md text-lead text-light-300">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>
          <div aria-hidden="true" className="flex gap-2">
            <span className="h-2 w-2 rounded-full bg-light-100/90" />
            <span className="h-2 w-2 rounded-full bg-light-100/50" />
            <span className="h-2 w-2 rounded-full bg-light-100/50" />
          </div>
        </div>

        <p className="text-footnote text-light-400">
          © 2025 Nike. All rights reserved.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
