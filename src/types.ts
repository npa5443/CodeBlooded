import type { LucideIcon } from 'lucide-react';

export type NavKey =
  | 'landing'
  | 'courses'
  | 'knowledge'
  | 'insights'
  | 'lesson-planner'
  | 'slides'
  | 'calendar';

export interface NavigationItem {
  key: NavKey;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  tone: 'positive' | 'warning' | 'neutral';
}

export interface TopicNode {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'stable' | 'watch' | 'critical';
}

export interface TopicEdge {
  from: string;
  to: string;
}

export interface CourseTopic {
  id: string;
  title: string;
  objectives: string[];
  materials: string[];
  assignments: string[];
  recitation: string[];
  practice: string[];
  review: string[];
  misconceptions: string[];
}

export interface MaterialRecord {
  title: string;
  type: string;
  status: 'Approved' | 'Review' | 'Rejected';
  owner: string;
  visibility: string;
  updated: string;
}

export interface WeakPoint {
  topic: string;
  confidence: number;
  errorRate: number;
  trend: 'up' | 'flat' | 'down';
  note: string;
}

export interface LessonBlock {
  id: string;
  title: string;
  kind: 'Concept' | 'Example' | 'Activity' | 'Quiz' | 'Review';
  duration: number;
  complexity: 1 | 2 | 3 | 4 | 5;
  x: number;
  y: number;
}

export interface SuggestionRecord {
  area: string;
  before: string;
  after: string;
  impact: string;
}

export interface SurveyTrend {
  week: string;
  confidence: number;
  pacing: number;
  clarity: number;
}

export interface CalendarItem {
  date: string;
  title: string;
  type: 'Lecture' | 'Assignment' | 'Holiday' | 'Exam' | 'Review';
}
