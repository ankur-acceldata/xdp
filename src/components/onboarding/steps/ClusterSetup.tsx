"use client";

import { FormEvent } from 'react';

interface FormData {
  clusterName: string;
  namespace: string;
  version: string;
  registry: string;
  registryPrefix: string;
  
  // Other form fields with optional type
  host?: string;
  port?: string;
  database?: string;
  username?: string;
  password?: string;
  minioEndpoint?: string;
  minioAccessKey?: string;
  minioSecretKey?: string;
  minioBucket?: string;
  minioRegion?: string;
  minioSecure?: boolean;
}

export interface ClusterSetupProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function ClusterSetup({
  formData,
  updateFormData,
  onNext,
}: ClusterSetupProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="clusterName" className="block text-sm font-medium text-gray-700">
          Cluster Name *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="clusterName"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.clusterName}
            onChange={(e) => updateFormData({ clusterName: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="namespace" className="block text-sm font-medium text-gray-700">
          Namespace *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="namespace"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.namespace}
            onChange={(e) => updateFormData({ namespace: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="version" className="block text-sm font-medium text-gray-700">
          Version *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="version"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.version}
            onChange={(e) => updateFormData({ version: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="registry" className="block text-sm font-medium text-gray-700">
          Registry (Optional)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="registry"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.registry}
            onChange={(e) => updateFormData({ registry: e.target.value })}
            placeholder="191579300362.dkr.ecr.us-east-1.amazonaws.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="registryPrefix" className="block text-sm font-medium text-gray-700">
          Registry Prefix (Optional)
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="registryPrefix"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.registryPrefix}
            onChange={(e) => updateFormData({ registryPrefix: e.target.value })}
            placeholder="acceldata"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </form>
  );
} 