"use client";

import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';
import { useOnboardingStorage } from '@/hooks/useOnboardingStorage';
import { Button } from '@/components/ui/button';

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

export default function DataSourcesPage() {
  const router = useRouter();
  const { getFormData } = useOnboardingStorage();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from onboarding storage
    const onboardingData = getFormData();
    
    if (onboardingData) {
      // Create a data source from PostgreSQL configuration
      const postgresSource: DataSource = {
        id: crypto.randomUUID(),
        name: onboardingData.database,
        type: 'PostgreSQL',
        host: onboardingData.host,
        port: onboardingData.port,
        database: onboardingData.database,
        username: onboardingData.username,
        createdAt: new Date().toISOString(),
      };
      setDataSources([postgresSource]);
    }
    
    setIsLoading(false);
  }, [getFormData]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this data source?')) {
      setDataSources(dataSources.filter(source => source.id !== id));
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

  if (dataSources.length === 0) {
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
            <Button
              onClick={() => router.push('/dashboard/data-sources/create')}
              className="gap-x-2"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Add Data Source
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ring-1 ring-gray-200/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{source.name}</h3>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-100">
                  {source.type}
                </span>
              </div>
              <dl className="mt-4 flex flex-grow flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm font-medium text-gray-500">Host</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.host}:{source.port}</dd>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm font-medium text-gray-500">Database</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.database}</dd>
                  </div>
                  <div className="pb-3">
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900">{source.username}</dd>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    onClick={() => router.push(`/dashboard/data-sources/${source.id}/edit`)}
                    variant="outline"
                    size="sm"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(source.id)}
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