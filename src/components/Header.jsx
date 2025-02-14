import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { sidebarOpenAtom } from '../atoms'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../lib/auth'
import toast from 'react-hot-toast'

export default function Header() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await auth.logout()
      navigate('/login')
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <div className="flex items-center gap-x-4">
            <span className="hidden lg:flex lg:items-center">
              <span
                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                aria-hidden="true"
              >
                {user?.email}
              </span>
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
