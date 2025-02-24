'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobsTable } from '@/components/jobs-table'
import { JobRunsTable, JobRun } from '@/components/job-runs-table'
import { FilterToolbar } from '@/components/filter-toolbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import jobsData from '@/lib/data/jobs.json'

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobRuns, setJobRuns] = useState<JobRun[]>([])

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

      <Tabs defaultValue="jobs" className="w-full mt-4">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="inline-flex">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="runs">Job Runs</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="jobs">
          <JobsTable jobs={jobsData.jobs} />
        </TabsContent>
        <TabsContent value="runs">
          <JobRunsTable 
            runs={jobRuns} 
            isLoading={isLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
