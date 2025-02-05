"use client";

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';

interface DataSource {
  id: string;
  name: string;
  type: string;
  host: string;
  port: string;
  database: string;
  username: string;
  createdAt: string;
}

interface ClusterConfig {
  configuration: {
    database: string;
    host: string;
    port: string;
    username: string;
  };
  createdAt: string;
}

type PostgresConfig = ReturnType<ReturnType<typeof useDashboardData>['getPostgresConfig']>;
type MinioConfig = ReturnType<ReturnType<typeof useDashboardData>['getMinioConfig']>;

export default function DataSourcesPage() {
  const router = useRouter();
  const { getPostgresConfig, getMinioConfig } = useDashboardData();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [postgresConfig, setPostgresConfig] = useState<PostgresConfig>(null);
  const [minioConfig, setMinioConfig] = useState<MinioConfig>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postgres = getPostgresConfig();
    const minio = getMinioConfig();
    setPostgresConfig(postgres);
    setMinioConfig(minio);
    setIsLoading(false);
  }, [getPostgresConfig, getMinioConfig]);

  useEffect(() => {
    // Load data sources from localStorage
    const clusters = JSON.parse(localStorage.getItem('clusters') || '[]');
    const sources = clusters.map((cluster: ClusterConfig) => ({
      id: crypto.randomUUID(),
      name: cluster.configuration.database,
      type: 'PostgreSQL',
      host: cluster.configuration.host,
      port: cluster.configuration.port,
      database: cluster.configuration.database,
      username: cluster.configuration.username,
      createdAt: cluster.createdAt,
    }));
    setDataSources(sources);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this data source?')) {
      setDataSources(dataSources.filter(source => source.id !== id));
      // Update localStorage
      // Note: This is a simplified version. In a real app, you'd need to update the cluster configuration as well
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

  if (!postgresConfig && !minioConfig) {
    return (
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Data Sources Found</h3>
            <p className="mt-1 text-sm text-gray-500">Please complete the onboarding process to configure your data sources.</p>
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
            <h1 className="text-2xl font-semibold text-gray-900">Data Sources</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your database connections and other data sources.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => router.push('/dashboard/data-sources/create')}
              className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Add Data Source
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="relative flex flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{source.name}</h3>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {source.type}
                </span>
              </div>
              <dl className="mt-4 flex flex-grow flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Host</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.host}:{source.port}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Database</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.database}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.username}</dd>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => router.push(`/dashboard/data-sources/${source.id}/edit`)}
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(source.id)}
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