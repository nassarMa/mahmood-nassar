import { Fraunces, Geist, Geist_Mono } from 'next/font/google'

// Two static instances instead of the full variable font: roughly a quarter of the bytes.
export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

export const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
