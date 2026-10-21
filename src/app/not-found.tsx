import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-5xl">🫥</p>
      <h1 className="text-xl font-semibold">That project isn’t here</h1>
      <p className="text-sm text-muted">It may have moved or been retired.</p>
      <Link href="/" className="rounded-2xl bg-text px-5 py-2.5 text-sm font-semibold text-bg">
        See all projects
      </Link>
    </main>
  )
}
