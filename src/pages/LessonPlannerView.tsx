import { Grip } from 'lucide-react';
import { LessonPlannerCanvas } from '../components/canvas/LessonPlannerCanvas';
import { Panel, SectionHeader } from '../components/ui';
import { lessonBlocks } from '../data/sampleData';

export function LessonPlannerView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Canvas lesson planner"
        title="Reorder the lesson visually"
        description="Drag blocks to build a clearer flow."
      />

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <Panel className="p-6">
          <LessonPlannerCanvas initialBlocks={lessonBlocks} />
        </Panel>
        <Panel className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky p-3 text-ink">
              <Grip className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Planner suggestions</p>
              <h3 className="mt-1 text-2xl font-semibold text-ink">Suggested flow</h3>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {[
              'Start with intuition.',
              'Practice before the hardest block.',
              'End with a short recap quiz.',
            ].map((item) => (
              <div key={item} className="rounded-[22px] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
