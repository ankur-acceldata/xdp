'use client'

import type { NavigationItem as NavItem } from './NavigationConfig'
import { classNames } from './NavigationConfig'
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
  const linkContent = (
    <a
      href={item.href}
      className={classNames(
        item.current
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
        isCollapsed ? 'justify-center' : ''
      )}
    >
      <item.icon aria-hidden="true" className="size-6 shrink-0" />
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