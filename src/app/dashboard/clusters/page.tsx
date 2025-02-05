"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';
import { FormData } from '@/components/onboarding/OnboardingWizard';
import { Button } from '@/components/ui/button';

interface Cluster {
  id: string;
  name: string;
  namespace: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  createdAt: string;
  configuration: FormData;
}

export default function ClustersPage() {
  const router = useRouter();
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load clusters from localStorage
    const storedClusters = localStorage.getItem('clusters');
    if (storedClusters) {
      setClusters(JSON.parse(storedClusters));
    } else {
      // If no clusters in localStorage, check onboarding data
      const onboardingData = localStorage.getItem('onboarding_data');
      if (onboardingData) {
        const formData = JSON.parse(onboardingData);
        const newCluster: Cluster = {
          id: crypto.randomUUID(),
          name: formData.clusterName,
          namespace: formData.namespace,
          version: formData.version,
          status: 'stopped' as const,
          createdAt: new Date().toISOString(),
          configuration: formData,
        };
        setClusters([newCluster]);
        localStorage.setItem('clusters', JSON.stringify([newCluster]));
      }
    }
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this cluster?')) {
      const updatedClusters = clusters.filter(cluster => cluster.id !== id);
      setClusters(updatedClusters);
      localStorage.setItem('clusters', JSON.stringify(updatedClusters));
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (clusters.length === 0) {
    return (
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No clusters</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new cluster.</p>
            <div className="mt-6">
              <Button
                onClick={() => router.push('/dashboard/clusters/create')}
                className="gap-x-2"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Create Cluster
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Clusters</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all clusters in your account including their name, namespace, version, and status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              onClick={() => router.push('/dashboard/clusters/create')}
              className="gap-x-2"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Create Cluster
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ring-1 ring-gray-200/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{cluster.name}</h3>
              </div>
              <dl className="mt-4 flex flex-grow flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm font-medium text-gray-500">Namespace</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cluster.namespace}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm font-medium text-gray-500">Version</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cluster.version}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm font-medium text-gray-500">Registry</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cluster.configuration.registry}</dd>
                  </div>
                  <div className="pb-3">
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(cluster.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    onClick={() => router.push(`/dashboard/clusters/${cluster.id}`)}
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleDelete(cluster.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 