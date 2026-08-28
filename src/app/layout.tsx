import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amatis · Business Consultancy Agency',
  description: 'Amatis is a business consultancy agency helping companies grow with strategy, marketing and technology.',
  icons: {
    icon: '/assets/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900;1000&family=Vazirmatn:wght@600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}