"use client";

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';

interface FormData {
  // Spark configuration
  sparkMaster: string;
  sparkExecutorInstances: string;
  sparkExecutorCores: string;
  sparkExecutorMemory: string;
  sparkDriverMemory: string;
  sparkDriverCores: string;
  sparkPythonVersion: string;
  sparkConfigureYarn: boolean;
  
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
}

export interface SparkSetupProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function SparkSetup({
  formData,
  updateFormData,
  onNext,
  onBack,
  isLastStep,
}: SparkSetupProps) {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      console.log('Final submission:', formData);
    } else {
      onNext();
    }
  };

  const testConfiguration = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    try {
      // Here you would make an API call to test the Spark configuration
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestStatus('success');
    } catch {
      setTestStatus('error');
      setErrorMessage('Failed to validate Spark configuration. Please check your settings.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="sparkMaster" className="block text-sm font-medium text-gray-700">
          Spark Master URL *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="sparkMaster"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.sparkMaster || ''}
            onChange={(e) => updateFormData({ sparkMaster: e.target.value })}
            placeholder="spark://master:7077"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sparkExecutorInstances" className="block text-sm font-medium text-gray-700">
            Number of Executors *
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="sparkExecutorInstances"
              required
              min="1"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.sparkExecutorInstances || ''}
              onChange={(e) => updateFormData({ sparkExecutorInstances: e.target.value })}
              placeholder="2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sparkExecutorCores" className="block text-sm font-medium text-gray-700">
            Executor Cores *
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="sparkExecutorCores"
              required
              min="1"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.sparkExecutorCores || ''}
              onChange={(e) => updateFormData({ sparkExecutorCores: e.target.value })}
              placeholder="2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sparkExecutorMemory" className="block text-sm font-medium text-gray-700">
            Executor Memory *
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="sparkExecutorMemory"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.sparkExecutorMemory || ''}
              onChange={(e) => updateFormData({ sparkExecutorMemory: e.target.value })}
              placeholder="4g"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sparkDriverMemory" className="block text-sm font-medium text-gray-700">
            Driver Memory *
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="sparkDriverMemory"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.sparkDriverMemory || ''}
              onChange={(e) => updateFormData({ sparkDriverMemory: e.target.value })}
              placeholder="2g"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="sparkDriverCores" className="block text-sm font-medium text-gray-700">
          Driver Cores *
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="sparkDriverCores"
            required
            min="1"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.sparkDriverCores || ''}
            onChange={(e) => updateFormData({ sparkDriverCores: e.target.value })}
            placeholder="2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sparkPythonVersion" className="block text-sm font-medium text-gray-700">
          Python Version *
        </label>
        <div className="mt-1">
          <select
            id="sparkPythonVersion"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.sparkPythonVersion || '3.9'}
            onChange={(e) => updateFormData({ sparkPythonVersion: e.target.value })}
          >
            <option value="3.7">Python 3.7</option>
            <option value="3.8">Python 3.8</option>
            <option value="3.9">Python 3.9</option>
            <option value="3.10">Python 3.10</option>
          </select>
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="sparkConfigureYarn"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.sparkConfigureYarn || false}
            onChange={(e) => updateFormData({ sparkConfigureYarn: e.target.checked })}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="sparkConfigureYarn" className="font-medium text-gray-700">
            Configure YARN
          </label>
          <p className="text-gray-500">Enable YARN as resource manager</p>
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