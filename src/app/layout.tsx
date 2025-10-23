'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Home, 
  UserPlus, 
  LogIn
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

// Sidebar Component
const Sidebar = () => {
  const pathname = usePathname()
  
  const sidebarLinks = [
    { href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { href: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { href: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ]

  // Hide sidebar on home, login, and register pages
  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <div className="w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 h-full">
      <div className="p-6">
        <Link href="/" className="block mb-8">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            LuminaFlow.ai
          </h1>
        </Link>
        
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === link.href
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

// Topbar Component
const Topbar = () => {
  const pathname = usePathname()
  
  const topbarLinks = [
    { href: '/', icon: <Home className="w-4 h-4" />, label: 'Home' },
    { href: '/register', icon: <UserPlus className="w-4 h-4" />, label: 'Register' },
    { href: '/login', icon: <LogIn className="w-4 h-4" />, label: 'Login' },
  ]

  // Hide topbar on home, login, and register pages
  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <div className="h-16 bg-gray-800/30 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-6">
      <Link href="/" className="block lg:hidden">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          LuminaFlow.ai
        </h1>
      </Link>
      
      <div className="flex items-center space-x-4 ml-auto">
        {topbarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              pathname === link.href
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
            }`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="flex h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <Topbar />
            
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}