import { notFound } from 'next/navigation'
import { ProjectSheet } from '@/components/ProjectSheet'
import { loadProject } from '@/lib/content'

/** Intercepts /p/[slug] when navigated from the grid: renders the sheet over the home screen. */
export default async function SheetSlot({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let project
  try {
    project = loadProject(slug)
  } catch {
    notFound()
  }
  return <ProjectSheet project={project} modal />
}
