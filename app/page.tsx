// app/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  airline_name: string;
  airline_logo_url?: string;
  contract_type?: string;
  city?: string;
  country?: string;
  region?: string;
  tags?: string[];
}

interface Airline {
  id: string;
  name: string;
  logo_url: string;
}

const regions = [
  { name: 'Middle East', count: '150+ jobs available' },
  { name: 'Europe', count: '200+ jobs available' },
  { name: 'Asia Pacific', count: '180+ jobs available' },
  { name: 'Americas', count: '120+ jobs available' },
];

const topAirlines = [
  { name: 'Qatar Airways', logo: '/images/airlines/qatar.svg' },
  { name: 'Emirates', logo: '/logos/emirates.png' },
  { name: 'Delta', logo: '/logos/delta.png' },
  { name: 'Lufthansa', logo: '/logos/lufthansa.png' },
  { name: 'Singapore Airlines', logo: '/logos/singapore.png' },
];

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {}
        },
      },
    }
  );

  const { data: jobs } = await supabase.from('jobs').select('*').limit(6);
  const { data: featuredAirlines } = await supabase.from('featured_airlines').select('*');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero - Full height, centered content */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-airplane.jpg"
          alt="Pilot cockpit view"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90" />

        {/* Top Logos - Fixed top, centered */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-10 md:gap-16 z-20">
          {topAirlines.map((a) => (
            <div key={a.name} className="w-14 h-14 md:w-16 md:h-16 relative">
              <Image
                src={a.logo}
                alt={`${a.name} logo`}
                fill
                className="object-contain drop-shadow-lg"
                sizes="64px"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Hero Text - Centered vertically/horizontally */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">Pilot Pulse</h1>
          <p className="text-xl md:text-3xl opacity-90 mb-10">Your Aviation Career: Elevated.</p>

          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search airline, job, or location..."
              className="w-full px-8 py-5 text-lg rounded-full bg-white/10 backdrop-blur-xl border border-white/20 placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/40 transition"
            />
          </div>
        </div>
      </section>

      {/* Latest Jobs - Strong overlap, centered grid */}
      <section className="relative -mt-40 md:-mt-56 px-6 pb-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Latest Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {(jobs as Job[] ?? []).map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id} className="block">
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/20">
                {/* Protruding Logo - Top-left */}
                {job.airline_logo_url && (
                  <div className="absolute -top-10 left-8 w-20 h-20 rounded-full overflow-hidden border-4 border-slate-950 bg-slate-900 shadow-2xl">
                    <Image
                      src={job.airline_logo_url}
                      alt={`${job.airline_name} logo`}
                      fill
                      className="object-contain p-3"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                )}

                <div className="pt-14 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <p className="text-gray-300 mt-1">{job.airline_name}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {job.contract_type && (
                      <span className="px-4 py-1.5 text-sm rounded-full bg-orange-600/30 text-orange-300">
                        {job.contract_type}
                      </span>
                    )}
                    {job.city && job.country && (
                      <span className="px-4 py-1.5 text-sm rounded-full bg-gray-700/60 text-gray-300">
                        📍 {job.city}, {job.country}
                      </span>
                    )}
                    {(job.tags ?? []).map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-emerald-600/40 to-teal-600/40 text-emerald-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition mt-4">
                    Apply Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Airlines - Centered, larger */}
      <section className="py-20 px-6 bg-slate-900/40">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Airlines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
          {(featuredAirlines as Airline[] ?? []).map((airline) => (
            <div
              key={airline.id}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:scale-105 transition"
            >
              {airline.logo_url ? (
                <div className="w-40 h-24 relative">
                  <Image
                    src={airline.logo_url}
                    alt={`${airline.name} logo`}
                    fill
                    className="object-contain"
                    sizes="160px"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="text-lg font-semibold text-white">{airline.name}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Explore by Region - Centered, balanced */}
      <section className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Explore by Region</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {regions.map((r) => (
            <div
              key={r.name}
              className="p-10 rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-white/10 text-center hover:scale-105 transition cursor-pointer"
            >
              <h3 className="text-3xl font-bold mb-3">{r.name}</h3>
              <p className="text-xl text-gray-300">{r.count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}