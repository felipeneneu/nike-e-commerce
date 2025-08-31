'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SocialProviders from './SocialProviders';

type Props = {
  mode: 'sign-in' | 'sign-up';
  onSubmit: (
    formData: FormData
  ) => Promise<{ ok: boolean; userId?: string } | void>;
};

export default function AuthForm({ mode, onSubmit }: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formData);

      if (result?.ok) router.push('/');
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-caption text-dark-700">
          {mode === 'sign-in'
            ? 'Don’t have an account? '
            : 'Already have an account? '}
          <Link
            className="underline"
            href={mode === 'sign-in' ? '/sign-up' : '/sign-in'}
          >
            {mode === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
        <h1 className="mt-3 text-dark-900 text-heading-3">
          {mode === 'sign-in' ? 'Welcome Back!' : 'Join Nike Today!'}
        </h1>
        <p className="mt-1 text-body text-dark-700">
          {mode === 'sign-in'
            ? 'Sign in to continue your journey'
            : 'Create your account to start your fitness journey'}
        </p>
      </div>

      <SocialProviders variant={mode} />

      <div className="flex items-center gap-4">
        <hr className="h-px w-full border-0 bg-light-300" />
        <span className="shrink-0 text-caption text-dark-700">
          Or {mode === 'sign-in' ? 'sign in' : 'sign up'} with
        </span>
        <hr className="h-px w-full border-0 bg-light-300" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'sign-up' && (
          <div className="space-y-1">
            <label className="text-caption text-dark-900" htmlFor="name">
              Name
            </label>
            <input
              autoComplete="name"
              className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-caption text-dark-900" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            required
            type="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-caption text-dark-900" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              autoComplete={
                mode === 'sign-in' ? 'current-password' : 'new-password'
              }
              className="w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 pr-12 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900/10"
              id="password"
              minLength={8}
              name="password"
              placeholder="minimum 8 characters"
              required
              type={show ? 'text' : 'password'}
            />
            <button
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 px-3 text-caption text-dark-700"
              onClick={() => setShow((v) => !v)}
              type="button"
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          className="mt-2 w-full rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-900/20"
          type="submit"
        >
          {mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </button>

        {mode === 'sign-up' && (
          <p className="text-center text-dark-700 text-footnote">
            By signing up, you agree to our{' '}
            <a className="underline" href="#">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="underline" href="#">
              Privacy Policy
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
