import { ChevronRight, Clock3 } from 'lucide-react';
import { Panel, Pill, SectionHeader } from '../components/ui';
import { calendarItems } from '../data/sampleData';

export function SemesterPlannerView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Calendar"
        title="Keep the semester paced well"
        description="See lectures, deadlines, reviews, and exam windows in one place."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {calendarItems.map((item) => (
              <div key={`${item.date}-${item.title}`} className="rounded-[24px] border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                  </div>
                  <Pill label={item.type} tone={item.type === 'Holiday' ? 'neutral' : item.type === 'Exam' ? 'warning' : 'positive'} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <div className="space-y-4 rounded-[28px] bg-[#11243a] p-6 text-white">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-[#eed89b]" />
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Planning assistant</p>
                <p className="mt-1 text-xl font-semibold">Pacing alerts</p>
              </div>
            </div>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>Week 6 is too dense.</p>
              <p>Move one practice set earlier.</p>
              <p>Place review right before the practice exam.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
              Open full planner
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
