import { FormData } from '@/components/onboarding/OnboardingWizard';
import { useCallback } from 'react';

const STORAGE_KEY = 'onboarding_data';

const isClient = typeof window !== 'undefined';

export function useOnboardingStorage() {
  const saveFormData = useCallback((data: Partial<FormData>) => {
    if (!isClient) return;
    
    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      const currentData = existingData ? JSON.parse(existingData) : {};
      const updatedData = { ...currentData, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  }, []);

  const getFormData = useCallback((): FormData | null => {
    if (!isClient) return null;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading onboarding data:', error);
      return null;
    }
  }, []);

  const clearFormData = useCallback(() => {
    if (!isClient) return;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing onboarding data:', error);
    }
  }, []);

  const hasFormData = useCallback((): boolean => {
    if (!isClient) return false;
    return !!localStorage.getItem(STORAGE_KEY);
  }, []);

  return {
    saveFormData,
    getFormData,
    clearFormData,
    hasFormData,
  };
} 