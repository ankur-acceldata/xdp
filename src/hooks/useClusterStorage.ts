'use client'

interface ClusterData {
  [key: string]: any // We can make this more specific based on your form data structure
}

export function useClusterStorage() {
  const STORAGE_KEY = 'clusters'

  const saveClusterData = (stepData: ClusterData) => {
    if (typeof window === 'undefined') return

    try {
      const existingData = localStorage.getItem(STORAGE_KEY)
      const data = existingData ? JSON.parse(existingData) : {}
      const updatedData = { ...data, ...stepData }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
    } catch (error) {
      console.error('Error saving cluster data:', error)
    }
  }

  const getClusterData = () => {
    if (typeof window === 'undefined') return null

    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error getting cluster data:', error)
      return null
    }
  }

  const hasClusterData = () => {
    return !!getClusterData()
  }

  const clearClusterData = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    saveClusterData,
    getClusterData,
    hasClusterData,
    clearClusterData
  }
} 