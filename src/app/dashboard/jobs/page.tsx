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
      setIsLoading(false)
    }, 1500) // 1.5 second delay to simulate loading

    return () => clearTimeout(timer)
  }, [])

  const jobColumns = [
    { id: 'name', label: 'Job Name' },
    { id: 'createdBy', label: 'Created By' },
    { id: 'createdAt', label: 'Created Date' },
    { id: 'recentRuns', label: 'Recent Runs' }
  ]

  const jobRunColumns = [
    { id: 'jobName', label: 'Job Name' },
    { id: 'status', label: 'Status' },
    { id: 'startedAt', label: 'Started At' },
    { id: 'completedAt', label: 'Completed At' },
    { id: 'duration', label: 'Duration' }
  ]

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
              columns={activeTab === 'jobs' ? jobColumns : jobRunColumns}
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
            jobs={jobsData.jobs} 
            selectedColumns={selectedJobColumns}
          />
        </TabsContent>
        <TabsContent value="runs">
          <JobRunsTable 
            runs={jobRuns} 
            isLoading={isLoading}
            selectedColumns={selectedRunColumns}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
