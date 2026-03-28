import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileStack,
  Grip,
  Lock,
  Plus,
  Shield,
  Sparkles,
  Upload,
  WandSparkles,
} from 'lucide-react';
import { AppShell } from './components/AppShell';
import { ConceptMapCanvas } from './components/canvas/ConceptMapCanvas';
import { HeatmapCanvas } from './components/canvas/HeatmapCanvas';
import { LessonPlannerCanvas } from './components/canvas/LessonPlannerCanvas';
import { EmptyState, Panel, Pill, SectionHeader, StatCard } from './components/ui';
import {
  calendarItems,
  courseTopics,
  dashboardMetrics,
  improvementSuggestions,
  knowledgeBaseMaterials,
  lessonBlocks,
  topicEdges,
  topicNodes,
  weakPoints,
} from './data/sampleData';
import { clsx } from './lib/utils';
import type { NavKey } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<NavKey>('landing');
  const [activeTopic, setActiveTopic] = useState(courseTopics[0]);
  const pendingReviews = knowledgeBaseMaterials.filter((material) => material.status === 'Review');

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      <div className="space-y-8 pb-12">
        {currentView === 'landing' ? <LandingPage onEnter={() => setCurrentView('courses')} /> : null}
        {currentView === 'courses' ? (
          <CoursesView
            activeTopicId={activeTopic.id}
            onSelectTopic={(topicId) => {
              const nextTopic = courseTopics.find((topic) => topic.id === topicId);
              if (nextTopic) setActiveTopic(nextTopic);
            }}
          />
        ) : null}
        {currentView === 'knowledge' ? <KnowledgeBaseView pendingReviewCount={pendingReviews.length} /> : null}
        {currentView === 'insights' ? <InsightsView activeTopic={activeTopic.title} /> : null}
        {currentView === 'lesson-planner' ? <LessonPlannerView /> : null}
        {currentView === 'slides' ? <SlideLabView /> : null}
        {currentView === 'calendar' ? <SemesterPlannerView /> : null}
      </div>
    </AppShell>
  );
}

function LandingPage({ onEnter }: { onEnter: () => void }) {
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

function CoursesView({
  activeTopicId,
  onSelectTopic,
}: {
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
}) {
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

function KnowledgeBaseView({ pendingReviewCount }: { pendingReviewCount: number }) {
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

function InsightsView({ activeTopic }: { activeTopic: string }) {
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

function LessonPlannerView() {
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

function SlideLabView() {
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

function SemesterPlannerView() {
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

function ContentList({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
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
