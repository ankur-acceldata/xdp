'use client'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { navigation } from './NavigationConfig'
import { NavigationLink } from './NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/pro-solid-svg-icons'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  logo: string
}

export function Sidebar({ sidebarOpen, setSidebarOpen, logo }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <SidebarContent logo={logo} />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 hidden w-20 lg:block">
        <SidebarContent logo="/images/ad-logo-white-icon.svg" />
      </div>
    </>
  )
}

interface SidebarContentProps {
  logo: string
}

function SidebarContent({ logo }: SidebarContentProps) {
  return (
    <div className="flex h-full w-full grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-2 pb-2 ring-1 ring-white/10">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <Image
          alt="Acceldata"
          src={logo}
          width={32}
          height={32}
          className="h-8 w-8"
          priority
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <NavigationLink 
                  key={item.name} 
                  item={item}
                />
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="border-t border-gray-800 pt-3">
              <Link
                href="/login"
                className="text-gray-400 hover:bg-gray-800 hover:text-white group flex flex-col items-center gap-y-2 rounded-md py-3 px-4 text-sm font-semibold"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-5 shrink-0" />
                <span className="text-xs text-center w-full">Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
} 