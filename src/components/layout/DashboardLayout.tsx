"use client";

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '@/components/navigation/NavigationConfig';
import { Sidebar } from '@/components/navigation/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPage = navigation.find(item => item.href === pathname);
  const pageTitle = currentPage?.title || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        logo="/logo.svg"
      />
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">xDP - {pageTitle}</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 