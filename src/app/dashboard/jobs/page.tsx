import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FilterToolbar } from '@/components/filter-toolbar'
import { JobsTable } from '@/components/jobs-table'
import { Plus } from 'lucide-react'
import jobsData from '@/lib/data/jobs.json'

export default function JobsPage() {
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
      
      <div className="mt-4">
        <JobsTable jobs={jobsData.jobs} />
      </div>
    </div>
  )
}
