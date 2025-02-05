import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding - Acceldata',
  description: 'Complete your cluster setup',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 