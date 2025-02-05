import {
  HomeIcon,
  ServerStackIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  current?: boolean
}

export interface Team {
  id: number
  name: string
  href: string
  initial: string
  current: boolean
}

export const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clusters', href: '/dashboard/clusters', icon: ServerStackIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
} 