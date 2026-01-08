'use client';

import { signUp } from '../actions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { UserRole } from '@/lib/types/database.types';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole>('pilot');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const roles = [
    {
      value: 'pilot' as UserRole,
      label: 'Pilot',
      description: 'Looking for pilot positions',
      icon: '✈️',
    },
    {
      value: 'cabin_crew' as UserRole,
      label: 'Cabin Crew',
      description: 'Seeking cabin crew roles',
      icon: '👨‍✈️',
    },
    {
      value: 'recruiter' as UserRole,
      label: 'Recruiter',
      description: 'Post jobs and find talent',
      icon: '💼',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="hero-bg" />

      <div className="glass-card w-full max-w-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join PilotPulse</h1>
          <p className="text-gray-400">Create your account and start your aviation career journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        <form action={signUp} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.value
                      ? 'border-aviation-blue bg-aviation-blue/10'
                      : 'border-gray-700/50 bg-transparent hover:border-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <div className="font-medium text-white mb-1">{role.label}</div>
                  <div className="text-xs text-gray-400">{role.description}</div>
                </button>
              ))}
            </div>
            <input type="hidden" name="role" value={selectedRole} />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              className="glass-input w-full"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="glass-input w-full"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters</p>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 mr-2 rounded border-gray-600 bg-transparent"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I agree to the{' '}
              <Link href="/terms" className="text-aviation-blue-light hover:text-aviation-blue">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-aviation-blue-light hover:text-aviation-blue">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="glass-button w-full py-3 px-4 rounded-lg font-medium"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-aviation-blue-light hover:text-aviation-blue font-medium transition-colors"
          >
            Sign in
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
