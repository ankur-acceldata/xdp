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
    null: 'bg-gray-300'
  }

  const renderRun = (run: RunDetails | null, index: number) => {
    const status = run?.status ?? null
    
    const dotContent = (
      <div 
        key={index} 
        className={cn(
          'w-3 h-3 rounded-full', // Slightly bigger dots
          status ? statusClasses[status] : statusClasses.null
        )}
      />
    )

    if (!run) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger>{dotContent}</TooltipTrigger>
          <TooltipContent>
            <p>No run data available</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <Tooltip key={index}>
        <TooltipTrigger>{dotContent}</TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p>Run ID: {run.id ?? 'N/A'}</p>
            <p>Status: {run.status}</p>
            {run.timestamp && (
              <p>
                Date: {format(new Date(run.timestamp), 'MMM dd, yyyy HH:mm:ss')}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex space-x-1.5 items-center">
        {runs.map((run, index) => renderRun(run, index))}
        {runs.length < 5 && 
          Array(5 - runs.length).fill(null).map((_, index) => renderRun(null, runs.length + index))
        }
      </div>
    </TooltipProvider>
  )
} 