'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Job, CabinCrewJob } from '@/lib/types/database.types';

type JobType = 'pilot' | 'cabin_crew';

export default function JobsPage() {
  const [jobType, setJobType] = useState<JobType>('pilot');
  const [jobs, setJobs] = useState<Job[] | CabinCrewJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedContract, setSelectedContract] = useState('all');
  const supabase = createClient();

  const regions = ['all', 'Middle East', 'Europe', 'North America', 'Asia Pacific', 'Africa', 'Latin America'];
  const contractTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

  useEffect(() => {
    loadJobs();
  }, [jobType, selectedRegion, selectedContract, searchQuery]);

  async function loadJobs() {
    setLoading(true);
    const tableName = jobType === 'pilot' ? 'jobs' : 'cabin_crew_jobs';

    let query = supabase
      .from(tableName)
      .select('*')
      .eq('status', 'active')
      .order('posted_at', { ascending: false });

    if (selectedRegion !== 'all') {
      query = query.eq('region', selectedRegion);
    }

    if (selectedContract !== 'all') {
      query = query.eq('contract_type', selectedContract);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,airline_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    const { data } = await query;
    setJobs(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Aviation Jobs</h1>
          <p className="text-xl text-gray-400">
            Discover your next opportunity in aviation
          </p>
        </div>

        {/* Job Type Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 inline-flex rounded-lg">
            <button
              onClick={() => setJobType('pilot')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                jobType === 'pilot'
                  ? 'glass-button'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ✈️ Pilot Jobs
            </button>
            <button
              onClick={() => setJobType('cabin_crew')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                jobType === 'cabin_crew'
                  ? 'glass-button'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👨‍✈️ Cabin Crew Jobs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input md:col-span-2"
            />

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="glass-input"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>

            {/* Contract Type Filter */}
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="glass-input"
            >
              {contractTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded mb-4" />
                <div className="h-4 bg-white/10 rounded mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="text-gray-400 mb-4">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-aviation-blue-light font-medium">
                        {job.airline_name}
                      </p>
                    </div>
                    {job.airline_logo_url && (
                      <Image
                        src={job.airline_logo_url}
                        alt={job.airline_name}
                        width={50}
                        height={50}
                        className="object-contain ml-4"
                        unoptimized
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="tag">{job.contract_type}</span>
                    <span className="tag">{job.region}</span>
                    {job.is_featured && (
                      <span className="tag tag-warning">Featured</span>
                    )}
                    {job.tags.slice(0, 1).map((tag) => (
                      <span key={tag} className="tag tag-success">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  {job.salary_range && (
                    <p className="text-aviation-blue-light text-sm mb-4 font-medium">
                      💰 {job.salary_range}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="text-xs text-gray-500">
                      <div>{new Date(job.posted_at).toLocaleDateString()}</div>
                      <div className="mt-1">👁️ {job.views_count} views</div>
                    </div>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="glass-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Jobs Found</h3>
            <p className="text-gray-400">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('all');
                setSelectedContract('all');
              }}
              className="glass-button px-6 py-3 rounded-lg font-medium mt-6 hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
