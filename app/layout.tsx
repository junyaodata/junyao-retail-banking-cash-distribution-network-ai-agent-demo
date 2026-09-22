import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import { loadSite } from "@/lib/site/load"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// Designed for enterprise systems software -- headings and the wordmark read
// as engineered rather than as a marketing site. See tailwind.config.ts.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"]
})
// Numeric readouts only: the reported/true figures, table and chart values.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"]
})

const { seo } = loadSite()

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: seo.title,
    description: seo.description,
  }),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
