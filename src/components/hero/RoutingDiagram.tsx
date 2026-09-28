import { Packet } from '@/components/pipeline/Packet'

const W = 1200
const H = 150
// Node x-positions along the band; the path dips between them so it reads as a
// route, not a ruler. The final leg runs off the right edge.
const NODES = [140, 460, 780, 1100]
const Y = 70
const PATH = [
  `M -20 ${Y}`,
  `L ${NODES[0]} ${Y}`,
  `C ${NODES[0] + 120} ${Y}, ${NODES[1] - 120} ${Y + 34}, ${NODES[1]} ${Y + 34}`,
  `C ${NODES[1] + 120} ${Y + 34}, ${NODES[2] - 120} ${Y - 30}, ${NODES[2]} ${Y - 30}`,
  `C ${NODES[2] + 120} ${Y - 30}, ${NODES[3] - 120} ${Y + 20}, ${NODES[3]} ${Y + 20}`,
  `L ${W + 20} ${Y + 20}`,
].join(' ')
const NODE_Y = [Y, Y + 34, Y - 30, Y + 20]

/**
 * The four fields as nodes on one route. Server-rendered: packets are SMIL,
 * and the reduced-motion alternative is toggled purely in CSS so the markup
 * is identical on server and client.
 */
export function RoutingDiagram({ words }: { words: readonly string[] }) {
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" aria-hidden fill="none">
        <path id="hero-route" d={PATH} stroke="var(--color-line-strong)" strokeWidth={1} />
        {words.map((w, i) => (
          <g key={w} transform={`translate(${NODES[i]} ${NODE_Y[i]})`}>
            <circle r={4} fill="var(--color-bg)" stroke="var(--color-muted)" strokeWidth={1} />
            <text
              y={-16}
              textAnchor="middle"
              fill="var(--color-muted)"
              fontFamily="var(--font-mono)"
              fontSize={12}
              letterSpacing={2.2}
            >
              {w}
            </text>
          </g>
        ))}
        <g className="motion-reduce:hidden">
          <Packet pathId="hero-route" dur="9s" begin="0s" />
          <Packet pathId="hero-route" dur="9s" begin="-3s" opacity={0.6} r={2.5} />
          <Packet pathId="hero-route" dur="9s" begin="-6s" opacity={0.35} r={2} />
        </g>
        <circle className="motion-safe:hidden" cx={NODES[1]} cy={NODE_Y[1]} r={3} fill="var(--color-accent)" />
      </svg>

      {/* Phone: the same four nodes on a straight hairline; the rail continues it. */}
      <ol className="relative flex justify-between md:hidden" aria-label="What I work across">
        <span aria-hidden className="absolute left-0 right-0 top-[3px] h-px bg-line-strong" />
        {words.map((w, i) => (
          <li key={w} className="relative flex flex-col items-center gap-3">
            <span
              aria-hidden
              className={`block h-[7px] w-[7px] rounded-full border ${
                i === 1 ? 'border-accent bg-accent' : 'border-muted bg-bg'
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{w}</span>
          </li>
        ))}
      </ol>
    </>
  )
}
