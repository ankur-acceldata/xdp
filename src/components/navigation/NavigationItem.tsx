'use client'

import type { NavigationItem as NavItem } from './NavigationConfig'
import { classNames } from './NavigationConfig'
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavigationItemProps {
  item: NavItem
  isCollapsed: boolean
}

export function NavigationLink({ item, isCollapsed }: NavigationItemProps) {
  const pathname = usePathname()
  const isCurrent = pathname === item.href

  const linkContent = (
    <a
      href={item.href}
      className={classNames(
        isCurrent
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
        'group flex items-center gap-x-3 rounded-md py-3 px-3 text-sm font-semibold leading-6',
        isCollapsed ? 'justify-center' : ''
      )}
    >
      <item.icon icon={item.iconDef} className="size-5 shrink-0" />
      {!isCollapsed && item.name}
    </a>
  )

  if (isCollapsed) {
    return (
      <li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {linkContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    )
  }

  return <li>{linkContent}</li>
} 