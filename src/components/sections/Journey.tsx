import type { Stage } from '@/content/types'
import { JourneyLine } from './JourneyLine'

export function Journey({ stages }: { stages: Stage[] }) {
  return <JourneyLine stages={stages} />
}
