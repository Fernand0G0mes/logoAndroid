import './globals.css'
import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Nutrana',
  description: 'Plan nutricional personalizado en 2 minutos',
  icons: {
    icon: "/logoNutrana.png", // ← aqui você coloca o seu novo logo!
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans antialiased min-h-screen m-0 p-0">
        {children}
      </body>
    </html>
  )
}