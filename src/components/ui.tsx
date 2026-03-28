import type { PropsWithChildren, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx, getToneClasses } from '../lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
        ) : null}
        <div className="space-y-1">
          <h2 className="font-display text-3xl text-ink md:text-4xl">{title}</h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-600 md:text-base">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export function Panel({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={clsx(
        'glass-panel rounded-[28px] border border-white/70 shadow-panel',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Pill({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'positive' | 'warning' | 'neutral';
}) {
  return (
    <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1', getToneClasses(tone))}>
      {label}
    </span>
  );
}

export function StatCard({
  label,
  value,
  change,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  tone: 'positive' | 'warning' | 'neutral';
}) {
  return (
    <Panel className="p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="space-y-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="flex items-end justify-between gap-3">
          <p className="text-3xl font-bold tracking-tight text-ink">{value}</p>
          <Pill label={change} tone={tone} />
        </div>
      </div>
    </Panel>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/60 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <ChevronRight className="h-5 w-5 text-slate-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{body}</p>
      {action ? (
        <button className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          {action}
        </button>
      ) : null}
    </div>
  );
}
