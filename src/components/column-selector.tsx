import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Settings2 } from 'lucide-react'

export interface ColumnDefinition {
  id: string;
  label: string;
}

interface ColumnSelectorProps {
  columns: ColumnDefinition[];
  selectedColumns: string[];
  onColumnToggle: (columnId: string) => void;
}

export function ColumnSelector({ 
  columns, 
  selectedColumns, 
  onColumnToggle 
}: ColumnSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="border-none shadow-none">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-4">
          <h4 className="font-medium text-sm">Select Columns</h4>
          <div className="grid gap-2">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center space-x-2">
                <Checkbox
                  id={column.id}
                  checked={selectedColumns.includes(column.id)}
                  onCheckedChange={() => onColumnToggle(column.id)}
                />
                <label 
                  htmlFor={column.id} 
                  className="text-sm font-medium leading-none"
                >
                  {column.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 