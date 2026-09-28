type Props = { word: string; count: number }

export function StatusChip({ word, count }: Props) {
  return (
    <p className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border hairline px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-muted md:text-[12px] md:tracking-[0.06em]">
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span>
        {word}
        <span className="text-faint"> — </span>
        {count}
        <span className="hidden sm:inline"> active</span> threads
      </span>
    </p>
  )
}
