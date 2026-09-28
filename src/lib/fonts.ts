import { Fraunces, Geist, Geist_Mono } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  weight: 'variable',
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
