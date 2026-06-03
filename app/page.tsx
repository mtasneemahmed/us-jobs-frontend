import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Direct Connection for Production Stability)
const supabase = createClient(
  "https://fsuibtsmyaefvxhzakfa.supabase.co",
  "sb_publishable_FU4uOIi0XXnsafmLvKf9bg__5Qf7Niz"
);

// Disable caching to ensure real-time data fetching (ISR bypass)
export const revalidate = 0; 

export default async function Home() {
  // Fetch the latest 20 remote jobs from the correct 'remote_jobs' table
  const { data: jobs, error } = await supabase
    .from('remote_jobs') 
    .select('*')
    .order('scraped_at', { ascending: false })
    .limit(20); 

  // Professional Error Handling UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-red-500 font-medium tracking-wide">
        System Error: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Background Ambient Glow for Luxury Feel */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Guru-Level Psychological Header */}
        <header className="mb-14 border-b border-white/5 pb-10 text-center md:text-left pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Private Global Network
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-5 tracking-tighter leading-tight">
            Vetted Remote Roles. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Zero Noise.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            Exclusive, high-paying opportunities curated for the top 1% of talent in Machine Learning, Algorithmic Trading, and High-Performance Engineering.
          </p>
        </header>

        <div className="space-y-5">
          {jobs?.map((job) => (
            <article key={job.job_link} className="bg-white/[0.02] p-7 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 group shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm relative overflow-hidden">
              
              {/* Subtle gradient hover effect on card */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      {job.job_title}
                    </h2>
                    {/* Psychological Trust Badge */}
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border border-emerald-500/20">
                      Verified
                    </span>
                  </div>
                  
                  <p className="text-slate-400 font-medium mb-5 text-sm uppercase tracking-wide">{job.company_name}</p>
                  
                  <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-300">
                    <span className="bg-black/40 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2 backdrop-blur-md">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {job.job_location || 'Global Remote'}
                    </span>
                    <span className="bg-black/40 px-4 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-2 backdrop-blur-md text-emerald-100">
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {job.salary_range || 'Competitive Equity + Base'}
                    </span>
                  </div>
                </div>
                
                {/* Luxury CTA Button */}
                <a 
                  href={`/jobs/${job.id}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white text-black hover:bg-emerald-400 hover:text-black px-8 py-3.5 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] text-center whitespace-nowrap text-sm tracking-wide"
                >
                  Request Intro
                </a>
              </div>
            </article>
          ))}
          
          {/* Guru-Level Empty State UI */}
          {(!jobs || jobs.length === 0) && (
            <div className="text-center py-24 bg-white/[0.01] rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="animate-pulse w-12 h-12 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              </div>
              <p className="text-white text-xl mb-3 font-semibold tracking-tight">Curating the network...</p>
              <p className="text-slate-500 text-sm max-w-md mx-auto font-light">Our analysts are currently vetting new high-impact roles. The dashboard will update shortly.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}