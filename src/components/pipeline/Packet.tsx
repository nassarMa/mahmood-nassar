type Props = {
  /** id of an SVG <path> in the same document to travel along. */
  pathId: string
  dur?: string
  /** Use a negative offset (e.g. "-3s") to start mid-route; a positive delay would leave the dot at the origin until it fires. */
  begin?: string
  r?: number
  opacity?: number
}

/**
 * A small accent dot travelling along a path. SMIL keeps it off the main
 * thread and works on SVG children everywhere; callers render a static dot
 * instead when motion is reduced.
 */
export function Packet({ pathId, dur = '6s', begin = '0s', r = 3, opacity = 0.9 }: Props) {
  return (
    <circle r={r} fill="var(--color-accent)" opacity={opacity}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  )
}
