import { Hero } from '@/components/hero/Hero'
import { Section } from '@/components/ui/Section'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { stage } from '@/content/stages'
import { threads } from '@/content/threads'

export default function Home() {
  const building = stage('building')
  return (
    <>
      <Hero threadCount={threads.length} />
      <main id="main">
        <Section id={building.id} eyebrow={building.eyebrow} label={building.label} title="Four threads, one loop.">
          <StatusBadge status="building" />
          <LinkArrow href="#connect" className="mt-6">Connect</LinkArrow>
        </Section>
      </main>
    </>
  )
}
