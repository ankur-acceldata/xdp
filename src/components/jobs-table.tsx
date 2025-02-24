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
import { ColumnSelector, ColumnDefinition } from './column-selector'
import { RunStatusIndicator } from './run-status-indicator'
import { format } from 'date-fns'

export interface Job {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  recentRuns: Array<{ status: string | null, timestamp?: string }>;
}

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  const columns: ColumnDefinition[] = [
    { id: 'name', label: 'Job Name' },
    { id: 'createdBy', label: 'Created By' },
    { id: 'createdAt', label: 'Created Date' },
    { id: 'recentRuns', label: 'Recent Runs' }
  ]

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
      <div className="flex justify-end mb-4">
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
          {jobs.map(job => (
            <TableRow key={job.id}>
              {selectedColumns.includes('name') && (
                <TableCell>{job.name}</TableCell>
              )}
              {selectedColumns.includes('createdBy') && (
                <TableCell>{job.createdBy}</TableCell>
              )}
              {selectedColumns.includes('createdAt') && (
                <TableCell>
                  {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                </TableCell>
              )}
              {selectedColumns.includes('recentRuns') && (
                <TableCell>
                  <RunStatusIndicator 
                    runs={job.recentRuns.map(run => 
                      run.status === 'success' ? 'success' : 
                      run.status === 'failed' ? 'failed' : 
                      null
                    )} 
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 