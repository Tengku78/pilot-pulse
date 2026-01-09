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
        get(name) { return cookieStore.get(name)?.value; },
        set() {}, // Ignore in RSC
        remove() {},
      },
    }
  );

  const { data: jobs } = await supabase.from('jobs').select('*').limit(6);
  const { data: featuredAirlines } = await supabase.from('featured_airlines').select('*');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center">
        <Image
          src="/images/hero-airplane.jpg"
          alt="Pilot cockpit view"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-10 md:gap-16 z-20">
          {topAirlines.map((a) => (
            <div key={a.name} className="w-14 h-14 md:w-16 md:h-16 relative">
              <Image src={a.logo} alt={a.name} fill className="object-contain" sizes="64px" unoptimized />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">Pilot Pulse</h1>
          <p className="text-xl md:text-3xl opacity-90 mb-10">Your Aviation Career: Elevated.</p>

          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search airline, job, or location..."
              className="w-full px-8 py-6 text-lg rounded-full bg-white/10 backdrop-blur-xl border border-white/20 placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
            />
          </div>
        </div>
      </section>

      {/* Latest Jobs - Gentle overlap, centered */}
      <section className="relative -mt-24 md:-mt-40 px-6 pb-24 z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Latest Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-7xl mx-auto">
          {(jobs ?? []).map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id} className="block mt-12">
              <div className="relative p-8 pt-16 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl">
                {job.airline_logo_url && (
                  <div className="absolute -top-12 left-8 w-24 h-24 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-2xl z-10">
                    <Image src={job.airline_logo_url} alt={`${job.airline_name} logo`} fill className="object-contain p-4" sizes="96px" unoptimized />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{job.airline_name}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.contract_type && <span className="px-3 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">{job.contract_type}</span>}
                    {job.city && job.country && <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">📍 {job.city}, {job.country}</span>}
                    {(job.tags ?? []).slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{tag}</span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition text-white shadow-lg">
                    Apply Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured & Regions - same as before, but ensure max-width */}
      <section className="py-20 px-6 bg-slate-900/40">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Airlines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
          {(featuredAirlines ?? []).map((airline) => (
            <div key={airline.id} className="p-10 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:scale-105 transition">
              <div className="w-40 h-24 relative">
                <Image src={airline.logo_url} alt={airline.name} fill className="object-contain" unoptimized />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Explore by Region</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {regions.map((r) => (
            <div
              key={r.name}
              className="p-12 rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-white/10 text-center hover:scale-105 transition cursor-pointer"
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
