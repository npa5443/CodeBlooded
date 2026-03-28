import { Panel, Pill, SectionHeader } from '../components/ui';
import { HeatmapCanvas } from '../components/canvas/HeatmapCanvas';
import { weakPoints } from '../data/sampleData';

type InsightsViewProps = {
  activeTopic: string;
};

export function InsightsView({ activeTopic }: InsightsViewProps) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Insights"
        title="Find what students are missing"
        description="Use quiz and survey signals to decide what to reteach next."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="p-6">
          <HeatmapCanvas weakPoints={weakPoints} />
        </Panel>
        <Panel className="p-6">
          <div className="rounded-[22px] bg-[#11243a] p-5 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Focus now</p>
            <p className="mt-2 text-2xl font-semibold">{activeTopic}</p>
            <p className="mt-2 text-sm text-slate-300">Best next move: reteach with an analogy, then a worked example.</p>
          </div>
          <div className="mt-4 space-y-3">
            {weakPoints.map((point) => (
              <div key={point.topic} className="rounded-[22px] bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{point.topic}</p>
                    <p className="mt-1 text-sm text-slate-500">{point.note}</p>
                  </div>
                  <Pill label={`${point.errorRate}% error`} tone={point.errorRate >= 30 ? 'warning' : 'neutral'} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
