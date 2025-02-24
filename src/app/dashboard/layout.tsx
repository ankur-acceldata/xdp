import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function DashboardLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full mr-4">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <ThemeSwitcher />
        </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}
