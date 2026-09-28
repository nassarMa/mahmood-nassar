import type { Thread } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { ThreadCard } from './ThreadCard'

export function CurrentlyBuilding({ threads }: { threads: Thread[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {threads.map((t, i) => (
        <Reveal key={t.n} delay={i * 0.06}>
          <ThreadCard thread={t} />
        </Reveal>
      ))}
    </div>
  )
}
