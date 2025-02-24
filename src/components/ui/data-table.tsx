'use client'

import React, { useState, useRef } from 'react'
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { ColumnSelector, ColumnDefinition } from '../column-selector'
import { TableSkeleton } from './table-skeleton'

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition[];
  renderRow: (item: T, selectedColumns: string[]) => React.ReactNode;
  isLoading?: boolean;
  selectedColumns?: string[];
}

export function DataTable<T>({ 
  data, 
  columns, 
  renderRow, 
  isLoading = false,
  selectedColumns: propSelectedColumns
}: DataTableProps<T>) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    propSelectedColumns || columns.map(col => col.id)
  )
  const [columnWidths, setColumnWidths] = useState<{[key: string]: number}>({})
  const tableRef = useRef<HTMLTableElement>(null)

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  const handleMouseDown = (columnId: string, e: React.MouseEvent) => {
    const startX = e.pageX
    const startWidth = columnWidths[columnId] || 0

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.pageX - startX)
      setColumnWidths(prev => ({
        ...prev,
        [columnId]: Math.max(50, newWidth) // Minimum width of 50px
      }))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  if (isLoading) {
    return <TableSkeleton columns={columns.length} />
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table ref={tableRef}>
        <TableHeader>
          <TableRow>
            {columns
              .filter(col => selectedColumns.includes(col.id))
              .map(col => (
                <TableHead 
                  key={col.id} 
                  className="relative"
                  style={{ 
                    width: columnWidths[col.id] ? `${columnWidths[col.id]}px` : 'auto',
                    minWidth: '100px'
                  }}
                >
                  <div className="flex items-center justify-between">
                    {col.label}
                    <div 
                      onMouseDown={(e) => handleMouseDown(col.id, e)}
                      className="w-1 h-full absolute right-0 top-0 cursor-col-resize hover:bg-gray-300"
                    />
                  </div>
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {renderRow(item, selectedColumns)}
              {selectedColumns.length === 0 && <td></td>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 