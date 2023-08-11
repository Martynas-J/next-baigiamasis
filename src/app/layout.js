import MainNavBar from '@/Components/MainNavBar/MainNavBar'
import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'Home Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavBar />
        {children}
        </body>
    </html>
  )
}
