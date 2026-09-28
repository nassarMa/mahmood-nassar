/** The stages on the pipeline, in page order. Drives section headers and the rail. */
export const stages = [
  { id: 'building', label: 'Building', eyebrow: '01 — Currently building' },
  { id: 'work', label: 'Work', eyebrow: '02 — Selected work' },
  { id: 'engineering', label: 'Engineering', eyebrow: '03 — Engineering' },
  { id: 'ai', label: 'AI', eyebrow: '04 — AI' },
  { id: 'dafsha', label: 'Dafsha', eyebrow: '05 — Dafsha · community' },
  { id: 'journey', label: 'Journey', eyebrow: '06 — Journey' },
  { id: 'notes', label: 'Notes', eyebrow: '07 — Field notes' },
  { id: 'about', label: 'About', eyebrow: '08 — About' },
  { id: 'connect', label: 'Connect', eyebrow: '09 — Connect' },
] as const

export type StageId = (typeof stages)[number]['id']
export type StageInfo = { id: StageId; label: string; eyebrow: string }

export function stage(id: StageId): StageInfo {
  return stages.find((s) => s.id === id)!
}
