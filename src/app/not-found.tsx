import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-aurora text-[96px] leading-none font-semibold tracking-[-0.06em]">404</p>
      <h1 className="text-[22px] font-semibold tracking-tight">That project isn’t here</h1>
      <p className="text-[15px] text-muted">It may have moved or been retired.</p>
      <Link href="/" className="btn btn-primary mt-2 px-6">
        See all projects
      </Link>
    </main>
  )
}
