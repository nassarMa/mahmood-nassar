import type { Project } from '@/lib/content'
import { AppIcon } from './AppIcon'

export function Dock({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null
  return (
    <footer className="sticky bottom-0 z-20 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-2">
      <nav aria-label="Featured" className="glass flex items-center justify-around rounded-[28px] px-3 py-2.5">
        {projects.map((p) => (
          <AppIcon key={p.slug} project={p} size="dock" />
        ))}
      </nav>
    </footer>
  )
}
