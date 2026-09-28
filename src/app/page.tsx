import { Hero } from '@/components/hero/Hero'
import { Section } from '@/components/ui/Section'
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding'
import { Work } from '@/components/sections/Work'
import { stage } from '@/content/stages'
import { threads } from '@/content/threads'
import { projects } from '@/content/projects'
import { portraitSrc } from '@/lib/portrait'

export default function Home() {
  const building = stage('building')
  const work = stage('work')
  return (
    <>
      <Hero threadCount={threads.length} portraitSrc={portraitSrc()} />
      <main id="main">
        <Section
          id={building.id}
          eyebrow={building.eyebrow}
          label={building.label}
          title="Four threads, one loop."
          intro="Everything I work on runs through the same loop: problem, research, architecture, prototype, automation, product, feedback, iteration. These are the threads on it right now."
        >
          <CurrentlyBuilding threads={threads} />
        </Section>

        <Section
          id={work.id}
          eyebrow={work.eyebrow}
          label={work.label}
          title="Stories, not screenshots."
          intro="Each piece of work told the way it happened: the problem I noticed, how I thought about it, what I built, and what I learned. Statuses are honest."
        >
          <Work projects={projects} />
        </Section>
      </main>
    </>
  )
}
