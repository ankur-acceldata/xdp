'use client'

import React, { useCallback, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  addEdge,
  Connection 
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'

// Task Type Schema
const TaskSchema = z.object({
  name: z.string().min(2, "Task name must be at least 2 characters"),
  type: z.enum(['notebook', 'jar']),
  dependsOn: z.array(z.string()).optional()
})

// Job Schema
const JobSchema = z.object({
  name: z.string().min(2, "Job name must be at least 2 characters"),
  tasks: z.array(TaskSchema).min(1, "At least one task is required")
})

type JobFormData = z.infer<typeof JobSchema>

// Define types for nodes and edges
type FlowNode = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
}

type FlowEdge = {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export default function CreateJobPage() {
  // React Flow state management
  const [nodes, setNodes] = useState<FlowNode[]>([
    { id: 'initial', data: { label: 'Initial Node' }, position: { x: 0, y: 0 } }
  ])
  const [edges, setEdges] = useState<FlowEdge[]>([])

  // Form setup
  const form = useForm<JobFormData>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      name: '',
      tasks: [{ name: '', type: 'notebook' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tasks'
  })

  // Update flow visualization when tasks change
  const updateTaskFlow = useCallback(() => {
    const newNodes: FlowNode[] = fields.map((field, index) => ({
      id: field.name || `task-${index}`,
      data: { label: field.name },
      position: { x: index * 200, y: 100 }
    }))

    const newEdges: FlowEdge[] = fields.flatMap((field, index) => {
      const dependsOn = form.getValues(`tasks.${index}.dependsOn`)
      return (dependsOn || []).map(dependencyName => ({
        id: `${dependencyName}-${field.name}`,
        source: dependencyName,
        target: field.name || `task-${index}`,
        type: 'step'
      }))
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [fields, form])

  // Update flow when tasks change
  React.useEffect(() => {
    updateTaskFlow()
  }, [updateTaskFlow])

  // Handle edge connections
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        id: `${connection.source}-${connection.target}`,
        type: 'step'
      }, eds))
    },
    [setEdges]
  )

  // Form submission handler
  const onSubmit = (data: JobFormData) => {
    console.log('Job Creation Data:', data)
    // TODO: Implement job creation logic
  }

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Job Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Job Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tasks Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => append({ name: '', type: 'notebook' })}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Task Name */}
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Task Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter task name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Task Type */}
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Task Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select task type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="notebook">Notebook</SelectItem>
                                <SelectItem value="jar">JAR</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Depends On */}
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.dependsOn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Depends On</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value ? [value] : undefined)
                                updateTaskFlow()
                              }}
                              value={field.value?.[0]}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select dependencies" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fields
                                  .filter(f => f.name !== fields[index].name)
                                  .map(f => (
                                    <SelectItem key={f.id} value={f.name}>
                                      {f.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Remove Task Button */}
                      {fields.length > 1 && (
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="icon"
                          className="self-end"
                          onClick={() => {
                            remove(index)
                            updateTaskFlow()
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <Button type="submit" className="w-full">Create Job</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Task Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Task Lineage</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px]">
          <ReactFlow 
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </CardContent>
      </Card>
    </div>
  )
} 