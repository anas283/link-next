import { Button } from "@/components/ui/button";
import Image from "next/image";
import GridBg from "../../public/grid-bg.png";
import { MoveRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={GridBg} alt="grid"
        className="absolute top-0 object-fit w-full z-0"
      />
      <div className="z-10 max-w-6xl w-full items-center justify-between text-sm lg:flex">
        <div className="w-full mt-14">

          {/* landing */}
          <div>
            <div className="bg-white px-4 py-2 shadow flex flex-row items-center mx-auto w-fit rounded-full border cursor-pointer">
              <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-blue-500 mr-3">Latest</span>
              <span>Link is now in development</span>
              <MoveRight className="w-4 h-4 ml-2" />
            </div>
            <h1 className="text-5xl font-semibold text-center max-w-3xl mx-auto mt-8">
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
              <img className="rounded-lg" src="https://placehold.co/300x600" alt="" />
            </div>
          </div>

          {/* features */}
          <div className="py-20">
            <h6 className="text-center uppercase tracking-widest">A complete link platform</h6>
            <h2 className="text-center text-4xl font-bold">Smoothly run your content machine</h2>
            <p className="text-gray-600 text-center text-[15px] mt-3">
              Link is a simple yet powerfull platform that helps
              create a superfast link page for you.
            </p>
          </div>

          {/* how it works */}

        </div>

      </div>
    </main>
  );
}
