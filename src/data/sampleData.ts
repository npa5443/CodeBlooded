import {
  BookOpen,
  CalendarDays,
  Database,
  GraduationCap,
  Map,
  Presentation,
  Radar,
} from 'lucide-react';
import type {
  CalendarItem,
  CourseTopic,
  LessonBlock,
  MaterialRecord,
  MetricCard,
  NavigationItem,
  SuggestionRecord,
  SurveyTrend,
  TopicEdge,
  TopicNode,
  WeakPoint,
} from '../types';

export const navigationItems: NavigationItem[] = [
  { key: 'landing', label: 'Overview', icon: GraduationCap, description: 'Platform summary' },
  { key: 'courses', label: 'Courses', icon: BookOpen, description: 'Structure, topics, materials' },
  { key: 'knowledge', label: 'Knowledge', icon: Database, description: 'Course sources and review' },
  { key: 'insights', label: 'Insights', icon: Radar, description: 'Weak points and feedback' },
  { key: 'lesson-planner', label: 'Planner', icon: Map, description: 'Lecture flow canvas' },
  { key: 'slides', label: 'Slides', icon: Presentation, description: 'Deck improvement' },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays, description: 'Semester pacing' },
];

export const dashboardMetrics: MetricCard[] = [
  { label: 'Courses Managed', value: '6', change: '+2 spring pilots', tone: 'neutral' },
  { label: 'At-Risk Concepts', value: '14', change: '-3 after review week', tone: 'warning' },
  { label: 'Avg. Student Confidence', value: '78%', change: '+9% vs. last month', tone: 'positive' },
  { label: 'Pending Approvals', value: '11', change: '4 AI decks awaiting review', tone: 'neutral' },
];

export const topicNodes: TopicNode[] = [
  { id: 'foundation', label: 'Probability Intuition', x: 0.14, y: 0.3, status: 'stable' },
  { id: 'bayes', label: 'Bayes Rule', x: 0.34, y: 0.18, status: 'watch' },
  { id: 'prior', label: 'Prior vs Posterior', x: 0.54, y: 0.28, status: 'critical' },
  { id: 'sampling', label: 'Sampling Error', x: 0.28, y: 0.68, status: 'stable' },
  { id: 'regression', label: 'Model Interpretation', x: 0.6, y: 0.66, status: 'watch' },
  { id: 'ethics', label: 'Decision Ethics', x: 0.82, y: 0.46, status: 'stable' },
];

export const topicEdges: TopicEdge[] = [
  { from: 'foundation', to: 'bayes' },
  { from: 'bayes', to: 'prior' },
  { from: 'foundation', to: 'sampling' },
  { from: 'sampling', to: 'regression' },
  { from: 'prior', to: 'regression' },
  { from: 'regression', to: 'ethics' },
];

export const courseTopics: CourseTopic[] = [
  {
    id: 'ch1',
    title: 'Topic 1: Statistical Thinking for Decision Making',
    objectives: ['Contrast intuition with formal reasoning', 'Build vocabulary for uncertainty', 'Spot common framing traps'],
    materials: ['Annotated syllabus', 'Lecture deck v4.2', 'Probability warm-up worksheet'],
    assignments: ['Reflection memo on decision bias', 'Diagnostic quiz 01'],
    recitation: ['Small-group probability sketches', 'Confidence calibration exercise'],
    practice: ['Five misconception checks', 'Worked examples with hints'],
    review: ['Analogy cards', 'Concept map summary'],
    misconceptions: ['Confusing likelihood with proof', 'Treating averages as guarantees'],
  },
  {
    id: 'ch2',
    title: 'Topic 2: Bayesian Reasoning and Evidence Updates',
    objectives: ['Explain prior vs posterior', 'Interpret evidence strength', 'Translate formulas into stories'],
    materials: ['Story-first explainer sheet', 'Research paper excerpts', 'Quiz bank'],
    assignments: ['Posterior reasoning problem set', 'Mini survey on confidence'],
    recitation: ['Medical testing case study', 'Think-pair-share on false positives'],
    practice: ['Step-by-step posterior walkthrough', 'Visual tree practice'],
    review: ['Bayes checklist', 'One-page notation guide'],
    misconceptions: ['Ignoring base rates', 'Overweighting dramatic evidence'],
  },
  {
    id: 'ch3',
    title: 'Topic 3: Regression, Interpretation, and Responsible Use',
    objectives: ['Interpret coefficients in context', 'Separate prediction from explanation', 'Evaluate ethical risk'],
    materials: ['Lecture storyboard', 'Case comparison slides', 'Rubric examples'],
    assignments: ['Model critique memo', 'Practice exam set A'],
    recitation: ['Coefficient translation drills', 'Bias and fairness discussion'],
    practice: ['Short answer prompts', 'Visualization matching'],
    review: ['Red-flag checklist', 'Review deck'],
    misconceptions: ['Mistaking correlation for causation', 'Ignoring confounders'],
  },
];

export const knowledgeBaseMaterials: MaterialRecord[] = [
  { title: 'Spring syllabus', type: 'Syllabus', status: 'Approved', owner: 'Prof. Amelia Chen', visibility: 'Course staff', updated: 'Mar 25' },
  { title: 'Chapter 4 slide revision', type: 'AI deck suggestion', status: 'Review', owner: 'Teaching Enhancement Engine', visibility: 'Professor only', updated: 'Mar 27' },
  { title: 'False-positive diagnostics paper', type: 'Research paper', status: 'Review', owner: 'External import', visibility: 'Professor approval required', updated: 'Mar 27' },
  { title: 'Midterm misconception report', type: 'Analytics summary', status: 'Approved', owner: 'FacultyFlow insights', visibility: 'Course staff', updated: 'Mar 28' },
  { title: 'Recitation activity draft', type: 'TA upload', status: 'Approved', owner: 'TA Jordan Lee', visibility: 'Course staff', updated: 'Mar 26' },
];

export const weakPoints: WeakPoint[] = [
  { topic: 'Prior vs Posterior', confidence: 46, errorRate: 39, trend: 'down', note: 'Students can compute values but struggle to explain the intuition.' },
  { topic: 'Sampling Error', confidence: 67, errorRate: 21, trend: 'flat', note: 'Terminology is stable, but graph interpretation is weak.' },
  { topic: 'Model Interpretation', confidence: 59, errorRate: 31, trend: 'down', note: 'Coefficient meaning is being overgeneralized across contexts.' },
  { topic: 'Decision Ethics', confidence: 73, errorRate: 14, trend: 'up', note: 'Discussion participation is strong after case-based recitation.' },
];

export const lessonBlocks: LessonBlock[] = [
  { id: 'lb1', title: 'Analogy: courtroom evidence', kind: 'Concept', duration: 12, complexity: 1, x: 70, y: 48 },
  { id: 'lb2', title: 'Bayes notation breakdown', kind: 'Concept', duration: 18, complexity: 3, x: 320, y: 60 },
  { id: 'lb3', title: 'Medical test worked example', kind: 'Example', duration: 15, complexity: 2, x: 580, y: 56 },
  { id: 'lb4', title: 'Poll + confidence check', kind: 'Activity', duration: 8, complexity: 1, x: 160, y: 210 },
  { id: 'lb5', title: 'Small-group posterior practice', kind: 'Activity', duration: 20, complexity: 4, x: 420, y: 220 },
  { id: 'lb6', title: 'Exit quiz and recap', kind: 'Quiz', duration: 10, complexity: 2, x: 690, y: 220 },
];

export const improvementSuggestions: SuggestionRecord[] = [
  {
    area: 'Explanation order',
    before: 'Formula introduced before students understand evidence updating.',
    after: 'Start with intuition and analogy, then reveal notation once students can narrate the process.',
    impact: 'Raises conceptual transfer during discussion and short-answer questions.',
  },
  {
    area: 'Slide density',
    before: 'Six ideas share one slide with dense bullet text.',
    after: 'Split into three storyboard slides with one key claim and one visual each.',
    impact: 'Improves pacing and lowers cognitive overload in lecture.',
  },
  {
    area: 'Weak-point reinforcement',
    before: 'No explicit revisit after the diagnostic quiz exposed base-rate confusion.',
    after: 'Add a two-minute misconception check and one contrast example in recitation.',
    impact: 'Targets the exact blind spot surfaced in quiz and survey data.',
  },
];

export const surveyTrends: SurveyTrend[] = [
  { week: 'Wk 1', confidence: 62, pacing: 71, clarity: 66 },
  { week: 'Wk 2', confidence: 65, pacing: 68, clarity: 69 },
  { week: 'Wk 3', confidence: 64, pacing: 72, clarity: 70 },
  { week: 'Wk 4', confidence: 70, pacing: 74, clarity: 76 },
  { week: 'Wk 5', confidence: 74, pacing: 79, clarity: 81 },
];

export const calendarItems: CalendarItem[] = [
  { date: 'Mar 31', title: 'Lecture: Bayesian updates with medical testing', type: 'Lecture' },
  { date: 'Apr 02', title: 'Survey assignment opens', type: 'Assignment' },
  { date: 'Apr 07', title: 'Spring holiday', type: 'Holiday' },
  { date: 'Apr 10', title: 'Midterm review studio', type: 'Review' },
  { date: 'Apr 15', title: 'Practice exam window', type: 'Exam' },
];
