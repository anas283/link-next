import { Button } from "@/components/ui/button";
import Image from "next/image";
import GridBg from "../../../public/grid-bg.png";
import { MousePointerSquareDashed, MoveRight, Share, Sparkles, SquareStack } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={GridBg} alt="grid"
        className="absolute top-0 object-fit w-full z-0"
      />
      <div className="z-10 max-w-6xl w-full items-center justify-between text-sm lg:flex">
        <div className="w-full mt-14">

          <div>
            <div className="bg-white px-4 py-2 shadow flex flex-row items-center mx-auto w-fit rounded-full border cursor-pointer">
              <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-blue-500 mr-3">Latest</span>
              <span>Link is now in development</span>
              <MoveRight className="w-4 h-4 ml-2" />
            </div>
            <h1 className="text-5xl font-bold text-center max-w-3xl mx-auto mt-8">
              The simple link in bio for product-focused users. Works whatever you do.
            </h1>
            <h6 className="text-[15px] text-gray-600 font-normal text-center max-w-xl mx-auto mt-8">
              A single hub to effortlessly distribute, showcase, and monetize your content across 
              Instagram, TikTok, Twitter, YouTube, and various social platforms.
            </h6>
            <div className="flex justify-center gap-3 mt-8">
              <Button>Try for free now</Button>
            </div>

            <div className="flex justify-center mt-20">
              <img className="rounded-lg" src="https://placehold.co/600x400" alt="" />
              <img className="rounded-lg ml-5" src="https://placehold.co/200x400" alt="" />
            </div>
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-32 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center">
              <img className="rounded-lg" src="https://placehold.co/500x300" alt="" />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <div>
                <h3 className="text-4xl font-bold">
                  Craft and customize your link effortlessly, in minutes
                </h3>
                <h4 className="text-[15px] mt-4">
                  Bridge your TikTok, Instagram, Twitter, website, store, videos, 
                  music, podcast, events, and beyond. Seamlessly merge them into a 
                  dynamic link-in-bio landing page engineered for maximum conversion.
                </h4>
                <Button className="mt-8">Try for free now</Button>
              </div>
            </div>
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-10 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center">
              <div>
                <h3 className="text-4xl font-bold">
                  Easily share your link across Instagram, TikTok, Twitter, and other 
                  platforms
                </h3>
                <h4 className="text-[15px] mt-4">
                  Seamlessly distribute your custom link URL across all platforms frequented 
                  by your audience. Then, leverage QR codes to effortlessly guide offline 
                  traffic to your online presence.
                </h4>
                <Button className="mt-8">Try for free now</Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <img className="rounded-lg" src="https://placehold.co/500x300" alt="" />
            </div>
          </div>

          <div className="py-10 flex flex-col md:flex-row md:justify-between mt-10 px-0 md:px-14 gap-0 md:gap-14">
            <div className="w-full md:w-1/2 flex items-center">
              <img className="rounded-lg" src="https://placehold.co/500x300" alt="" />
            </div>
            <div className="w-full md:w-1/2 flex items-center">
              <div>
                <h3 className="text-4xl font-bold">
                  Analyze and engage with your audience effectively.
                </h3>
                <h4 className="text-[15px] mt-4">
                  Monitor your audience&apos;s interaction and understand what resonates 
                  with your followers. Adapt and refine your strategy in real-time 
                  to ensure their ongoing engagement.
                </h4>
                <Button className="mt-8">Try for free now</Button>
              </div>
            </div>
          </div>

          <hr className="mt-20 mb-14" />

          <div className="py-10">
            <h3 className="text-4xl font-bold text-center">
              Everything you need, we&apos;ve (probably) got it.
            </h3>
            <div className="grid grid-cols-3 mt-16">
              <div className="px-0 md:px-10 group">
                <div className="w-14 h-14 rounded-lg bg-slate-500 flex justify-center items-center mx-auto group-hover:bg-blue-500 ease-in-out duration-150">
                  <MousePointerSquareDashed className="text-white" />
                </div>
                <h5 className="text-lg font-bold text-center mt-3 group-hover:text-blue-500 ease-in-out duration-150">Customizable</h5>
                <h6 className="text-[15px] text-center">Create a link uniquely just for you brand to grow.</h6>
              </div>
              <div className="px-0 md:px-10 group">
                <div className="w-14 h-14 rounded-lg bg-slate-500 flex justify-center items-center mx-auto group-hover:bg-blue-500 ease-in-out duration-150">
                  <Share className="text-white" />
                </div>
                <h5 className="text-lg font-bold text-center mt-3 group-hover:text-blue-500 ease-in-out duration-150">Sharing</h5>
                <h6 className="text-[15px] text-center">Share your content and product in limitless ways on your link.</h6>
              </div>
              <div className="px-0 md:px-10 group">
                <div className="w-14 h-14 rounded-lg bg-slate-500 flex justify-center items-center mx-auto group-hover:bg-blue-500 ease-in-out duration-150">
                  <SquareStack className="text-white" />
                </div>
                <h5 className="text-lg font-bold text-center mt-3 group-hover:text-blue-500 ease-in-out duration-150">Unifying</h5>
                <h6 className="text-[15px] text-center">Grow and engage your audience by unifying them in one place.</h6>
              </div>
            </div>
          </div>

          <div className="border rounded-3xl mt-20 bg-slate-900 p-20">
            <h4 className="text-3xl font-bold text-white w-full md:w-1/2">
              Kickstart your online presence today!
            </h4>
            <h6 className="text-white mt-5 w-full md:w-1/3">
              Experience the ultimate link-in-bio solution, your one-stop digital powerhouse
            </h6>
            <div className="flex flex-row mt-8">
              <Button className="text-black bg-white hover:bg-white">Claim your link</Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
