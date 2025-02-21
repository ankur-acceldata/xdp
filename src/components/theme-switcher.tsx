'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Prevent rendering until mounted to avoid hydration errors
  if (!mounted) {
    return null
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="h-8 w-8"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-6 w-6 rotate-0 scale-100 transition-all" />
      )}
    </Button>
  )
}
