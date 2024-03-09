"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row gap-8">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Link</span>
          </a>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link href="/dashboard" className={`text-sm block py-2 ${isActive('/dashboard') ? 'text-black':'text-gray-500'}`}>
                Appearance
              </Link>
              <Link href="/dashboard/analytics" className={`text-sm block py-2 ${isActive('/dashboard/analytics') ? 'text-black':'text-gray-500'}`}>
                Analytics
              </Link>
              <Link href="/dashboard/settings" className={`text-sm block py-2 ${isActive('/dashboard/settings') ? 'text-black':'text-gray-500'}`}>
                Settings
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
          <Button variant="secondary">Try Pro for free</Button>
          <Button variant="outline">Share</Button>
          <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
            <img src="https://placehold.co/50" alt="profile-pic" />
          </div>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}