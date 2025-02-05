'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { ChevronRightIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { classNames } from './NavigationConfig'

interface DashboardLayoutProps {
  children: React.ReactNode
  logo?: string
  title?: string
}

export function DashboardLayout({ children, logo = "/images/ad-logo-white.png", title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        logo={logo}
        isCollapsed={isCollapsed}
      />

      <div
        className={classNames(
          'flex min-h-screen flex-col',
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64',
          'transition-all duration-300'
        )}
      >
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
          </div>

          <div className="flex flex-1 justify-between gap-x-4 self-stretch lg:gap-x-6">
            {title && (
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            )}
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