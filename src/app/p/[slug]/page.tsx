import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectSheet } from '@/components/ProjectSheet'
import { loadProject, loadProjects } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return loadProjects().map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = tryLoad(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.tagline,
    alternates: { canonical: `/p/${slug}` },
    openGraph: { title: p.title, description: p.tagline, url: `/p/${slug}`, type: 'website' },
  }
}

function tryLoad(slug: string) {
  try {
    return loadProject(slug)
  } catch {
    return null
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = tryLoad(slug)
  if (!project) notFound()
  return <ProjectSheet project={project} modal={false} />
}
