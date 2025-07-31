import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Robel Estifanos - Founding Engineer",
  description:
    "Building software that amplifies human compassion. Founding engineer focused on social impact technology.",
  keywords:
    "Robel Estifanos, founding engineer, social impact, technology, Ethiopian heritage, Trestle, human services",
  authors: [{ name: "Robel Estifanos" }],
  creator: "Robel Estifanos",
  openGraph: {
    title: "Robel Estifanos - Founding Engineer",
    description: "Building software that amplifies human compassion",
    url: "https://robelestifanos.com",
    siteName: "Robel Estifanos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robel Estifanos - Founding Engineer",
    description: "Building software that amplifies human compassion",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
