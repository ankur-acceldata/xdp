"use client";

import { FormEvent, useState } from 'react';

interface FormData {
  minioEndpoint: string;
  minioAccessKey: string;
  minioSecretKey: string;
  minioBucket: string;
  minioRegion: string;
  minioSecure: boolean;
  
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
}

export interface MinioSetupProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function MinioSetup({
  formData,
  updateFormData,
  onNext,
  onBack,
  isLastStep,
}: MinioSetupProps) {
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
      // Here you would make an API call to test the MinIO connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestStatus('success');
    } catch {
      setTestStatus('error');
      setErrorMessage('Failed to connect to MinIO. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="minioEndpoint" className="block text-sm font-medium text-gray-700">
          MinIO Endpoint *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="minioEndpoint"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.minioEndpoint || ''}
            onChange={(e) => updateFormData({ minioEndpoint: e.target.value })}
            placeholder="play.min.io"
          />
        </div>
      </div>

      <div>
        <label htmlFor="minioAccessKey" className="block text-sm font-medium text-gray-700">
          Access Key *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="minioAccessKey"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.minioAccessKey || ''}
            onChange={(e) => updateFormData({ minioAccessKey: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="minioSecretKey" className="block text-sm font-medium text-gray-700">
          Secret Key *
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="minioSecretKey"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.minioSecretKey || ''}
            onChange={(e) => updateFormData({ minioSecretKey: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="minioBucket" className="block text-sm font-medium text-gray-700">
          Bucket Name *
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="minioBucket"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.minioBucket || ''}
            onChange={(e) => updateFormData({ minioBucket: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="minioRegion" className="block text-sm font-medium text-gray-700">
          Region
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="minioRegion"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.minioRegion || ''}
            onChange={(e) => updateFormData({ minioRegion: e.target.value })}
            placeholder="us-east-1"
          />
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="minioSecure"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.minioSecure || false}
            onChange={(e) => updateFormData({ minioSecure: e.target.checked })}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="minioSecure" className="font-medium text-gray-700">
            Use SSL/TLS
          </label>
          <p className="text-gray-500">Enable secure connection to MinIO server</p>
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
            onClick={testConnection}
            disabled={testStatus === 'testing'}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              testStatus === 'testing'
                ? 'bg-gray-400 cursor-not-allowed'
                : testStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {testStatus === 'testing' ? 'Testing...' : testStatus === 'success' ? 'Connected!' : 'Test Connection'}
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