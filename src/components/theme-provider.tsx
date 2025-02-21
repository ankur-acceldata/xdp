'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, Attribute } from 'next-themes'

export function ThemeProvider({ 
  children, 
  attribute, 
  defaultTheme, 
  enableSystem, 
  disableTransitionOnChange, 
  ...props 
}: { 
  children: React.ReactNode, 
  attribute?: Attribute, 
  defaultTheme?: string, 
  enableSystem?: boolean, 
  disableTransitionOnChange?: boolean 
}) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
} 