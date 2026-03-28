export function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function getToneClasses(tone: 'positive' | 'warning' | 'neutral') {
  if (tone === 'positive') {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  }

  if (tone === 'warning') {
    return 'bg-amber-50 text-amber-700 ring-amber-200';
  }

  return 'bg-slate-100 text-slate-700 ring-slate-200';
}
