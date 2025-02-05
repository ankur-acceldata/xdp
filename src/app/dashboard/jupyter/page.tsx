"use client";

import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';

export default function JupyterPage() {
  const router = useRouter();

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

        <div className="mt-8">
          {/* Add Jupyter notebook interface here */}
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">Jupyter notebook integration is under development.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 