import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FilterToolbarProps {
  className?: string;
  children: ReactNode;
  rightActions?: ReactNode;
}

export function FilterToolbar({ 
  className, 
  children, 
  rightActions 
}: FilterToolbarProps) {
  return (
    <div className={cn(
      "flex items-center justify-between w-full bg-background",
      className
    )}>
      <div className="flex items-center space-x-2 w-full mr-2">
        {children}
      </div>
      {rightActions && (
        <div className="flex items-center space-x-2">
          {rightActions}
        </div>
      )}
    </div>
  )
} 