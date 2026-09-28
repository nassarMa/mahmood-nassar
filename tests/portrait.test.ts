import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { portraitSrc } from '../src/lib/portrait'

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'portrait-'))

assert.equal(portraitSrc(tmp), undefined, 'no file → undefined')

fs.mkdirSync(path.join(tmp, 'public/images'), { recursive: true })
fs.writeFileSync(path.join(tmp, 'public/images/mahmood.jpg'), '')
assert.equal(portraitSrc(tmp), '/images/mahmood.jpg', 'file present → public path')

fs.rmSync(tmp, { recursive: true })
console.log('portrait ok')
