import { Upload } from 'lucide-react';
import { Panel, Pill, SectionHeader, StatCard } from '../components/ui';
import { courseTopics, dashboardMetrics } from '../data/sampleData';
import { clsx } from '../lib/utils';

type CoursesViewProps = {
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
};

function ContentList({ title, items, highlight = false }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={clsx('rounded-[24px] p-4', highlight ? 'bg-[#fff4ef]' : 'bg-slate-50')}>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brass" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CoursesView({ activeTopicId, onSelectTopic }: CoursesViewProps) {
  const activeTopic = courseTopics.find((topic) => topic.id === activeTopicId) ?? courseTopics[0];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Courses"
        title="Core course structure"
        description="Keep the course plan, topics, and materials in one simple flow."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Professor name',
              'Department',
              'Course name',
              'Semester dates',
              'Lecture schedule',
              'Assignments',
              'Textbook or materials',
              'Course files',
            ].map((field) => (
              <label key={field} className="space-y-2">
                <span className="text-sm font-medium text-slate-600">{field}</span>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400">{field}</div>
              </label>
            ))}
          </div>
          <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-semibold text-ink">Add course files</p>
                <p className="text-sm text-slate-500">Syllabus, slides, notes, assignments.</p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex flex-wrap gap-3">
            {courseTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  activeTopic.id === topic.id ? 'bg-ink text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200',
                )}
              >
                {topic.title}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-4">
            <ContentList title="Objectives" items={activeTopic.objectives} />
            <ContentList title="Materials" items={activeTopic.materials} />
            <ContentList title="Assignments" items={activeTopic.assignments} />
            <ContentList title="Misconceptions" items={activeTopic.misconceptions} highlight />
          </div>
        </Panel>
      </div>
    </div>
  );
}
