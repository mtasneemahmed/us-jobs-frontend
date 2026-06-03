import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

const supabase = createClient(
  "https://fsuibtsmyaefvxhzakfa.supabase.co",
  "sb_publishable_FU4uOIi0XXnsafmLvKf9bg__5Qf7Niz"
);

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // 💡 The Fix: Converting String ID to Number ID
  const jobId = parseInt(params.id, 10);
  const { data: job } = await supabase.from('remote_jobs').select('*').eq('id', jobId).single();
  
  if (!job) return { title: 'Position Closed | Private Global Network' };

  return {
    title: `${job.job_title} at ${job.company_name} | Vetted Remote Network`,
    description: `Official vetted listing for ${job.job_title} at ${job.company_name}. Fully remote position. Compensation: ${job.salary_range || 'Competitive Equity + Base'}. Top 1% talent only.`,
    keywords: `${job.job_title}, remote ${job.job_title}, ${job.company_name} careers, high-frequency trading jobs, machine learning roles, AI engineers, top paying remote tech jobs`,
  };
}

export default async function JobDetail({ params }: { params: { id: string } }) {
  // 💡 The Fix: Converting String ID to Number ID
  const jobId = parseInt(params.id, 10);
  const { data: job, error } = await supabase.from('remote_jobs').select('*').eq('id', jobId).single();
  
  // 🛡️ Professional Error Handling instead of silent 404
  if (error || !job) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
        <div className="bg-white/[0.02] p-10 rounded-3xl border border-red-500/20 shadow-2xl backdrop-blur-md max-w-lg">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Opportunity Unavailable</h1>
          <p className="text-slate-400 mb-6">This exclusive position may have been filled, removed, or the link is incorrect.</p>
          <a href="/" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all border border-white/5">
            Return to Dashboard
          </a>
        </div>
      </main>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.job_title,
    'description': `We are looking for a highly skilled ${job.job_title} to join ${job.company_name} in a fully remote capacity.`,
    'datePosted': job.scraped_at,
    'validThrough': new Date(new Date(job.scraped_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    'employmentType': 'FULL_TIME',
    'hiringOrganization': {
      '@type': 'Organization',
      'name': job.company_name,
      'sameAs': job.job_link
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'US'
      }
    },
    'applicantLocationRequirements': {
      '@type': 'Country',
      'name': 'Worldwide'
    },
    'jobLocationType': 'TELECOMMUTE'
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 font-sans flex items-center justify-center relative overflow-hidden">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 bg-white/[0.01] p-8 md:p-14 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Verified Opportunity
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight mb-6 leading-tight">
            {job.job_title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-lg border-b border-white/5 pb-10">
            <p className="text-emerald-400 font-bold uppercase tracking-wider">{job.company_name}</p>
            <span className="text-slate-700 hidden sm:block">•</span>
            <p className="text-slate-400 flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               {job.job_location || 'Global Remote (Work from Anywhere)'}
            </p>
          </div>
        </header>

        <div className="bg-black/40 p-8 rounded-2xl border border-white/5 mb-12 shadow-inner">
           <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-2 font-semibold">Estimated Compensation</p>
           <p className="text-3xl text-white font-medium tracking-tight">
             {job.salary_range || 'Competitive Base + Premium Equity'}
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <a 
            href={job.job_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 bg-white text-black hover:bg-emerald-400 px-8 py-5 rounded-xl font-extrabold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] text-center text-lg tracking-wide group"
          >
            Apply Confidentially
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="/" className="px-8 py-5 rounded-xl font-bold transition-all border border-white/5 hover:border-white/20 hover:bg-white/5 text-center text-slate-400 hover:text-white">
            Return to Dashboard
          </a>
        </div>

      </div>
    </main>
  );
}