"use client"

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Upgrade() {

  const choosePlan = (plan: string) => {
    localStorage.setItem("choose-plan", plan);
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-6xl mx-auto py-14">

        <div>
          <Link href="dashboard">
            <Button variant="ghost">
              <ChevronLeft className="w-4 h-4 mr-2" />Back
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto">
            Choose the right plan for you
          </h1>
          <h6 className="text-[15px] text-gray-600 font-normal text-center max-w-xl mx-auto mt-8">
            You can change at anytime 
          </h6>
        </div>

        <div className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="flex flex-col md:flex-row justify-center gap-10">
              <div className="flex flex-col p-6 md:w-[380px] text-center text-gray-900 bg-white rounded-lg border-2 border-blue-500 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold text-blue-500">Pro</h3>
                <p className="min-h-12 font-light text-gray-500 sm:text-md dark:text-gray-400">Relevant for content creators and businesses</p>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-5xl font-extrabold">
                    $5
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <p className="text-start mb-3">
                  Everything in Free, plus:
                </p>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Advanced customization options</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Conversion tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Upgraded customer support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Option to hide Linkwajo logo</span>
                  </li>
                </ul>
                <Link 
                  href="https://buy.stripe.com/test_cN25l33uhcKp63K8ww"
                  // href="https://buy.stripe.com/9AQ03f2GkdIG1LW9AA" 
                  // target="_blank"
                > 
                  <Button className="mt-auto bg-blue-500 w-full"
                    onClick={() => choosePlan("Pro")}
                  >
                    Get Pro
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col p-6 md:w-[380px] text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                <p className="min-h-12 font-light text-gray-500 sm:text-md dark:text-gray-400">Best for brands and businesses</p>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-5xl font-extrabold">
                    $10
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <p className="text-start mb-3">
                  Everything in Premium, plus:
                </p>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Verified badge</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Data export capabilities</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Exclusive content</span>
                  </li>
                </ul>
                <Link 
                  href="https://buy.stripe.com/test_aEUdRz7KxdOtdwc289"
                  // href="https://buy.stripe.com/8wMcQ16WA0VUeyIdQS" 
                  // target="_blank"
                >
                  <Button className="mt-auto w-full border-black"
                    onClick={() => choosePlan("Premium")}
                  >
                    Get Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}