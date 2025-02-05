"use client";

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';

interface SparkCluster {
  id: string;
  name: string;
  master: string;
  executorInstances: string;
  executorCores: string;
  executorMemory: string;
  driverMemory: string;
  pythonVersion: string;
  createdAt: string;
  status: 'running' | 'stopped' | 'error';
}

export default function SparkPage() {
  const router = useRouter();
  const [sparkClusters, setSparkClusters] = useState<SparkCluster[]>([]);

  useEffect(() => {
    // Load Spark clusters from localStorage
    const clusters = JSON.parse(localStorage.getItem('clusters') || '[]');
    const sparkConfigs = clusters.map((cluster: any) => ({
      id: crypto.randomUUID(),
      name: `${cluster.name}-spark`,
      master: cluster.configuration.sparkMaster,
      executorInstances: cluster.configuration.sparkExecutorInstances,
      executorCores: cluster.configuration.sparkExecutorCores,
      executorMemory: cluster.configuration.sparkExecutorMemory,
      driverMemory: cluster.configuration.sparkDriverMemory,
      pythonVersion: cluster.configuration.sparkPythonVersion,
      createdAt: cluster.createdAt,
      status: 'stopped' as const,
    }));
    setSparkClusters(sparkConfigs);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Spark cluster?')) {
      setSparkClusters(sparkClusters.filter(cluster => cluster.id !== id));
      // Update localStorage
      // Note: This is a simplified version. In a real app, you'd need to update the cluster configuration as well
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Spark Clusters</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your Apache Spark clusters and configurations.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => router.push('/dashboard/spark/create')}
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Add Spark Cluster
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sparkClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="relative flex flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{cluster.name}</h3>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    cluster.status === 'running'
                      ? 'bg-green-100 text-green-800'
                      : cluster.status === 'stopped'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {cluster.status}
                </span>
              </div>
              <dl className="mt-4 flex flex-grow flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Master URL</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cluster.master}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Executor Configuration</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {cluster.executorInstances} executors, {cluster.executorCores} cores each
                    </dd>
                    <dd className="text-sm text-gray-900">Memory: {cluster.executorMemory}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Python Version</dt>
                    <dd className="mt-1 text-sm text-gray-900">{cluster.pythonVersion}</dd>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => router.push(`/dashboard/spark/${cluster.id}/edit`)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cluster.id)}
                    className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/10 hover:bg-red-100"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 