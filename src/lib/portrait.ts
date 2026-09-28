import fs from 'node:fs'
import path from 'node:path'

const PUBLIC_PATH = '/images/mahmood.jpg'

/**
 * Build-time check for the hero portrait. Returns its public URL when
 * `public/images/mahmood.jpg` exists, otherwise undefined so the hero renders
 * its placeholder. Server-only.
 */
export function portraitSrc(root = process.cwd()): string | undefined {
  return fs.existsSync(path.join(root, 'public', PUBLIC_PATH)) ? PUBLIC_PATH : undefined
}
