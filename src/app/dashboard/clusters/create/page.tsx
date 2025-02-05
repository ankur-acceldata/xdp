"use client";

import { useRouter } from 'next/navigation';
import OnboardingWizard, { FormData } from '@/components/onboarding/OnboardingWizard';

export default function CreateClusterPage() {
  const router = useRouter();

  const handleComplete = (formData: FormData) => {
    // Get existing clusters or initialize empty array
    const existingClusters = JSON.parse(localStorage.getItem('clusters') || '[]');
    
    // Create new cluster object
    const newCluster = {
      id: crypto.randomUUID(),
      name: formData.clusterName,
      namespace: formData.namespace,
      version: formData.version,
      status: 'stopped',
      createdAt: new Date().toISOString(),
      configuration: formData,
    };
    
    // Add new cluster to array
    existingClusters.push(newCluster);
    
    // Save back to localStorage
    localStorage.setItem('clusters', JSON.stringify(existingClusters));
    
    // Redirect to clusters list
    router.push('/dashboard/clusters');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Cluster</h1>
          <p className="mt-2 text-sm text-gray-700">
            Configure your new cluster by following the steps below.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <OnboardingWizard onComplete={handleComplete} />
      </div>
    </div>
  );
} 