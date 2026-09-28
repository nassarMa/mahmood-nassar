import Image from 'next/image'

type Props = { src?: string; alt: string }

/**
 * 4:5 portrait in a hairline frame with viewfinder corners. Without a source
 * it renders a designed placeholder of identical size, so the layout does not
 * change when the photo arrives.
 */
export function Portrait({ src, alt }: Props) {
  return (
    <figure data-testid="portrait" className="relative aspect-[4/5] w-full">
      <Corners />
      <div className="absolute inset-3 overflow-hidden border hairline bg-surface">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 72vw, 420px"
            className="object-cover"
          />
        ) : (
          <div className="relative h-full w-full">
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="var(--color-line-strong)" strokeWidth="1" />
            </svg>
            <span className="eyebrow absolute bottom-4 left-4">portrait</span>
          </div>
        )}
      </div>
    </figure>
  )
}

function Corners() {
  const c = 'absolute h-3 w-3 border-muted'
  return (
    <>
      <span aria-hidden className={`${c} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${c} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${c} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${c} bottom-0 right-0 border-b border-r`} />
    </>
  )
}
