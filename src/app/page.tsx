import { Section } from '@/components/ui/Section'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { LinkArrow } from '@/components/ui/LinkArrow'

export default function Home() {
  return (
    <main id="main">
      <div className="px-4 py-24 md:px-8">
        <h1 className="font-display text-[length:var(--text-display)] font-light leading-none">
          Mahmood Nassar
        </h1>
      </div>
      <Section id="building" eyebrow="01 — Currently building" label="Building" title="Four threads, one loop.">
        <StatusBadge status="building" />
        <LinkArrow href="#connect" className="mt-6">Connect</LinkArrow>
      </Section>
    </main>
  )
}
