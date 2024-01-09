import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/nav/Navbar'
import Sessionprovider from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Yusuf M. Afif',
    default: 'Yusuf M. Afif',
  },
  description: "Yusuf M. Afif s' blog",
  openGraph: {
    title: "Yusuf M. Afif s' blog",
    url: process.env.SITE_URL,
    siteName: 'Yusuf M. Afif',
    images: "/Afif.jpg",
    type: 'website',
  },
  keywords: ['untuk SEO']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <main className='max-w-6xl mx-auto p-10 space-y-5'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Sessionprovider />
      </body>
    </html>
  )
}
