'use client';

import { signIn } from '../actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="hero-bg" />

      <div className="glass-card w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your PilotPulse account</p>
        </div>

        <form action={signIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="glass-input w-full"
              placeholder="pilot@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="glass-input w-full"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-600 bg-transparent"
              />
              Remember me
            </label>
            <Link
              href="/auth/reset-password"
              className="text-aviation-blue-light hover:text-aviation-blue transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="glass-button w-full py-3 px-4 rounded-lg font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="text-aviation-blue-light hover:text-aviation-blue font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
