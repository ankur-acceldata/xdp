"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStorage } from '@/hooks/useOnboardingStorage';
import ClusterSetup from './steps/ClusterSetup';
import PostgresSetup from './steps/PostgresSetup';
import MinioSetup from './steps/MinioSetup';
import SparkSetup from './steps/SparkSetup';
import JupyterSetup from './steps/JupyterSetup';
import VerticalStepper from './VerticalStepper';

export interface FormData {
  // Cluster configuration
  clusterName: string;
  namespace: string;
  version: string;
  registry: string;
  registryPrefix: string;
  
  // Postgres configuration
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;

  // MinIO configuration
  minioEndpoint: string;
  minioAccessKey: string;
  minioSecretKey: string;
  minioBucket: string;
  minioRegion: string;
  minioSecure: boolean;

  // Spark configuration
  sparkMaster: string;
  sparkExecutorInstances: string;
  sparkExecutorCores: string;
  sparkExecutorMemory: string;
  sparkDriverMemory: string;
  sparkDriverCores: string;
  sparkPythonVersion: string;
  sparkConfigureYarn: boolean;

  // Jupyter configuration
  jupyterPort: string;
  jupyterToken: string;
  jupyterBaseUrl: string;
  jupyterWorkspacePath: string;
  jupyterDefaultKernel: string;
  jupyterEnableAutosave: boolean;
  jupyterEnableCollaboration: boolean;
  jupyterMaxUploadSize: string;
}

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Step {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<StepProps>;
}

interface OnboardingWizardProps {
  onComplete?: (formData: FormData) => void;
}

const steps: Step[] = [
  { 
    id: 'cluster', 
    name: 'Cluster Setup', 
    description: 'Configure your cluster settings and registry options.',
    component: ClusterSetup as React.ComponentType<StepProps>
  },
  { 
    id: 'postgres', 
    name: 'PostgreSQL Configuration', 
    description: 'Set up and test your PostgreSQL connection.',
    component: PostgresSetup as React.ComponentType<StepProps>
  },
  {
    id: 'minio',
    name: 'MinIO Configuration',
    description: 'Configure object storage settings for your cluster.',
    component: MinioSetup as React.ComponentType<StepProps>
  },
  {
    id: 'spark',
    name: 'Spark Configuration',
    description: 'Set up Apache Spark processing engine.',
    component: SparkSetup as React.ComponentType<StepProps>
  },
  {
    id: 'jupyter',
    name: 'Jupyter Configuration',
    description: 'Configure Jupyter notebook environment.',
    component: JupyterSetup as React.ComponentType<StepProps>
  }
];

const defaultFormData: FormData = {
  // Default values...
  clusterName: 'ad-cluster-1',
  namespace: 'acceldata',
  version: 'latest',
  registry: '191579300362.dkr.ecr.us-east-1.amazonaws.com',
  registryPrefix: 'acceldata',
  host: 'localhost',
  port: '5432',
  database: 'acceldata',
  username: 'postgres',
  password: 'postgres',
  minioEndpoint: 'localhost:9000',
  minioAccessKey: 'minioadmin',
  minioSecretKey: 'minioadmin',
  minioBucket: 'acceldata',
  minioRegion: 'us-east-1',
  minioSecure: true,
  sparkMaster: 'local[*]',
  sparkExecutorInstances: '2',
  sparkExecutorCores: '2',
  sparkExecutorMemory: '4g',
  sparkDriverMemory: '2g',
  sparkDriverCores: '2',
  sparkPythonVersion: '3.9',
  sparkConfigureYarn: false,
  jupyterPort: '8888',
  jupyterToken: crypto.randomUUID().slice(0, 8),
  jupyterBaseUrl: '/jupyter',
  jupyterWorkspacePath: '/workspace',
  jupyterDefaultKernel: 'python3',
  jupyterEnableAutosave: true,
  jupyterEnableCollaboration: true,
  jupyterMaxUploadSize: '100MB',
};

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const router = useRouter();
  const { saveFormData, getFormData } = useOnboardingStorage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    const savedData = getFormData();
    if (savedData) {
      setFormData(savedData);
    }
    setIsLoading(false);
  }, []);

  // Save data whenever formData changes
  useEffect(() => {
    if (!isLoading) {
      saveFormData(formData);
    }
  }, [formData, isLoading]);

  const CurrentStepComponent = steps[currentStep].component;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData);
    } else {
      // Create cluster data
      const newCluster = {
        id: crypto.randomUUID(),
        name: formData.clusterName,
        namespace: formData.namespace,
        version: formData.version,
        status: 'stopped',
        createdAt: new Date().toISOString(),
        configuration: formData,
      };
      
      // Initialize clusters array and add the new cluster
      const clusters = [newCluster];
      localStorage.setItem('clusters', JSON.stringify(clusters));
      
      // Redirect to dashboard
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    status: index < currentStep 
      ? 'complete' as const 
      : index === currentStep 
      ? 'current' as const 
      : 'upcoming' as const
  }));

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Stepper */}
      <div className="col-span-4">
        <VerticalStepper steps={stepsWithStatus} />
      </div>

      {/* Form Content */}
      <div className="col-span-8">
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
    </div>
  );
} 