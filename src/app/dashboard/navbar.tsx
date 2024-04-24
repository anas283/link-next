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
  Zap,
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
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from "react";
import { Badge } from "@/components/ui/badge"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCopied, setIsCopied] = useState(false);

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

  const copyLinkwajoURL = () => {
    setIsCopied(!isCopied);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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
              <Link href="/dashboard/appearance" className={`text-sm block py-2 ${isActive('/dashboard/appearance') ? 'text-black':'text-gray-500'}`}>
                Appearance
              </Link>
              <Link href="/dashboard/analytics" className={`text-sm block py-2 ${isActive('/dashboard/analytics') ? 'text-black':'text-gray-500'}`}>
                Analytics
              </Link>
              {/* <Link href="/dashboard/settings" className={`text-sm block py-2 ${isActive('/dashboard/settings') ? 'text-black':'text-gray-500'}`}>
                Settings
              </Link> */}
            </ul>
          </div>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
          {linkDetails.tier === "FREE" &&
            <Link href="upgrade">
              <Button variant="secondary">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />Upgrade to Pro
              </Button>
            </Link>
          }
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="hidden lg:flex">Share</Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <h6 className="font-semibold">Share your Linkwajo</h6>
              <p className="text-sm text-gray-500 mt-1 w-11/12">
                Get more visitors by sharing Linkwajo everywhere
              </p>
              <CopyToClipboard 
                text={`https://www.linkwajo.com/${linkDetails.username}`}
                onCopy={() => copyLinkwajoURL()}
              >
                <Button variant="outline" className="w-full flex justify-between items-center p-2 cursor-pointer border rounded mt-4 gap-x-2">
                  <Image src={LinkwajoLogoSmall} alt="linkwojo" className="w-6 h-6" />
                  <div className="text-sm">linkwajo.com/{linkDetails.username}</div>
                  <div className="text-sm text-gray-500">
                    {isCopied ? 'Copied!':'Copy'}
                  </div>
                </Button>
              </CopyToClipboard>
            </PopoverContent>
          </Popover>
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
              <div className="flex justify-between items-center">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <Badge className="text-[10px] h-5 mr-1.5 pointer-events-none">{linkDetails.tier}</Badge>
              </div>
              <DropdownMenuSeparator />
              {/* <DropdownMenuGroup>
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
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem>
                <Link href="/support" className="flex items-center">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex lg:hidden px-0 bg-transparent border-none">
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-5 my-10">
                <SheetClose asChild>
                  <Link href="/dashboard" className={`text-lg block py-2 ${isActive('/dashboard') ? 'text-black':'text-gray-500'}`}>
                    Links
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/appearance" className={`text-lg block py-2 ${isActive('/dashboard/appearance') ? 'text-black':'text-gray-500'}`}>
                    Appearance
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/analytics" className={`text-lg block py-2 ${isActive('/dashboard/analytics') ? 'text-black':'text-gray-500'}`}>
                    Analytics
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}