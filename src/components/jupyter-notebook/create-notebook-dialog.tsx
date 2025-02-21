"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const NOTEBOOK_TYPES = [
  { value: "python", label: "Python" },
  { value: "r", label: "R" },
  { value: "julia", label: "Julia" },
  { value: "scala", label: "Scala" },
] as const

type NotebookType = typeof NOTEBOOK_TYPES[number]['value']

export function CreateNotebookDialog() {
  const [notebookName, setNotebookName] = React.useState("")
  const [notebookType, setNotebookType] = React.useState<NotebookType>("python")
  const [isCreating, setIsCreating] = React.useState(false)

  const handleCreateNotebook = async () => {
    if (!notebookName.trim()) {
      alert("Please enter a notebook name")
      return
    }

    try {
      setIsCreating(true)
      // TODO: Implement actual notebook creation logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated async operation
      
      alert(`Created ${notebookName} (${notebookType})`)
      
      // Reset form
      setNotebookName("")
      setNotebookType("python")
    } catch (error) {
      alert("Failed to create notebook. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Create Notebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Jupyter Notebook</DialogTitle>
          <DialogDescription>
            Create a new Jupyter notebook with your preferred programming language.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notebook-name" className="text-right">
              Name
            </Label>
            <Input
              id="notebook-name"
              placeholder="My Notebook"
              value={notebookName}
              onChange={(e) => setNotebookName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notebook-type" className="text-right">
              Type
            </Label>
            <Select 
              value={notebookType} 
              onValueChange={(value: NotebookType) => setNotebookType(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select notebook type" />
              </SelectTrigger>
              <SelectContent>
                {NOTEBOOK_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleCreateNotebook} 
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Notebook"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 