import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="z-10 absolute w-full py-4 flex items-center">
      <div className="w-full max-w-6xl mx-auto flex justify-between">
        <div className="flex items-center">
          logo
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
          <Button>Log in</Button>
        </div>
      </div>
    </div>
  ) 
}