"use client";

import { useState, useEffect } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';

export default function SparkPage() {
  const { getSparkConfig } = useDashboardData();
  const [sparkConfig, setSparkConfig] = useState<ReturnType<typeof getSparkConfig>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const config = getSparkConfig();
    setSparkConfig(config);
    setIsLoading(false);
  }, [getSparkConfig]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!sparkConfig) {
    return (
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No Spark Configuration Found</h3>
            <p className="mt-1 text-sm text-gray-500">Please complete the onboarding process to configure Spark.</p>
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
            <h1 className="text-2xl font-semibold text-gray-900">Spark Configuration</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and manage your Apache Spark settings.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="bg-white shadow-sm ring-1 ring-gray-200/50 rounded-lg">
            {/* Master URL and Python Version */}
            <div className="border-b border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Master URL</h3>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.master}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Python Version</h3>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.pythonVersion}</p>
                </div>
              </div>
            </div>

            {/* Executor Settings */}
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Executor Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Instances</h4>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.executorInstances}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cores per Executor</h4>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.executorCores}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Memory per Executor</h4>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.executorMemory}</p>
                </div>
              </div>
            </div>

            {/* Driver Settings */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Cores</h4>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.driverCores}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Memory</h4>
                  <p className="mt-1 text-sm text-gray-900">{sparkConfig.driverMemory}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">YARN Mode</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {sparkConfig.configureYarn ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 