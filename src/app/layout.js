import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Diario CAS de Alvaro Sakuda',
  description: 'El diario CAS de Alvaro Sakuda es un proyecto del colegio La Unión que busca llevar un registro de sus actividades de CAS.',
}

export default function RootLayout({ children }) {
  return (

    <html lang="es">

      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
