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
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500 font-bold">
        System Error: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-2 tracking-tight">
            US Remote Jobs 🇺🇸
          </h1>
          <p className="text-slate-400 text-lg">
            Premium opportunities auto-fetched by High-Performance Python Bot 🚀
          </p>
        </header>

        <div className="space-y-4">
          {jobs?.map((job) => (
            <article key={job.job_link} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors">
                    {job.job_title}
                  </h2>
                  <p className="text-blue-400 font-medium mb-4">{job.company_name}</p>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                    <span className="bg-slate-950 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-2 shadow-inner">
                      📍 {job.job_location || 'Remote'}
                    </span>
                    <span className="bg-slate-950 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-2 shadow-inner">
                      💰 {job.salary_range || 'Not specified'}
                    </span>
                  </div>
                </div>
                
                <a 
                  href={job.job_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/20 text-center whitespace-nowrap"
                >
                  Apply Now
                </a>
              </div>
            </article>
          ))}
          
          {/* Empty State UI */}
          {(!jobs || jobs.length === 0) && (
            <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
              <p className="text-slate-400 text-xl mb-2 font-semibold">No jobs found in the database yet.</p>
              <p className="text-slate-500 text-sm">Bot is running diagnostics and fetching data in the background...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}