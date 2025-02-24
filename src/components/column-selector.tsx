'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Columns3, ArrowUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface ColumnDefinition {
  id: string;
  label: string;
  sortable?: boolean;
}

interface ColumnSelectorProps {
  columns: ColumnDefinition[];
  selectedColumns: string[];
  onColumnToggle: (columnId: string) => void;
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export function ColumnSelector({ 
  columns, 
  selectedColumns, 
  onColumnToggle,
  onSortChange 
}: ColumnSelectorProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSortChange = (columnId: string) => {
    const newDirection = sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortColumn(columnId)
    setSortDirection(newDirection)
    onSortChange?.(columnId, newDirection)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-none shadow-none">
          <Columns3 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={selectedColumns.includes(column.id)}
            onCheckedChange={() => onColumnToggle(column.id)}
            className="flex items-center justify-between"
          >
            <span>{column.label}</span>
            {column.sortable && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSortChange(column.id)
                }}
              >
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </DropdownMenuCheckboxItem>
        ))}
        
        {sortColumn && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              Sorted by: {columns.find(c => c.id === sortColumn)?.label} 
              {` (${sortDirection === 'asc' ? 'Ascending' : 'Descending'})`}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 