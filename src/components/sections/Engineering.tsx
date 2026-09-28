import type { Layer } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { EngineeringMap } from './EngineeringMap'

export function Engineering({ layers, note }: { layers: Layer[]; note: string }) {
  return (
    <Reveal>
      <EngineeringMap layers={layers} />
      <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-faint">{note}</p>
    </Reveal>
  )
}
