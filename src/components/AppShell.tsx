import { Bell, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { navigationItems } from '../data/sampleData';
import type { NavKey } from '../types';
import { clsx } from '../lib/utils';

export function AppShell({
  currentView,
  onViewChange,
  children,
}: {
  currentView: NavKey;
  onViewChange: (view: NavKey) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,237,247,0.95),_transparent_30%),linear-gradient(180deg,_#f8fbfd_0%,_#eef3f7_50%,_#f8fbfd_100%)]" />
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/70 bg-[#0f2033] px-5 py-6 text-white shadow-soft lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brass via-[#eed89b] to-white text-lg font-bold text-ink shadow-lg">
              F
            </div>
            <div>
              <p className="font-display text-2xl">FacultyFlow</p>
              <p className="text-sm text-slate-300">Teaching clarity platform</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => onViewChange(item.key)}
                  className={clsx(
                    'group w-full rounded-2xl px-4 py-3 text-left transition',
                    currentView === item.key ? 'bg-white text-ink shadow-soft' : 'text-slate-200 hover:bg-white/10',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={clsx(
                        'rounded-xl p-2 transition',
                        currentView === item.key ? 'bg-sky text-ink' : 'bg-white/10 text-slate-200 group-hover:bg-white/15',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p
                        className={clsx(
                          'mt-1 text-xs leading-5',
                          currentView === item.key ? 'text-slate-600' : 'text-slate-300',
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-7">
          <header className="glass-panel mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 px-5 py-4 shadow-panel md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Spring 2026</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">Teach clearly. Keep rigor.</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
                <Search className="h-4 w-4" />
                <input
                  className="w-full bg-transparent outline-none placeholder:text-slate-400 sm:w-56"
                  placeholder="Search"
                />
              </label>
              <button className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition hover:-translate-y-0.5 hover:shadow-soft">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-coral" />
              </button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
