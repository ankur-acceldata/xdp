'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { format } from 'date-fns'

type RunStatus = 'success' | 'failed' | null

interface RunDetails {
  id?: string;
  status: RunStatus;
  timestamp?: string;
}

interface RunStatusIndicatorProps {
  runs: (RunDetails | null)[];
}

export function RunStatusIndicator({ runs }: RunStatusIndicatorProps) {
  const statusClasses = {
    success: 'bg-green-500',
    failed: 'bg-red-500',
    null: 'text-gray-400'
  }

  const renderRun = (run: RunDetails | null, index: number, isRecentRun: boolean) => {
    const status = run?.status ?? null
    
    const dotContent = status ? (
      <div 
        key={index} 
        className={cn(
          'w-4 h-4 rounded-full', // Slightly bigger dots
          statusClasses[status]
        )}
      />
    ) : (
      <div 
        key={index} 
        className={cn(
          'w-4 h-4 flex items-center justify-center font-bold', 
          statusClasses.null
        )}
      >
        —
      </div>
    )

    const runElement = !run ? (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <div>{dotContent}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">No run data available</p>
        </TooltipContent>
      </Tooltip>
    ) : (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <div>{dotContent}</div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <p><span className="font-bold">Run ID:</span> {run.id ?? 'N/A'}</p>
            <p><span className="font-bold">Status:</span> {run.status}</p>
            {run.timestamp && (
              <p>
                <span className="font-bold">Date:</span> {format(new Date(run.timestamp), 'MMM dd, yyyy HH:mm:ss')}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )

    return isRecentRun ? (
      <div key={index} className="flex items-center">
        {runElement}
        <div className="h-4 ms-2 border-r border-gray-300 self-center" />
      </div>
    ) : runElement
  }

  return (
    <TooltipProvider>
      <div className="flex items-center">
        <div className="flex space-x-2 items-center">
          {runs.map((run, index) => renderRun(run, index, index === 0))}
          {runs.length < 5 && 
            Array(5 - runs.length).fill(null).map((_, index) => 
              renderRun(null, runs.length + index, false)
            )
          }
        </div>
      </div>
    </TooltipProvider>
  )
} 