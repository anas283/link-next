"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkwajoLogo from "../../public/link-logo.png"; 
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={`z-20 w-full py-4 flex items-center px-4 lg:px-0 ${pathname === '/' ? 'absolute':''}`}>
      <div className="w-full max-w-6xl mx-auto flex justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex-row hidden lg:flex">
          <div className="flex items-center gap-6 mr-8">
            <Link href="templates" className="text-[15px]">
              Templates
            </Link>
            <Link href="pricing" className="text-[15px]">
              Pricing
            </Link>
            <Link href="blog" className="text-[15px]">
              Blog
            </Link>
          </div>
          <Link href="login">
            <Button className="rounded-full px-6">Log in</Button>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex lg:hidden px-2 bg-transparent border-none">
              <Menu className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-5 my-10">
              <Link href="templates" className="text-lg">
                Templates
              </Link>
              <Link href="pricing" className="text-lg">
                Pricing
              </Link>
              <Link href="blog" className="text-lg">
                Blog
              </Link>
            </div>
            <Link href="login">
              <Button className="rounded-full px-6">Log in</Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  ) 
}