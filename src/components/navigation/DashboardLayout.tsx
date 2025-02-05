'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: React.ReactNode
  logo?: string
}

export function DashboardLayout({ children, logo = "/images/ad-logo-white.png" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        logo={logo}
      />

      <div className="flex min-h-screen flex-col lg:ml-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4">
              {/* Add your header content here */}
            </div>
          </div>
        </div>

        <main className="flex-1 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 