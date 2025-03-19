import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillHive',
  description: 'The one place to learn and teach new skills.',
  generator: 'Fab Four',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
