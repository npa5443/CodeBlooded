import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { LandingPage, CoursesView, KnowledgeBaseView, InsightsView, LessonPlannerView, SlideLabView, SemesterPlannerView } from './pages';
import { courseTopics, knowledgeBaseMaterials } from './data/sampleData';
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
