'use client'

import type { NavigationItem as NavItem } from './NavigationConfig'
import { classNames } from './NavigationConfig'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './sidebar.css'
interface NavigationItemProps {
  item: NavItem
}

export function NavigationLink({ item }: NavigationItemProps) {
  const pathname = usePathname()
  const isCurrent = pathname === item.href

  return (
    <li>
      <Link
        href={item.href}
        className={classNames(
          isCurrent
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex flex-col items-center gap-y-2 rounded-md px-2 py-4 text-sm font-semibold m-2 my-4'
        )}
      >
        <item.icon icon={item.iconDef} className="sidebar-icon shrink-0" />
      </Link>
    </li>
  )
} 