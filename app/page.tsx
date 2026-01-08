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

  // Fetch latest jobs (limit to 6 for homepage)
  const { data: latestJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background with airplane cockpit */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-airplane.jpg"
            alt="Aviation Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900" />
        </div>

        {/* Top Airline Logos Strip */}
        {featuredAirlines && featuredAirlines.length > 0 && (
          <div className="absolute top-8 left-0 right-0 z-10">
            <div className="flex items-center justify-center gap-8 px-4">
              {featuredAirlines.map((airline) => (
                <div key={airline.id} className="opacity-70 hover:opacity-100 transition-opacity">
                  {airline.logo_url && (
                    <Image
                      src={airline.logo_url}
                      alt={airline.name}
                      width={80}
                      height={40}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight">
            Pilot Pulse
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300">
            Your Aviation Career: Elevated.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search airline"
                className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-10">Latest Jobs</h2>

          {latestJobs && latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block group"
                >
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 space-y-4">
                    {/* Logo & Title */}
                    <div className="flex items-center space-x-4">
                      {job.airline_logo_url && (
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={job.airline_logo_url}
                            alt={job.airline_name}
                            width={36}
                            height={36}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">{job.airline_name}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-900/50 text-orange-300 border border-orange-500/30">
                        {job.contract_type}
                      </span>
                      {job.region && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-900/50 text-blue-300 border border-blue-500/30">
                          {job.region}
                        </span>
                      )}
                      {job.tags && job.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location Info */}
                    {job.city && (
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Location:</span> {job.city}, {job.country}
                      </div>
                    )}

                    {/* Apply Button */}
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors">
                      Apply Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Jobs Yet</h3>
              <p className="text-gray-400">New opportunities are being added soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Airlines Section */}
      {featuredAirlines && featuredAirlines.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Featured Airlines
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredAirlines.map((airline) => (
                <div
                  key={airline.id}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                >
                  {airline.logo_url ? (
                    <div className="w-full h-20 relative">
                      <Image
                        src={airline.logo_url}
                        alt={airline.name}
                        fill
                        className="object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="text-lg font-semibold text-white">{airline.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore by Region Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            Explore by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Middle East', count: '150+', color: 'from-orange-600 to-red-600' },
              { name: 'Europe', count: '200+', color: 'from-blue-600 to-cyan-600' },
              { name: 'Asia Pacific', count: '180+', color: 'from-purple-600 to-pink-600' },
              { name: 'Americas', count: '120+', color: 'from-green-600 to-emerald-600' },
            ].map((region) => (
              <Link
                key={region.name}
                href={`/jobs?region=${encodeURIComponent(region.name)}`}
                className="group"
              >
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${region.color} backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300 text-center`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{region.name}</h3>
                  <p className="text-white/90 font-medium">{region.count} jobs available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
