"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function SuccessPayment() {
  const [success, setSuccess] = useState(false);
  const [plan, setPlan] = useState("");
  const searchParams = useSearchParams();
  const checkout_id = searchParams.get('checkout_id');

  useEffect(() => {
    if (checkout_id) {
      checkPaymentStatus(checkout_id);
    }
  },[])

  const checkPaymentStatus = async (checkoutSessionId: string) => {
    // TODO: change to live key
    const stripe = new Stripe(process.env.STRIPE_TEST_KEY!)
    const session = await stripe.checkout.sessions.retrieve(
      checkoutSessionId
    );
    if (session.payment_status === "paid") {
      setSuccess(true);
      const choosedPlan: string = localStorage.getItem("choose-plan") || '';
      setPlan(choosedPlan);
    }
  }

  return (
    <div className="flex min-h-screen items-center">
      {success ?
        <div className="w-fit max-w-6xl mx-auto py-14">
          <div className="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className="lucide lucide-circle-check text-green-500"
            >
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h5 className="text-xl text-center font-medium mt-2">Thanks for subscribing</h5>
          <h6 className="text-sm text-gray-500 text-center mt-3">
            You can now enjoy the benefits of {plan} plan
          </h6>
          <Link href="/dashboard">
            <Button className="flex mx-auto mt-5">Go to dashboard</Button>
          </Link>
        </div>
      :
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-shade-5 h-8 w-8 animate-spin rounded-full border-2 border-t-black border-r-black"></div>
        </div>
      }
    </div>
  )
}