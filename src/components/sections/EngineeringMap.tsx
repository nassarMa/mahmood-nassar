import type { Layer } from '@/content/types'

/**
 * Technologies shown where they live: four horizontal layers joined by one
 * vertical line, each item a node. Deliberately not a ranked list.
 */
export function EngineeringMap({ layers }: { layers: Layer[] }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-6 left-[3px] top-6 w-px bg-line-strong" />
      <ol>
        {layers.map((layer) => (
          <li
            key={layer.name}
            data-layer={layer.name}
            className="relative grid grid-cols-[20px_1fr] items-start gap-x-4 border-t hairline py-6 sm:grid-cols-[20px_140px_1fr] md:py-7"
          >
            <span aria-hidden className="mt-2 h-[7px] w-[7px] rounded-full border border-muted bg-bg" />
            <h3 className="eyebrow pt-1">{layer.name}</h3>
            <ul className="col-start-2 mt-3 flex flex-wrap gap-2 sm:col-start-3 sm:mt-0">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1 font-mono text-[13px] tracking-[0.02em] text-text"
                >
                  <span aria-hidden className="h-1 w-1 rounded-full bg-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className="border-t hairline" />
    </div>
  )
}
