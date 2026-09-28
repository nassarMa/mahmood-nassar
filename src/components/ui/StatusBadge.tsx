import { STATUS_LABEL, type Status } from '@/content/types'

const ACTIVE: Status[] = ['building', 'live']

export function StatusBadge({ status }: { status: Status }) {
  const active = ACTIVE.includes(status)
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-accent' : 'bg-faint'}`}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}
