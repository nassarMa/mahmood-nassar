import { HomeScreen } from '@/components/HomeScreen'
import { TopBar } from '@/components/TopBar'
import { Dock } from '@/components/Dock'
import { loadHub } from '@/lib/content'

export default function Home() {
  const { creator, projects, dock, folders } = loadHub()
  return (
    <main id="main" className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <TopBar creator={creator} />
      <HomeScreen projects={projects} folders={folders.folders} loose={folders.loose} />
      <Dock projects={dock} />
    </main>
  )
}
