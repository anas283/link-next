"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

enum PricingType {
  Monthly,
  Annually
}

export default function Templates() {
  const router = useRouter();
  const [pricingType, setPricingType] = useState(PricingType.Monthly);

  const proPriceMonthly = 5;
  const proPriceAnnually = 3;

  const premiumPriceMonthly = 10;
  const premiumPriceAnnually = 8;

  const register = (tier?: string, frequency?: string) => {
    if (frequency) {
      router.push('register?tier=' + tier + '&frequency=' + frequency);
    } else {
      router.push('register?tier=' + tier);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-20">

        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-center max-w-3xl mx-auto">
            Pricing plans for everyone
          </h1>
          <h6 className="text-[15px] text-gray-600 font-normal text-center max-w-xl mx-auto mt-8">
            Save up to 20% on annual plan
          </h6>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-muted p-1 rounded-lg">
            <Button 
              onClick={() => setPricingType(PricingType.Monthly)}
              className={`${pricingType === PricingType.Monthly ? '' : 'bg-transparent text-slate-500 hover:text-white'}`}
            >
              Monthly
            </Button>
            <Button 
              onClick={() => setPricingType(PricingType.Annually)}
              className={`${pricingType === PricingType.Annually ? '' : 'bg-transparent text-slate-500 hover:text-white'}`}
            >
              Annually
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Free</h3>
                <p className="min-h-12 font-light text-gray-500 sm:text-md dark:text-gray-400">Best option for personal use & simple link</p>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-5xl font-extrabold">$0</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Unlimited links</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-auto"
                  onClick={() => register('free')}
                >
                  Join for free
                </Button>
              </div>
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-2 border-blue-500 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Pro</h3>
                <p className="min-h-12 font-light text-gray-500 sm:text-md dark:text-gray-400">Relevant for content creators and businesses</p>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-5xl font-extrabold">
                    ${ pricingType === PricingType.Monthly ? proPriceMonthly : proPriceAnnually }
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
                <Button className="mt-auto"
                  onClick={() => register('pro', pricingType === PricingType.Monthly ? 'monthly':'annually')}
                >
                  Get Pro
                </Button>
              </div>
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                <p className="min-h-12 font-light text-gray-500 sm:text-md dark:text-gray-400">Best for brands and businesses</p>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-5xl font-extrabold">
                    ${ pricingType === PricingType.Monthly ? premiumPriceMonthly : premiumPriceAnnually }
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
                <Button variant="outline" className="mt-auto"
                  onClick={() => register('premium', pricingType === PricingType.Monthly ? 'monthly':'annually')}
                >
                  Get Premium
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}