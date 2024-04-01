"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import ProfilePlacholder from "../../../public/profile-placeholder.png";
import LinkwajoLogoSmall from "../../../public/link-logo-small.png"; 

import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteCookie } from "cookies-next";
import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { publish } from "./publish";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userDetails: any = useAppSelector(state => state.auth.userDetails);
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      localStorage.removeItem('persist:state');
      localStorage.removeItem('sb-mxjxkkgypfoucyqihuol-auth-token');
      deleteCookie('token');
      router.push('/');
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row gap-8">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={LinkwajoLogoSmall} alt="linkwojo" className="w-8 h-8" />
          </Link>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link href="/dashboard" className={`text-sm block py-2 ${isActive('/dashboard') ? 'text-black':'text-gray-500'}`}>
                Links
              </Link>
              <Link href="/dashboard/themes" className={`text-sm block py-2 ${isActive('/dashboard/themes') ? 'text-black':'text-gray-500'}`}>
                Themes
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
          <Button variant="outline">Share</Button>
          {/* <Button onClick={() => publish(linkDetails)}>Publish</Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-10 h-10 rounded-full overflow-hidden p-0">
                {userDetails?.photoURL ?
                  <img src={userDetails?.photoURL} alt="profile-pic" />
                :
                  <Image src={ProfilePlacholder} alt="profile-pic" />
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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