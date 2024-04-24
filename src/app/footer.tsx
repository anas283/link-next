import Link from "next/link";
import LinkwajoLogo from "../../public/link-logo.png"; 
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full flex items-center px-4 xl:px-0">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:justify-between border-t-2 border-gray-400 border-dashed py-12">
        <div>
          <Link href="/" className="text-xl font-bold">
            <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto flex mx-auto lg:mx-0" />
          </Link>
          <p className="mt-5 font-medium text-center lg:text-start">
            The simple link in bio for product-focused users
          </p>
          
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 md:gap-6 my-6 lg:mt-4 lg:mb-0">
            <Link href="" className="text-[15px] text-gray-600 text-center lg:text-start">
              Features
            </Link>
            <Link href="" className="text-[15px] text-gray-600 text-center lg:text-start">
              Help Center
            </Link>
            <Link href="" className="text-[15px] text-gray-600 text-center lg:text-start">
              Terms of Use
            </Link>
            <Link href="" className="text-[15px] text-gray-600 text-center lg:text-start">
              Privay Policy
            </Link>
            <Link href="" className="text-[15px] text-gray-600 text-center lg:text-start">
              Report
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end lg:items-end">
          <p className="text-sm text-gray-500 mt-4">
            © Copyright {year} All Rights Reserved by Linkwajo.
          </p>
        </div>
      </div>
    </div>
  ) 
}