import { Hero } from '@/components/hero/Hero'
import { Section } from '@/components/ui/Section'
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding'
import { Work } from '@/components/sections/Work'
import { Engineering } from '@/components/sections/Engineering'
import { AI } from '@/components/sections/AI'
import { Dafsha } from '@/components/sections/Dafsha'
import { Journey } from '@/components/sections/Journey'
import { dafsha } from '@/content/dafsha'
import { journey } from '@/content/journey'
import { stage } from '@/content/stages'
import { threads } from '@/content/threads'
import { projects } from '@/content/projects'
import { stack } from '@/content/stack'
import { agents } from '@/content/agents'
import { engineering } from '@/content/engineering'
import { ai } from '@/content/ai'
import { portraitSrc } from '@/lib/portrait'

export default function Home() {
  const building = stage('building')
  const work = stage('work')
  const eng = stage('engineering')
  const aiStage = stage('ai')
  const journeyStage = stage('journey')
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

        <Section id={eng.id} eyebrow={eng.eyebrow} label={eng.label} title={engineering.title} intro={engineering.intro}>
          <Engineering layers={stack} note={engineering.note} />
        </Section>

        <Section id={aiStage.id} eyebrow={aiStage.eyebrow} label={aiStage.label} title={ai.title} intro={ai.intro}>
          <AI flow={ai.flow} agents={agents} />
        </Section>

        <Dafsha stage={stage('dafsha')} content={dafsha} />

        <Section
          id={journeyStage.id}
          eyebrow={journeyStage.eyebrow}
          label={journeyStage.label}
          title="Expanding scope."
          intro="Not a résumé. The same person asking bigger questions: from how to test a thing, to how to build the system, to which problem is worth solving at all."
        >
          <Journey stages={journey} />
        </Section>
      </main>
    </>
  )
}
