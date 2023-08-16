import MainNavBar from '@/Components/MainNavBar/MainNavBar'
import './globals.scss'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@/Components/AuthProvider/AuthProvider';
import DataProvider from '@/Components/DataProvider/DataProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'Home Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider >
          <ToastContainer />
          <MainNavBar />
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}
