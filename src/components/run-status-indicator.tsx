'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { format } from 'date-fns'

export type RunStatus = 'success' | 'failed' | 'pending' | null

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
    pending: 'bg-blue-400 animate-pulse',
    null: 'text-gray-400'
  }

  const renderPending = (run: RunDetails | null, index: number, isRecentRun: boolean) => {
    return (
      <span className="relative flex size-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex size-4 rounded-full bg-amber-400"></span>
      </span>
    )
  }

  const renderCompleted = (run: RunDetails | null, index: number, isRecentRun: boolean) => {
    return (
      <div 
        key={index} 
        className={cn(
          'w-4 h-4 rounded-full cursor-pointer',
          {
            'bg-green-500': run?.status === 'success',
            'bg-red-500': run?.status === 'failed',
          }
        )}
      />
    )
  }

  const renderNull = (run: RunDetails | null, index: number, isRecentRun: boolean) => {
    return (
      <div 
        key={index} 
        className={cn(
          'w-4 h-4 flex items-center justify-center font-bold cursor-pointer', 
          statusClasses.null
        )}
      >
        —
      </div>
    )
  }

  const renderRun = (run: RunDetails | null, index: number, isRecentRun: boolean) => {
    const status = run?.status ?? null
    
    const dotContent = status === 'pending' ? renderPending(run, index, isRecentRun)
      : status ? renderCompleted(run, index, isRecentRun)
      : renderNull(run, index, isRecentRun);

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
            <p>
              <span className="font-bold">Status:</span> {run.status === 'pending' 
                ? 'In Progress' 
                : run.status}
            </p>
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