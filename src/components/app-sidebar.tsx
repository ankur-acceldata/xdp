"use client"

import * as React from "react"
import Image from "next/image"
import {
  Boxes,
  BookOpen,
  Database,
  Frame,
  Map,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { CreateNotebookDialog } from "@/components/jupyter-notebook/create-notebook-dialog"

// This is sample data.
const data = {
  user: {
    name: "Ankur Agarwal",
    email: "ankur@acceldata.io",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Clusters",
      url: "/dashboard/clusters",
      icon: Boxes,
      isActive: true,
      items: [
        {
          title: "Create Cluster",
          url: "/dashboard/clusters/create",
        },
        {
          title: "List Clusters",
          url: "/dashboard/clusters/list",
        },
        {
          title: "Settings",
          url: "/dashboard/clusters/settings",
        },
      ],
    },
    {
      title: "Data Sources",
      url: "/dashboard/data-sources",
      icon: Database,
    },
    {
      title: "Jupyter Notebooks",
      url: "/dashboard/jupyter-notebooks",
      icon: BookOpen,
      items: [
        {
          title: "My Notebooks",
          url: "/dashboard/jupyter-notebooks/my-notebooks",
        },
        {
          title: "Shared Notebooks",
          url: "/dashboard/jupyter-notebooks/shared-notebooks",
        },
        {
          title: "Create Notebook",
          url: "/dashboard/jupyter-notebooks/create-notebook",
        }
      ],
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center space-x-2 p-2">
        {state === "collapsed" ? (
          <Image 
            src="/assets/images/logo-lg.png" 
            alt="Cross Data Platform" 
            width={50} 
            height={50} 
            className="mx-auto"
          />
        ) : (
          <div className="flex items-center space-x-2">
            <Image 
              src="/assets/images/logo-lg.png" 
              alt="Cross Data Platform" 
              width={50} 
              height={50} 
            />
            <span className="text-lg font-semibold">Cross Data Platform</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Jupyter Notebooks</SidebarGroupLabel>
          <CreateNotebookDialog />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
