"use client";

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { navigation } from '@/components/navigation/NavigationConfig';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPage = navigation.find(item => item.href === pathname);
  const pageTitle = currentPage?.title || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        logo="/logo.svg"
        isCollapsed={isCollapsed}
      />
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">xDP - {pageTitle}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </Button>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 