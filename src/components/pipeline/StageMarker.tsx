type Props = {
  id: string
  label: string
  active: boolean
}

export function StageMarker({ id, label, active }: Props) {
  return (
    <a
      href={`#${id}`}
      aria-label={label}
      aria-current={active ? 'true' : undefined}
      className="group relative flex h-7 items-center"
    >
      <span
        aria-hidden
        className={`block h-1.5 w-1.5 rounded-full transition-all duration-200 ${
          active ? 'scale-125 bg-accent' : 'bg-faint group-hover:bg-muted'
        }`}
      />
      <span
        aria-hidden
        className={`eyebrow pointer-events-none absolute left-5 whitespace-nowrap transition-opacity duration-200 ${
          active ? 'text-text opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {label}
      </span>
    </a>
  )
}
