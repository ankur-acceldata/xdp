'use client'

import React, { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { ColumnSelector, ColumnDefinition } from '../column-selector'

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition[];
  renderRow: (item: T, selectedColumns: string[]) => React.ReactNode;
  title?: string;
}

export function DataTable<T>({ 
  data, 
  columns, 
  renderRow, 
  title 
}: DataTableProps<T>) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(col => col.id)
  )

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        <ColumnSelector 
          columns={columns}
          selectedColumns={selectedColumns}
          onColumnToggle={handleColumnToggle}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns
              .filter(col => selectedColumns.includes(col.id))
              .map(col => (
                <TableHead key={col.id}>{col.label}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {renderRow(item, selectedColumns)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 