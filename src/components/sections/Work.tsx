import type { Project } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectStory } from './ProjectStory'

export function Work({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {projects.map((p, i) => (
        <Reveal key={p.slug}>
          <ProjectStory project={p} index={i} />
        </Reveal>
      ))}
    </div>
  )
}
