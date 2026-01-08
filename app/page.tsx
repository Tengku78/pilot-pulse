import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Job, FeaturedAirline } from '@/lib/types/database.types';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured airlines
  const { data: featuredAirlines } = await supabase
    .from('featured_airlines')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(6);

  // Fetch latest jobs
  const { data: latestJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-airplane.jpg"
            alt="Aviation Background"
            fill
            className="object-cover opacity-20"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-aviation-navy-dark/90 to-aviation-navy/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Aviation Career
              <br />
              <span className="text-aviation-blue-light">Takes Flight Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Discover pilot and cabin crew opportunities worldwide. Connect with leading airlines and flight schools.
            </p>

            {/* Search Bar */}
            <div className="glass-card p-4 max-w-3xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Job title, airline, or keyword..."
                  className="glass-input flex-1"
                />
                <input
                  type="text"
                  placeholder="Location..."
                  className="glass-input md:w-48"
                />
                <button className="glass-button px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Active Jobs', value: '500+' },
                { label: 'Airlines', value: '150+' },
                { label: 'Flight Schools', value: '200+' },
                { label: 'Success Stories', value: '10k+' },
              ].map((stat) => (
                <div key={stat.label} className="glass p-4 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-aviation-blue-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Airlines Section */}
      {featuredAirlines && featuredAirlines.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Featured Airlines
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredAirlines.map((airline) => (
                <div
                  key={airline.id}
                  className="glass-card p-6 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  {airline.logo_url ? (
                    <Image
                      src={airline.logo_url}
                      alt={airline.name}
                      width={120}
                      height={60}
                      className="object-contain filter brightness-90 hover:brightness-100 transition-all"
                      unoptimized
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl mb-2">✈️</div>
                      <div className="text-sm text-gray-300">{airline.name}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Jobs Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Jobs</h2>
            <Link
              href="/jobs"
              className="glass-button px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
            >
              View All Jobs
            </Link>
          </div>

          {latestJobs && latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <div key={job.id} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <p className="text-aviation-blue-light font-medium">{job.airline_name}</p>
                    </div>
                    {job.airline_logo_url && (
                      <Image
                        src={job.airline_logo_url}
                        alt={job.airline_name}
                        width={50}
                        height={50}
                        className="object-contain"
                        unoptimized
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="tag">{job.contract_type}</span>
                    <span className="tag">{job.region}</span>
                    {job.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag tag-success">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(job.posted_at).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="glass-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Jobs Yet</h3>
              <p className="text-gray-400">New opportunities are being added soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose PilotPulse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Targeted Opportunities',
                description:
                  'Find jobs specifically for pilots and cabin crew from airlines worldwide.',
              },
              {
                icon: '🏫',
                title: 'Flight School Directory',
                description:
                  'Access comprehensive information about accredited flight schools globally.',
              },
              {
                icon: '💬',
                title: 'Community Forum',
                description:
                  'Connect with aviation professionals, share experiences, and get career advice.',
              },
              {
                icon: '📰',
                title: 'Industry News',
                description: 'Stay updated with the latest aviation industry news and trends.',
              },
              {
                icon: '⚡',
                title: 'Real-time Updates',
                description: 'Get instant notifications about new job postings and opportunities.',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description:
                  'Your data is protected with enterprise-level security and privacy.',
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-card p-6 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Off?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of aviation professionals who have found their dream careers through
              PilotPulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="glass-button px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform"
              >
                Create Free Account
              </Link>
              <Link
                href="/jobs"
                className="glass px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors text-white"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
