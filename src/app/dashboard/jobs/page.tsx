'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobsTable } from '@/components/jobs-table'
import { JobRunsTable, JobRun } from '@/components/job-runs-table'
import { FilterToolbar } from '@/components/filter-toolbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { ColumnSelector } from '@/components/column-selector'
import jobsData from '@/lib/data/jobs.json'

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobRuns, setJobRuns] = useState<JobRun[]>([])
  const [activeTab, setActiveTab] = useState<'jobs' | 'runs'>('jobs')
  const [selectedJobColumns, setSelectedJobColumns] = useState<string[]>([
    'name', 'createdBy', 'createdAt', 'recentRuns'
  ])
  const [selectedRunColumns, setSelectedRunColumns] = useState<string[]>([
    'jobName', 'status', 'startedAt', 'completedAt', 'duration'
  ])
  const [sortedJobs, setSortedJobs] = useState(jobsData.jobs)
  const [sortedJobRuns, setSortedJobRuns] = useState<JobRun[]>([])

  useEffect(() => {
    // Simulate async data fetching
    const timer = setTimeout(() => {
      // Generate sample job runs data
      const generatedRuns: JobRun[] = jobsData.jobs.flatMap(job => 
        job.recentRuns
          .filter(run => run !== null)
          .map(run => ({
            id: run.id || 'unknown',
            jobId: job.id,
            jobName: job.name,
            status: run.status === 'failed' ? 'failed' : 'success',
            startedAt: run.timestamp || new Date().toISOString(),
            completedAt: run.timestamp 
              ? new Date(new Date(run.timestamp).getTime() + Math.random() * 60000).toISOString() 
              : undefined,
            duration: Math.floor(Math.random() * 10000)
          }))
      )

      setJobRuns(generatedRuns)
      setSortedJobRuns(generatedRuns)
      setIsLoading(false)
    }, 1500) // 1.5 second delay to simulate loading

    return () => clearTimeout(timer)
  }, [])

  const handleJobSort = (columnId: string, direction: 'asc' | 'desc') => {
    const sorted = [...jobsData.jobs].sort((a, b) => {
      let comparison = 0
      switch (columnId) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'createdBy':
          comparison = a.createdBy.localeCompare(b.createdBy)
          break
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return direction === 'asc' ? comparison : -comparison
    })
    setSortedJobs(sorted)
  }

  const handleJobRunSort = (columnId: string, direction: 'asc' | 'desc') => {
    const sorted = [...jobRuns].sort((a, b) => {
      let comparison = 0
      switch (columnId) {
        case 'jobName':
          comparison = a.jobName.localeCompare(b.jobName)
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
        case 'startedAt':
          comparison = new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
          break
        case 'completedAt':
          if (!a.completedAt) return 1
          if (!b.completedAt) return -1
          comparison = new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
          break
        case 'duration':
          comparison = (a.duration || 0) - (b.duration || 0)
          break
      }
      return direction === 'asc' ? comparison : -comparison
    })
    setSortedJobRuns(sorted)
  }

  return (
    <div className="container mx-auto py-4">
      <FilterToolbar 
        rightActions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        }
      >
        <Input 
          placeholder="Search jobs..."
          className="w-full"
        />
      </FilterToolbar>

      <Tabs 
        defaultValue="jobs" 
        className="w-full mt-4"
        onValueChange={(value) => setActiveTab(value as 'jobs' | 'runs')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between space-x-4 w-full">
            <TabsList className="inline-flex">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="runs">Job Runs</TabsTrigger>
            </TabsList>
            <ColumnSelector 
              columns={
                activeTab === 'jobs' 
                  ? [
                      { id: 'name', label: 'Job Name', sortable: true },
                      { id: 'createdBy', label: 'Created By', sortable: true },
                      { id: 'createdAt', label: 'Created Date', sortable: true },
                      { id: 'recentRuns', label: 'Recent Runs', sortable: false }
                    ]
                  : [
                      { id: 'jobName', label: 'Job Name', sortable: true },
                      { id: 'status', label: 'Status', sortable: true },
                      { id: 'startedAt', label: 'Started At', sortable: true },
                      { id: 'completedAt', label: 'Completed At', sortable: true },
                      { id: 'duration', label: 'Duration', sortable: true }
                    ]
              }
              selectedColumns={activeTab === 'jobs' ? selectedJobColumns : selectedRunColumns}
              onColumnToggle={(columnId) => 
                activeTab === 'jobs'
                  ? setSelectedJobColumns(prev => 
                      prev.includes(columnId)
                        ? prev.filter(id => id !== columnId)
                        : [...prev, columnId]
                    )
                  : setSelectedRunColumns(prev => 
                      prev.includes(columnId)
                        ? prev.filter(id => id !== columnId)
                        : [...prev, columnId]
                    )
              }
            />
          </div>
        </div>
        <TabsContent value="jobs">
          <JobsTable 
            jobs={sortedJobs} 
            selectedColumns={selectedJobColumns}
            onSortChange={handleJobSort}
          />
        </TabsContent>
        <TabsContent value="runs">
          <JobRunsTable 
            runs={sortedJobRuns} 
            isLoading={isLoading}
            selectedColumns={selectedRunColumns}
            onSortChange={handleJobRunSort}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
