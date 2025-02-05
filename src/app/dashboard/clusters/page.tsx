"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';

interface Cluster {
  id: string;
  name: string;
  namespace: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  createdAt: string;
}

export default function ClustersPage() {
  const router = useRouter();
  const [clusters, setClusters] = useState<Cluster[]>([]);

  useEffect(() => {
    // Load clusters from localStorage
    const storedClusters = localStorage.getItem('clusters');
    if (storedClusters) {
      setClusters(JSON.parse(storedClusters));
    }
  }, []);

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
            <button
              type="button"
              onClick={() => router.push('/dashboard/clusters/create')}
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Create Cluster
            </button>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {clusters.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Namespace
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Version
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Created
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clusters.map((cluster) => (
                      <tr key={cluster.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {cluster.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cluster.namespace}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cluster.version}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              cluster.status === 'running'
                                ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                : cluster.status === 'stopped'
                                ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                                : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                            }`}
                          >
                            {cluster.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(cluster.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            onClick={() => router.push(`/dashboard/clusters/${cluster.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View<span className="sr-only">, {cluster.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No clusters</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new cluster.</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => router.push('/dashboard/clusters/create')}
                      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      Create Cluster
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 