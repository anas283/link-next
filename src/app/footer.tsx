import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinkwajoLogo from "../../public/link-logo.png"; 
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full py-10 flex items-center border-t">
      <div className="w-full max-w-6xl mx-auto flex justify-between">
        <div>
          <Link href="/" className="text-xl font-bold">
            <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto" />
          </Link>
          <p className="mt-5">
            The simple link in bio for product-focused users
          </p>
          <p className="text-sm text-gray-500 mt-4">
            © Copyright 2024 All Rights Reserved by Link.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Links</h4>
          <div className="flex flex-col gap-4 mt-4">
            <Link href="templates" className="text-[15px] text-gray-600">
              Templates
            </Link>
            <Link href="pricing" className="text-[15px] text-gray-600">
              Pricing
            </Link>
            <Link href="blog" className="text-[15px] text-gray-600">
              Blog
            </Link>
            <Link href="changelog" className="text-[15px] text-gray-600">
              Changelog
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">Support</h4>
          <div className="flex flex-col gap-4 mt-4">
            <Link href="" className="text-[15px] text-gray-600">
              Getting Started
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Help Topics
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              FAQs
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">Legal</h4>
          <div className="flex flex-col gap-4 mt-4">
            <Link href="" className="text-[15px] text-gray-600">
              Terms & Conditions
            </Link>
            <Link href="" className="text-[15px] text-gray-600">
              Privay Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) 
}