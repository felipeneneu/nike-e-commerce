import Image from 'next/image';

type Props = { variant?: 'sign-in' | 'sign-up' };

export default function SocialProviders({ variant = 'sign-in' }: Props) {
  return (
    <div className="space-y-3">
      <button
        aria-label={`${variant === 'sign-in' ? 'Continue' : 'Sign up'} with Google`}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body-medium text-dark-900 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
        type="button"
      >
        <Image alt="" height={18} src="/google.svg" width={18} />
        <span>Continue with Google</span>
      </button>
      <button
        aria-label={`${variant === 'sign-in' ? 'Continue' : 'Sign up'} with Apple`}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body-medium text-dark-900 hover:bg-light-200 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
        type="button"
      >
        <Image alt="" height={18} src="/apple.svg" width={18} />
        <span>Continue with Apple</span>
      </button>
    </div>
  );
}
