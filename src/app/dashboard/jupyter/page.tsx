"use client";

import { useState, useEffect } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';

export default function JupyterPage() {
  const { getJupyterConfig } = useDashboardData();
  const [jupyterConfig, setJupyterConfig] = useState<ReturnType<typeof getJupyterConfig>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const config = getJupyterConfig();
    setJupyterConfig(config);
    setIsLoading(false);
  }, [getJupyterConfig]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!jupyterConfig) {
    return (
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Jupyter Configuration Found</h3>
            <p className="mt-1 text-sm text-gray-500">Please complete the onboarding process to configure Jupyter.</p>
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
            <h1 className="text-2xl font-semibold text-gray-900">Jupyter Notebooks</h1>
            <p className="mt-2 text-sm text-gray-700">
              Access and manage your Jupyter notebook environments.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Port</h3>
              <p className="mt-1 text-sm text-gray-900">{jupyterConfig.port}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Base URL</h3>
              <p className="mt-1 text-sm text-gray-900">{jupyterConfig.baseUrl}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Default Kernel</h3>
              <p className="mt-1 text-sm text-gray-900">{jupyterConfig.defaultKernel}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Workspace Path</h3>
              <p className="mt-1 text-sm text-gray-900">{jupyterConfig.workspacePath}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 