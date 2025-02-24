import React from 'react'
import { cn } from '@/lib/utils'

type RunStatus = 'success' | 'failed' | null

interface RunStatusIndicatorProps {
  runs: RunStatus[]
}

export function RunStatusIndicator({ runs }: RunStatusIndicatorProps) {
  const statusClasses = {
    success: 'bg-green-500',
    failed: 'bg-red-500',
    null: 'bg-gray-300'
  }

  return (
    <div className="flex space-x-1 items-center">
      {runs.map((status, index) => (
        <div 
          key={index} 
          className={cn(
            'w-2 h-2 rounded-full',
            status ? statusClasses[status] : statusClasses.null
          )}
        />
      ))}
    </div>
  )
} 