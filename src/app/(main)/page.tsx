import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GridBg from "../../../public/grid-bg.png";
import MockupLeftImage from "../../../public/home/mockup-left.png";
import MockupRightImage from "../../../public/home/mockup-right.png";
import Section1Image from "../../../public/home/section-1.png";
import Section2Image from "../../../public/home/section-2.png";
import Section3Image from "../../../public/home/section-3.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-20 relative overflow-x-hidden">
      <Image src={GridBg} alt="grid"
        className="absolute top-0 object-fit h-[100vh] lg:h-auto lg:object-fit w-full z-0"
        priority={true}
      />

      <div className="z-10 max-w-6xl w-full items-center justify-between text-sm lg:flex">
        <div className="w-full">

          <div className="min-h-[calc(100vh-96px)] flex justify-center mt-24 lg:mt-0 lg:pt-0 lg:items-center relative">
            <div>
              <h1 className="w-80 lg:w-auto text-4xl lg:text-5xl 2xl:text-6xl 2xl:leading-[70px] font-bold text-center max-w-3xl mx-auto">
                The simple link in bio for product-focused users. Works whatever you do.
              </h1>
              <h6 className="text-[15px] text-gray-600 font-normal text-center max-w-xl mx-auto mt-8">
                A single hub to effortlessly distribute, showcase, and monetize your content across 
                Instagram, TikTok, Twitter, YouTube, and various social platforms.
              </h6>
              <div className="flex justify-center gap-3 mt-5 lg:mt-8">
                <Link href="register">
                  <Button className="rounded-full px-6">Try for free now</Button>
                </Link>
              </div>
            </div>

            <Image src={MockupLeftImage} alt="mockup-left"
              className="absolute bottom-10 lg:top-[20%] right-0 lg:right-auto lg:-left-64 2xl:-left-64 w-48 lg:w-[318px] 2xl:w-[350px] rotate-12"
            />
            <Image src={MockupRightImage} alt="mockup-right"
              className="absolute bottom-10 lg:top-[20%] left-0 lg:left-auto lg:-right-64 2xl:-right-64 w-48 lg:w-[318px] 2xl:w-[350px] -rotate-12"
            />
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-32 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center mb-5 lg:mb-0">
              <Image src={Section1Image} alt="section-1" className="w-full h-auto" width={469} height={578} />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Craft and customize your link effortlessly, in minutes
                </h3>
                <h4 className="text-[15px] mt-4">
                  Bridge your TikTok, Instagram, Twitter, website, store, videos, 
                  music, podcast, events, and beyond. Seamlessly merge them into a 
                  dynamic link-in-bio landing page engineered for maximum conversion.
                </h4>
                <Button className="mt-8 rounded-full px-6">Try for free now</Button>
              </div>
            </div>
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-10 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center order-2 lg:order-1">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Easily share your link across Instagram, TikTok, Twitter, and other 
                  platforms
                </h3>
                <h4 className="text-[15px] mt-4">
                  Seamlessly distribute your custom link URL across all platforms frequented 
                  by your audience. Then, leverage QR codes to effortlessly guide offline 
                  traffic to your online presence.
                </h4>
                <Button className="mt-8 rounded-full px-6">Try for free now</Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center order-1 lg:order-2 mb-5 lg:mb-0">
              <Image src={Section2Image} alt="section-1" className="w-full h-auto" width={447} height={386} />
            </div>
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-10 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center mb-5 lg:mb-0">
              <Image src={Section3Image} alt="section-1" className="w-full h-auto" width={472} height={409} />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Analyze and engage with your audience effectively.
                </h3>
                <h4 className="text-[15px] mt-4">
                  Monitor your audience&apos;s interaction and understand what resonates 
                  with your followers. Adapt and refine your strategy in real-time 
                  to ensure their ongoing engagement.
                </h4>
                <Button className="mt-5 lg:mt-8 rounded-full px-6">Try for free now</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
