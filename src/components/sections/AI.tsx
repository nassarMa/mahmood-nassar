import type { AgentKind } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { AgentFlow } from './AgentFlow'

type Props = { flow: { name: string; does: string }[]; agents: AgentKind[] }

export function AI({ flow, agents }: Props) {
  return (
    <Reveal>
      <AgentFlow flow={flow} agents={agents} />
    </Reveal>
  )
}
