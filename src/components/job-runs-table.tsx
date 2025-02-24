'use client'

import React from 'react'
import { TableCell } from '@/components/ui/table'
import { DataTable } from '@/components/ui/data-table'
import { format } from 'date-fns'
import { ColumnDefinition } from './column-selector'
import { Badge } from '@/components/ui/badge'

export interface JobRun {
  id: string;
  jobId: string;
  jobName: string;
  status: 'success' | 'failed' | 'pending';
  startedAt: string;
  completedAt?: string;
  duration?: number;
}

interface JobRunsTableProps {
  runs: JobRun[];
  isLoading?: boolean;
  selectedColumns?: string[];
}

export function JobRunsTable({ 
  runs, 
  isLoading,
  selectedColumns: propSelectedColumns 
}: JobRunsTableProps) {
  const columns: ColumnDefinition[] = [
    { id: 'jobName', label: 'Job Name' },
    { id: 'status', label: 'Status' },
    { id: 'startedAt', label: 'Started At' },
    { id: 'completedAt', label: 'Completed At' },
    { id: 'duration', label: 'Duration' }
  ]

  const renderJobRunRow = (run: JobRun, selectedColumns: string[]) => (
    <>
      {selectedColumns.includes('jobName') && (
        <TableCell>{run.jobName}</TableCell>
      )}
      {selectedColumns.includes('status') && (
        <TableCell>
          <Badge 
            variant={
              run.status === 'success' ? 'default' : 
              run.status === 'failed' ? 'destructive' : 
              'secondary'
            }
          >
            {run.status}
          </Badge>
        </TableCell>
      )}
      {selectedColumns.includes('startedAt') && (
        <TableCell>
          {format(new Date(run.startedAt), 'MMM dd, yyyy HH:mm:ss')}
        </TableCell>
      )}
      {selectedColumns.includes('completedAt') && (
        <TableCell>
          {run.completedAt 
            ? format(new Date(run.completedAt), 'MMM dd, yyyy HH:mm:ss')
            : 'N/A'}
        </TableCell>
      )}
      {selectedColumns.includes('duration') && (
        <TableCell>
          {run.duration 
            ? `${run.duration} ms` 
            : 'N/A'}
        </TableCell>
      )}
    </>
  )

  return (
    <DataTable 
      data={runs}
      columns={columns}
      renderRow={renderJobRunRow}
      isLoading={isLoading}
    />
  )
} 