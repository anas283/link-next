"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkwajoLogo from "../../public/link-logo.png"; 

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={`z-10 w-full py-4 flex items-center ${pathname === '/' ? 'absolute':''}`}>
      <div className="w-full max-w-6xl mx-auto flex justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex flex-row">
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
            <Link href="changelog" className="text-[15px]">
              Changelog
            </Link>
          </div>
          <Link href="login">
            <Button>Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  ) 
}