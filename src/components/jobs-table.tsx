'use client'

import React from 'react'
import { TableCell } from '@/components/ui/table'
import { DataTable } from '@/components/ui/data-table'
import { RunStatusIndicator } from './run-status-indicator'
import { format } from 'date-fns'
import { ColumnDefinition } from './column-selector'

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

  const renderJobRow = (job: Job, selectedColumns: string[]) => (
    <>
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
    </>
  )

  return (
    <DataTable 
      data={jobs}
      columns={columns}
      renderRow={renderJobRow}
    />
  )
} 