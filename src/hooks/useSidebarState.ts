'use client'

import { useState, useEffect } from 'react'

const SIDEBAR_STATE_KEY = 'sidebar-collapsed-state'

export function useSidebarState() {
  // Initialize with undefined to prevent hydration mismatch
  const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(undefined)
  const [isHydrated, setIsHydrated] = useState(false)

  // After hydration, sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STATE_KEY)
    setIsCollapsed(saved ? JSON.parse(saved) : true) // Default to collapsed
    setIsHydrated(true)
  }, [])

  // Persist changes to localStorage
  useEffect(() => {
    if (isHydrated && typeof isCollapsed === 'boolean') {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isCollapsed))
    }
  }, [isCollapsed, isHydrated])

  return {
    // Return true during SSR/pre-hydration
    isCollapsed: typeof isCollapsed === 'boolean' ? isCollapsed : true,
    setIsCollapsed,
    isHydrated
  }
} 