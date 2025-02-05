'use client'

import type { NavigationItem as NavItem } from './NavigationConfig'
import { classNames } from './NavigationConfig'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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
          'group flex flex-col items-center gap-y-2 rounded-md p-2 text-sm font-semibold m-2'
        )}
      >
        <item.icon icon={item.iconDef} className="size-5 shrink-0" />
        <span className="text-xs text-center w-full">{item.name}</span>
      </Link>
    </li>
  )
} 