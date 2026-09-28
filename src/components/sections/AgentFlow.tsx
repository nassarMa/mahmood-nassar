import type { AgentKind } from '@/content/types'

type Node = { name: string; does: string }

/**
 * The pipeline zoomed in on one loop: five nodes on a vertical line with a
 * packet running down it, and the kinds of agent branching off the Agent node.
 */
export function AgentFlow({ flow, agents }: { flow: Node[]; agents: AgentKind[] }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-3 left-[3px] top-3 w-px bg-line-strong">
        <span className="packet-drop absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent motion-reduce:hidden" />
      </span>
      <ol className="space-y-8">
        {flow.map((node, i) => (
          <li
            key={node.name}
            data-flow-node={node.name}
            className="relative grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[20px_120px_1fr]"
          >
            <span
              aria-hidden
              className={`mt-2 h-[7px] w-[7px] rounded-full border ${
                i === 1 ? 'border-accent bg-accent' : 'border-muted bg-bg'
              }`}
            />
            <h3 className="font-display text-[1.35rem] font-light leading-tight">{node.name}</h3>
            <div className="col-start-2 sm:col-start-3">
              <p className="text-[15.5px] leading-relaxed text-muted">{node.does}</p>
              {i === 1 ? <AgentKinds agents={agents} /> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function AgentKinds({ agents }: { agents: AgentKind[] }) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {agents.map((a) => (
        <li key={a.name} data-agent={a.name} className="border hairline bg-surface px-4 py-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-text">{a.name} agent</p>
          <p className="mt-1 text-[14px] leading-relaxed text-muted">{a.does}</p>
        </li>
      ))}
    </ul>
  )
}
