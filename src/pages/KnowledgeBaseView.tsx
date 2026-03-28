import { Lock, Shield, Plus } from 'lucide-react';
import { ConceptMapCanvas } from '../components/canvas/ConceptMapCanvas';
import { Panel, Pill, SectionHeader } from '../components/ui';
import { knowledgeBaseMaterials, topicEdges, topicNodes } from '../data/sampleData';

type KnowledgeBaseViewProps = {
  pendingReviewCount: number;
};

export function KnowledgeBaseView({ pendingReviewCount }: KnowledgeBaseViewProps) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Knowledge"
        title="Manage what the course knows"
        description="Review sources, keep the knowledge base clean, and approve new material."
        action={
          <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            <Plus className="h-4 w-4" />
            Add source
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {['All', 'Review', 'Approved', 'Papers'].map((filter) => (
                <button key={filter} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  {filter}
                </button>
              ))}
            </div>
            <Pill label={`${pendingReviewCount} in review`} tone="warning" />
          </div>
          <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Material</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Visibility</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {knowledgeBaseMaterials.map((material) => (
                  <tr key={material.title} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-ink">{material.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{material.type} • Updated {material.updated}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{material.owner}</td>
                    <td className="px-4 py-4 text-slate-600">{material.visibility}</td>
                    <td className="px-4 py-4">
                      <Pill
                        label={material.status}
                        tone={material.status === 'Approved' ? 'positive' : material.status === 'Review' ? 'warning' : 'neutral'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Knowledge map</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">See how course ideas connect</h3>
            </div>
            <Lock className="h-5 w-5 text-slate-500" />
          </div>
          <div className="mt-5">
            <ConceptMapCanvas nodes={topicNodes} edges={topicEdges} />
          </div>
          <div className="mt-5 grid gap-3">
            {[
              'Review AI-generated decks before publishing.',
              'Approve papers before adding them.',
              'Keep only trusted, current material.',
            ].map((line) => (
              <div key={line} className="flex items-start gap-3 rounded-[20px] bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Shield className="mt-0.5 h-4 w-4 text-pine" />
                <p>{line}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
