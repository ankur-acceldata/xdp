"use client";

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';

interface FormData {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  
  // Other form fields with optional type
  clusterName?: string;
  namespace?: string;
  version?: string;
  registry?: string;
  registryPrefix?: string;
  minioEndpoint?: string;
  minioAccessKey?: string;
  minioSecretKey?: string;
  minioBucket?: string;
  minioRegion?: string;
  minioSecure?: boolean;
}

export interface PostgresSetupProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function PostgresSetup({
  formData,
  updateFormData,
  onNext,
  onBack,
  isLastStep,
}: PostgresSetupProps) {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      // Handle final submission
      console.log('Final submission:', formData);
    } else {
      onNext();
    }
  };

  const testConnection = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    try {
      // Here you would make an API call to test the connection
      // For now, we'll simulate a successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestStatus('success');
    } catch {
      setTestStatus('error');
      setErrorMessage('Failed to connect to PostgreSQL. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="host" className="block text-sm font-medium text-gray-700">
          Host *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="host"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.host || ''}
            onChange={(e) => updateFormData({ host: e.target.value })}
            placeholder="localhost"
          />
        </div>
      </div>

      <div>
        <label htmlFor="port" className="block text-sm font-medium text-gray-700">
          Port *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="port"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.port || ''}
            onChange={(e) => updateFormData({ port: e.target.value })}
            placeholder="5432"
          />
        </div>
      </div>

      <div>
        <label htmlFor="database" className="block text-sm font-medium text-gray-700">
          Database Name *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="database"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.database || ''}
            onChange={(e) => updateFormData({ database: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="username"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.username || ''}
            onChange={(e) => updateFormData({ username: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password *
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.password || ''}
            onChange={(e) => updateFormData({ password: e.target.value })}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={testConnection}
            disabled={testStatus === 'testing'}
            variant={testStatus === 'success' ? 'secondary' : 'default'}
          >
            {testStatus === 'testing' ? 'Testing...' : testStatus === 'success' ? 'Connected!' : 'Test Connection'}
          </Button>
          <Button
            type="submit"
          >
            {isLastStep ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </form>
  );
} 