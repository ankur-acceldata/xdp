'use client'

import { FormData } from '@/components/onboarding/OnboardingWizard';

interface Cluster {
  id: string;
  name: string;
  namespace: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  createdAt: string;
  configuration: FormData;
}

export function useClusterStorage() {
  const getClusters = (): Cluster[] => {
    try {
      return JSON.parse(localStorage.getItem('clusters') || '[]');
    } catch {
      return [];
    }
  };

  const hasClusterData = (): boolean => {
    const clusters = getClusters();
    return clusters.length > 0;
  };

  return {
    getClusters,
    hasClusterData,
  };
} 