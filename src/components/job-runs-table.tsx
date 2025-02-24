'use client'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { format } from 'date-fns'
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
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export function JobRunsTable({ 
  runs, 
  isLoading,
  selectedColumns: propSelectedColumns,
  onSortChange
}: JobRunsTableProps) {
  const columns = [
    { 
      id: 'jobName', 
      header: 'Job Name',
      cell: (run: JobRun) => run.jobName,
      sortable: true
    },
    { 
      id: 'status', 
      header: 'Status',
      cell: (run: JobRun) => (
        <Badge 
          variant={
            run.status === 'success' ? 'default' : 
            run.status === 'failed' ? 'destructive' : 
            'secondary'
          }
        >
          {run.status}
        </Badge>
      ),
      sortable: true
    },
    { 
      id: 'startedAt', 
      header: 'Started At',
      cell: (run: JobRun) => format(new Date(run.startedAt), 'MMM dd, yyyy HH:mm:ss'),
      sortable: true
    },
    { 
      id: 'completedAt', 
      header: 'Completed At',
      cell: (run: JobRun) => run.completedAt 
        ? format(new Date(run.completedAt), 'MMM dd, yyyy HH:mm:ss')
        : 'N/A',
      sortable: true
    },
    { 
      id: 'duration', 
      header: 'Duration',
      cell: (run: JobRun) => run.duration 
        ? `${run.duration} ms` 
        : 'N/A',
      sortable: true
    }
  ]

  return (
    <DataTable 
      data={runs}
      columns={columns}
      isLoading={isLoading}
      selectedColumns={propSelectedColumns}
      onSortChange={onSortChange}
    />
  )
} 