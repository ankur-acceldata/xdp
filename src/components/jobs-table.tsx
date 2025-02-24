'use client'

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
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
  selectedColumns?: string[];
  onSortChange?: (columnId: string, direction: 'asc' | 'desc') => void;
}

export function JobsTable({ 
  jobs, 
  selectedColumns: propSelectedColumns,
  onSortChange
}: JobsTableProps) {
  const columns = [
    { 
      id: 'name', 
      header: 'Job Name',
      cell: (job: Job) => job.name,
      sortable: true
    },
    { 
      id: 'createdBy', 
      header: 'Created By',
      cell: (job: Job) => job.createdBy,
      sortable: true
    },
    { 
      id: 'createdAt', 
      header: 'Created Date',
      cell: (job: Job) => format(new Date(job.createdAt), 'MMM dd, yyyy'),
      sortable: true
    },
    { 
      id: 'recentRuns', 
      header: 'Recent Runs',
      cell: (job: Job) => (
        <RunStatusIndicator 
          runs={job.recentRuns.map(run => run ? {
            id: run.id,
            status: run.status === 'success' ? 'success' : 
                    run.status === 'failed' ? 'failed' : 
                    null,
            timestamp: run.timestamp
          } : null)} 
        />
      ),
      sortable: false
    }
  ]

  return (
    <DataTable 
      data={jobs}
      columns={columns}
      selectedColumns={propSelectedColumns}
      onSortChange={onSortChange}
    />
  )
} 