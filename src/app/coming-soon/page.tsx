import Image from "next/image";
import LinkwajoLogo from "../../../public/link-logo.png"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ComingSoon() {
  return (
    <div className="w-screen h-screen flex justify-center items-center px-5 md:px-0">
      <div>
        <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto mx-auto" />
        <h1 className="text-5xl md:text-7xl font-bold text-center max-w-3xl mx-auto mt-4">
          Coming Soon
        </h1>
        <h6 className="text-sm md:text-lg text-gray-600 font-normal text-center max-w-xl mx-auto mt-6 md:mt-8">
          The simple link in bio for product-focused users. <br /> 
          Works whatever you do.
        </h6>
        <div className="flex justify-center mt-8 gap-4">
          <Input placeholder="Enter your email" />
          <Button>Notify me</Button>
        </div>
      </div>
    </div>
  )
}