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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/85 to-slate-900" />
        </div>

        {/* Airline logos strip at top */}
        {featuredAirlines && featuredAirlines.length > 0 && (
          <div className="absolute top-20 left-0 right-0 z-10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-12 flex-wrap">
                {featuredAirlines.slice(0, 6).map((airline) => (
                  <div
                    key={airline.id}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {airline.logo_url && (
                      <Image
                        src={airline.logo_url}
                        alt={airline.name}
                        width={100}
                        height={50}
                        className="object-contain"
                        unoptimized
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
            Pilot Pulse
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12">
            Your Aviation Career: Elevated.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
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
              <input
                type="text"
                placeholder="Search airline"
                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-2 flex items-center pr-2">
                <div className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">Latest Jobs</h2>
          </div>

          {latestJobs && latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="group"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 hover:border-blue-500/50 transition-all duration-300">
                    {/* Airline Logo & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      {job.airline_logo_url && (
                        <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={job.airline_logo_url}
                            alt={job.airline_name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400">{job.airline_name}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {job.contract_type}
                      </span>
                      {job.tags && job.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        VIP
                      </span>
                    </div>

                    {/* Location */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium text-gray-300">Region:</span>
                        <span className="ml-2">{job.region}</span>
                      </div>
                      {job.city && (
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="font-medium text-gray-300">Location:</span>
                          <span className="ml-2">{job.city}</span>
                        </div>
                      )}
                    </div>

                    {/* Apply Button */}
                    <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                      Apply Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Jobs Yet</h3>
              <p className="text-gray-400">New opportunities are being added soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Airlines Section */}
      {featuredAirlines && featuredAirlines.length > 0 && (
        <section className="py-16 px-4 bg-slate-900/50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Featured Airlines
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredAirlines.map((airline) => (
                <div
                  key={airline.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-slate-800/70 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                >
                  {airline.logo_url ? (
                    <Image
                      src={airline.logo_url}
                      alt={airline.name}
                      width={120}
                      height={60}
                      className="object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                      unoptimized
                    />
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            Explore by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Middle East', count: '150+', color: 'from-orange-500 to-red-500' },
              { name: 'Europe', count: '200+', color: 'from-blue-500 to-cyan-500' },
              { name: 'Asia Pacific', count: '180+', color: 'from-purple-500 to-pink-500' },
              { name: 'Americas', count: '120+', color: 'from-green-500 to-emerald-500' },
            ].map((region) => (
              <Link
                key={region.name}
                href={`/jobs?region=${encodeURIComponent(region.name)}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${region.color} rounded-2xl p-8 hover:scale-105 transition-transform duration-300`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{region.name}</h3>
                  <p className="text-white/80">{region.count} jobs available</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
