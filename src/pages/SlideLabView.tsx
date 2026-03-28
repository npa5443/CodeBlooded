import { FileStack, WandSparkles } from 'lucide-react';
import { EmptyState, Panel, SectionHeader } from '../components/ui';
import { improvementSuggestions } from '../data/sampleData';

export function SlideLabView() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Slides"
        title="Make decks easier to follow"
        description="Shorter wording, better order, clearer explanation."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel className="p-6">
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="flex items-center gap-3">
              <FileStack className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-semibold text-ink">Upload current lecture slides</p>
                <p className="text-sm text-slate-500">Review wording, pacing, and weak-point coverage.</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-4">
            {improvementSuggestions.map((suggestion) => (
              <div key={suggestion.area} className="rounded-[24px] bg-white ring-1 ring-slate-200">
                <div className="border-b border-slate-100 px-5 py-4">
                  <p className="font-semibold text-ink">{suggestion.area}</p>
                </div>
                <div className="grid gap-4 p-5 md:grid-cols-2">
                  <div className="rounded-[20px] bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Before</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{suggestion.before}</p>
                  </div>
                  <div className="rounded-[20px] bg-[#eef7f2] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">After</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{suggestion.after}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 text-sm text-slate-600">
                  <span className="font-semibold text-ink">Expected impact:</span> {suggestion.impact}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#11243a] p-3 text-white">
              <WandSparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Review queue</p>
              <h3 className="mt-1 text-2xl font-semibold text-ink">AI slide drafts</h3>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="font-semibold text-ink">Chapter 4 revised deck</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Shorter wording, one analogy slide, and a quick review block.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Approve</button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Edit</button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Reject</button>
              </div>
            </div>
            <EmptyState
              title="No extra drafts"
              body="New AI slide suggestions appear here until you review them."
              action="Generate new support deck"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
