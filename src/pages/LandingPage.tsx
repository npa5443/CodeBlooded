import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ConceptMapCanvas } from '../components/canvas/ConceptMapCanvas';
import { Panel, Pill, SectionHeader } from '../components/ui';
import { topicEdges, topicNodes } from '../data/sampleData';

type LandingPageProps = {
  onEnter: () => void;
};

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="space-y-8">
      <Panel className="overflow-hidden">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.95fr] lg:p-10">
          <div className="space-y-6">
            <Pill label="Professor workspace" tone="positive" />
            <div className="space-y-4">
              <h2 className="max-w-3xl font-display text-5xl leading-tight text-ink md:text-6xl">
                Organize courses. Spot confusion. Improve teaching.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                FacultyFlow helps professors simplify hard material, track weak points, and plan clearer lessons.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Explore platform
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-soft">
                View workflow
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['6', 'Courses'],
                ['14', 'Weak points'],
                ['91%', 'Review rate'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] bg-white/70 p-4 ring-1 ring-white/80">
                  <p className="text-3xl font-bold text-ink">{value}</p>
                  <p className="mt-1 text-sm text-slate-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky blur-3xl" />
            <div className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-[#f6e7bd] blur-3xl" />
            <div className="relative space-y-4 rounded-[32px] bg-[#11243a] p-5 text-white shadow-soft">
              <div className="flex items-center justify-between rounded-[24px] bg-white/8 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Teaching engine</p>
                  <p className="mt-2 text-lg font-semibold">Start simple, then build up</p>
                </div>
                <Sparkles className="h-5 w-5 text-[#eed89b]" />
              </div>
              <div className="grid gap-4">
                <div className="rounded-[24px] bg-white p-4 text-ink">
                  <p className="text-sm font-semibold">This week</p>
                  <div className="mt-4 space-y-3">
                    {[
                      'Teach intuition before notation',
                      'Add one misconception check',
                      'Review the new AI slide draft',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-pine" />
                        <p className="text-sm leading-6 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Knowledge base</p>
                    <p className="mt-2 text-2xl font-semibold">9 sources</p>
                    <p className="mt-1 text-sm text-slate-300">Slides, notes, quizzes, surveys, papers</p>
                  </div>
                  <div className="rounded-[24px] bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Understanding</p>
                    <p className="mt-2 text-2xl font-semibold">Improving</p>
                    <p className="mt-1 text-sm text-slate-300">3 key weak points reduced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-6">
          <SectionHeader
            eyebrow="Canvas-first"
            title="See the course clearly"
            description="Map topic relationships and teach in the right order."
          />
          <div className="mt-6">
            <ConceptMapCanvas nodes={topicNodes} edges={topicEdges} />
          </div>
        </Panel>
        <Panel className="p-6">
          <SectionHeader
            eyebrow="Core workflow"
            title="Built for the teaching loop"
            description="Organize content, find confusion, then improve the next lesson."
          />
          <div className="mt-6 space-y-4">
            {[
              ['Courses', 'Keep materials, topics, and misconceptions together.'],
              ['Insights', 'Use quizzes and surveys to find weak spots.'],
              ['Planner', 'Reorder lessons visually on canvas.'],
              ['Slides', 'Tighten decks and simplify explanations.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[24px] bg-slate-50 p-4">
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
