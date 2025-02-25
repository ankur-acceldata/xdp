'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Columns3, Check, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ColumnDefinition {
  id: string;
  label: string;
  primary?: boolean;
}

interface ColumnSelectorProps {
  columns: ColumnDefinition[];
  selectedColumns: string[];
  onColumnToggle: (columnId: string) => void;
  primaryColumnId?: string;
}

export function ColumnSelector({ 
  columns, 
  selectedColumns, 
  onColumnToggle,
  primaryColumnId
}: ColumnSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleColumnToggle = (columnId: string) => {
    // Prevent unchecking primary column
    if (columnId === primaryColumnId) return
    
    onColumnToggle(columnId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="icon" 
        className="border-none shadow-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Columns3 className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
          <div className="px-3 py-2 text-sm font-medium text-foreground dark:text-gray-200">
            Select Columns
          </div>
          <div className="border-t dark:border-gray-700"></div>
          
          <div className="p-1">
            {columns.map((column) => {
              const isPrimary = column.id === primaryColumnId
              const isSelected = selectedColumns.includes(column.id)

              return (
                <div 
                  key={column.id}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    "dark:hover:bg-gray-700 dark:hover:text-gray-200",
                    "text-foreground dark:text-gray-300",
                    isPrimary && "cursor-not-allowed opacity-70"
                  )}
                  onClick={() => handleColumnToggle(column.id)}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    {isSelected && (
                      isPrimary ? (
                        <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )
                    )}
                  </div>
                  <span>{column.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 