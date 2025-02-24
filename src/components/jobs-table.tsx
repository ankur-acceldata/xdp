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
  recentRuns: Array<{ 
    id?: string; 
    status: string | null, 
    timestamp?: string 
  } | null>;
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Jobs</h2>
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
                    runs={job.recentRuns.map(run => run ? {
                      id: run.id,
                      status: run.status === 'success' ? 'success' : 
                              run.status === 'failed' ? 'failed' : 
                              null,
                      timestamp: run.timestamp
                    } : null)} 
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