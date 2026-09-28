import { Hero } from '@/components/hero/Hero'
import { PipelineRail } from '@/components/pipeline/PipelineRail'
import { Section } from '@/components/ui/Section'
import { MobileNav } from '@/components/ui/MobileNav'
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding'
import { Work } from '@/components/sections/Work'
import { Engineering } from '@/components/sections/Engineering'
import { AI } from '@/components/sections/AI'
import { Dafsha } from '@/components/sections/Dafsha'
import { Journey } from '@/components/sections/Journey'
import { Notes } from '@/components/sections/Notes'
import { About } from '@/components/sections/About'
import { Connect } from '@/components/sections/Connect'
import { stage, stages } from '@/content/stages'
import { site } from '@/content/site'
import { threads } from '@/content/threads'
import { projects } from '@/content/projects'
import { stack } from '@/content/stack'
import { agents } from '@/content/agents'
import { engineering } from '@/content/engineering'
import { ai } from '@/content/ai'
import { dafsha } from '@/content/dafsha'
import { journey } from '@/content/journey'
import { about } from '@/content/about'
import { connect } from '@/content/connect'
import { portraitSrc } from '@/lib/portrait'
import { getNotes } from '@/lib/notes'

/** A stage rendered with the standard header column. */
function Stage({ id, children }: { id: Parameters<typeof stage>[0]; children: React.ReactNode }) {
  const s = stage(id)
  return (
    <Section id={s.id} eyebrow={s.eyebrow} label={s.label} title={s.title} intro={s.intro || undefined}>
      {children}
    </Section>
  )
}

export default function Home() {
  const notes = stage('notes')
  return (
    <>
      <Hero threadCount={threads.length} portraitSrc={portraitSrc()} />
      <main id="main">
        <Stage id="building">
          <CurrentlyBuilding threads={threads} />
        </Stage>
        <Stage id="work">
          <Work projects={projects} />
        </Stage>
        <Stage id="engineering">
          <Engineering layers={stack} note={engineering.note} />
        </Stage>
        <Stage id="ai">
          <AI flow={ai.flow} agents={agents} />
        </Stage>

        <Dafsha stage={stage('dafsha')} content={dafsha} />

        <Stage id="journey">
          <Journey stages={journey} />
        </Stage>
        <Stage id="notes">
          <Notes notes={getNotes().slice(0, 3)} more={notes.more ?? 'All notes'} />
        </Stage>
        <Stage id="about">
          <About content={about} />
        </Stage>

        <Connect stage={stage('connect')} content={connect} links={site.links} name={site.name} footerNote={site.footerNote} />
      </main>
      <PipelineRail stages={stages} />
      <MobileNav items={stages.filter((s) => s.nav)} />
    </>
  )
}
