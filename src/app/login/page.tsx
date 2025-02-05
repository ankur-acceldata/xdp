"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useClusterStorage } from '@/hooks/useClusterStorage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const { hasClusterData } = useClusterStorage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
    
    // After successful login, check if cluster data exists
    if (hasClusterData()) {
      router.push('/dashboard/clusters');
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-container">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/images/ad-logo.svg"
          alt="Acceldata"
          width={40}
          height={40}
          priority
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
      <div className="bottom-cloud"></div>
    </div>
  );
} 