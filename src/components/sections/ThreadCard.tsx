import type { Thread } from '@/content/types'
import { StatusBadge } from '@/components/ui/StatusBadge'

/** One thread branching off the pipeline: number, title, what it is, status. */
export function ThreadCard({ thread }: { thread: Thread }) {
  const Wrapper = thread.anchor ? 'a' : 'div'
  return (
    <Wrapper
      data-thread={thread.n}
      href={thread.anchor}
      className="group relative flex h-full flex-col border hairline bg-surface p-6 transition-colors hover:border-line-strong md:p-7"
    >
      <span aria-hidden className="absolute -left-px top-9 h-px w-3 bg-line-strong md:-left-8 md:w-8" />
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[12px] tracking-[0.18em] text-faint">{thread.n}</span>
        <StatusBadge status={thread.status} />
      </div>
      <h3 className="mt-6 font-display text-[1.75rem] font-light leading-tight tracking-[-0.01em]">
        {thread.title}
      </h3>
      <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{thread.body}</p>
      {thread.anchor ? (
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
          More <span aria-hidden>↓</span>
        </span>
      ) : null}
    </Wrapper>
  )
}
