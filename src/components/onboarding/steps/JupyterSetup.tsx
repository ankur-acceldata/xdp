"use client";

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface FormData {
  // Jupyter configuration
  jupyterPort: string;
  jupyterToken: string;
  jupyterBaseUrl: string;
  jupyterWorkspacePath: string;
  jupyterDefaultKernel: string;
  jupyterEnableAutosave: boolean;
  jupyterEnableCollaboration: boolean;
  jupyterMaxUploadSize: string;
  
  // Other form fields with optional type
  clusterName?: string;
  namespace?: string;
  version?: string;
  registry?: string;
  registryPrefix?: string;
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
  sparkMaster?: string;
  sparkExecutorInstances?: string;
  sparkExecutorCores?: string;
  sparkExecutorMemory?: string;
  sparkDriverMemory?: string;
  sparkDriverCores?: string;
  sparkPythonVersion?: string;
  sparkConfigureYarn?: boolean;
}

export interface JupyterSetupProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function JupyterSetup({
  formData,
  updateFormData,
  onNext,
  onBack,
  isLastStep,
}: JupyterSetupProps) {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      // Navigate to dashboard after completing setup
      router.push('/dashboard');
    } else {
      onNext();
    }
  };

  const testConfiguration = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    try {
      // Here you would make an API call to test the Jupyter configuration
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestStatus('success');
    } catch {
      setTestStatus('error');
      setErrorMessage('Failed to validate Jupyter configuration. Please check your settings.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="jupyterPort" className="block text-sm font-medium text-gray-700">
            Port *
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="jupyterPort"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.jupyterPort || ''}
              onChange={(e) => updateFormData({ jupyterPort: e.target.value })}
              placeholder="8888"
            />
          </div>
        </div>

        <div>
          <label htmlFor="jupyterToken" className="block text-sm font-medium text-gray-700">
            Security Token *
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="jupyterToken"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.jupyterToken || ''}
              onChange={(e) => updateFormData({ jupyterToken: e.target.value })}
              placeholder="your-secure-token"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="jupyterBaseUrl" className="block text-sm font-medium text-gray-700">
          Base URL
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="jupyterBaseUrl"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.jupyterBaseUrl || ''}
            onChange={(e) => updateFormData({ jupyterBaseUrl: e.target.value })}
            placeholder="/jupyter"
          />
        </div>
      </div>

      <div>
        <label htmlFor="jupyterWorkspacePath" className="block text-sm font-medium text-gray-700">
          Workspace Path *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="jupyterWorkspacePath"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.jupyterWorkspacePath || ''}
            onChange={(e) => updateFormData({ jupyterWorkspacePath: e.target.value })}
            placeholder="/workspace"
          />
        </div>
      </div>

      <div>
        <label htmlFor="jupyterDefaultKernel" className="block text-sm font-medium text-gray-700">
          Default Kernel *
        </label>
        <div className="mt-1">
          <select
            id="jupyterDefaultKernel"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.jupyterDefaultKernel || 'python3'}
            onChange={(e) => updateFormData({ jupyterDefaultKernel: e.target.value })}
          >
            <option value="python3">Python 3</option>
            <option value="pyspark">PySpark</option>
            <option value="r">R</option>
            <option value="scala">Scala</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="jupyterMaxUploadSize" className="block text-sm font-medium text-gray-700">
          Max Upload Size
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="jupyterMaxUploadSize"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.jupyterMaxUploadSize || ''}
            onChange={(e) => updateFormData({ jupyterMaxUploadSize: e.target.value })}
            placeholder="50MB"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="jupyterEnableAutosave"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.jupyterEnableAutosave || false}
              onChange={(e) => updateFormData({ jupyterEnableAutosave: e.target.checked })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="jupyterEnableAutosave" className="font-medium text-gray-700">
              Enable Autosave
            </label>
            <p className="text-gray-500">Automatically save notebooks periodically</p>
          </div>
        </div>

        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="jupyterEnableCollaboration"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.jupyterEnableCollaboration || false}
              onChange={(e) => updateFormData({ jupyterEnableCollaboration: e.target.checked })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="jupyterEnableCollaboration" className="font-medium text-gray-700">
              Enable Real-time Collaboration
            </label>
            <p className="text-gray-500">Allow multiple users to work on the same notebook simultaneously</p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Configuration Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back
        </button>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={testConfiguration}
            disabled={testStatus === 'testing'}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              testStatus === 'testing'
                ? 'bg-gray-400 cursor-not-allowed'
                : testStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {testStatus === 'testing' ? 'Testing...' : testStatus === 'success' ? 'Validated!' : 'Validate Configuration'}
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLastStep ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </form>
  );
} 