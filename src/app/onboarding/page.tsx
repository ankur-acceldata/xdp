"use client";

import OnboardingWizard from '@/components/onboarding/OnboardingWizard';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Initial Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Complete the initial setup by configuring your first cluster
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <OnboardingWizard />
        </div>
      </div>
    </div>
  );
} 