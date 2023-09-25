import './globals.css'
import { Inter } from 'next/font/google'
import SearchAppBar from './components/SearchAppBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jason Cookbook App',
  description: 'This cookbook is your ultimate culinary companion, designed to inspire and elevate your cooking experience. This app was created as part of a technical project with Appiphony.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchAppBar />
        {children}
      
      </body>
    </html>
  )
}
