type Props = { children: React.ReactNode; className?: string }

export function Eyebrow({ children, className = '' }: Props) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}
