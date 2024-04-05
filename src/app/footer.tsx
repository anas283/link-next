import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinkwajoLogo from "../../public/link-logo.png"; 
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full flex items-center">
      <div className="w-full max-w-6xl mx-auto flex justify-between border-t-2 border-gray-400 border-dashed py-12">
        <div>
          <Link href="/" className="text-xl font-bold">
            <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto" />
          </Link>
          <p className="mt-5 font-medium">
            The simple link in bio for product-focused users
          </p>
          
          <div className="flex flex-row gap-6 mt-4">
            <Link href="" className="text-[15px] text-gray-600">
              Features
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Help Center
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Terms of Use
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Privay Policy
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Report
            </Link>
          </div>
        </div>
        <div className="flex items-end">
          <p className="text-sm text-gray-500 mt-4">
            © Copyright {year} All Rights Reserved by Linkwajo.
          </p>
        </div>
      </div>
    </div>
  ) 
}