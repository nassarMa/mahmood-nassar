/** Reading column for note bodies. Styles come from `.prose-note` in globals.css. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose-note max-w-[68ch]">{children}</div>
}
