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
import { TableSkeleton } from '@/components/ui/table-skeleton'

interface DataTableProps<TData> {
  columns: {
    id: string;
    header: string;
    cell: (data: TData) => React.ReactNode;
    sortable?: boolean;
  }[];
  data: TData[];
  selectedColumns?: string[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export function DataTable<TData>({
  columns,
  data,
  selectedColumns: propSelectedColumns,
  isLoading = false,
  emptyStateMessage = 'No data available',
  onSortChange
}: DataTableProps<TData>) {
  const [selectedColumns] = useState<string[]>(
    propSelectedColumns ?? columns.map(col => col.id)
  )

  const filteredColumns = columns.filter(col => selectedColumns.includes(col.id))

  return (
    <div className="space-y-4">
      <div className="rounded-md border text-xs">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              {filteredColumns.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={filteredColumns.length} className="h-24 text-center">
                  <TableSkeleton columns={filteredColumns.length} />
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index} className="text-xs">
                  {filteredColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={filteredColumns.length} className="h-24 text-center text-xs">
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 