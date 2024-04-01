'use client'

import Image from "next/image";
import LinkwajoLogo from "../../../public/link-logo.png"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "@/utils/supabase";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Check, X } from "lucide-react";
import { useState } from "react";
import Template1Image from "../../../public/template-1.png";
import Template2Image from "../../../public/template-2.png";

type NotifyInputs = {
  email: string,
}

export default function ComingSoon() {
  const { register, handleSubmit, formState: { errors } } = useForm<NotifyInputs>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onSubmit: SubmitHandler<NotifyInputs> = data => {
    addUserInWaitingList(data);
  }

  const addUserInWaitingList = async (userData: NotifyInputs) => {
    setIsSubmit(true);

    const { data, error } = await supabase
      .from('waiting_list')
      .upsert({ email: userData.email }, { onConflict: 'email', ignoreDuplicates: false })
      .select()

    if (data) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center px-2 md:px-0 relative overflow-hidden">

      <Image 
        priority={true}
        src={Template2Image} alt="template-1" 
        className="absolute -bottom-6 md:bottom-8 -left-16 w-28 md:w-32 lg:w-48 rotate-45 z-0"
        width={192}
        height={416}
      />
      <Image 
        priority={true}
        src={Template1Image} alt="template-2" 
        className="absolute -bottom-36 lg:-bottom-60 left-0 w-28 md:w-32 lg:w-48 rotate-45 z-0"
        width={192}
        height={416}
      />

      <div className="relative z-10">
        <Image src={LinkwajoLogo} alt="linkwojo" className="h-10 w-auto mx-auto" />
        <h1 className="text-5xl md:text-7xl font-bold text-center max-w-3xl mx-auto mt-4">
          Coming Soon
        </h1>
        <h6 className="text-sm md:text-lg text-gray-600 font-normal text-center max-w-xl mx-auto mt-6 md:mt-8">
          The simple link in bio for product-focused users. <br /> 
          Works whatever you do.
        </h6>

        {(!isSubmit && !success) &&
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-8"
          >
            <div className="flex justify-between w-full gap-4">
              <Input 
                placeholder="Enter your email" 
                type="email" 
                {...register('email', {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })} 
              />
              <Button type="submit">Notify me</Button>
            </div>
            {errors.email && <span className="text-red-500 text-sm mt-2">{errors.email.message}</span>}
          </form>
        }

        {isSubmit && 
          <div>
            {success &&
              <Alert className="flex flex-row gap-3 mt-5">
                <div className="h-6 w-6 bg-green-500 rounded-full flex justify-center items-center"> 
                  <Check className="h-4 w-4" style={{ color: 'white' }} />
                </div>
                <div>
                  <AlertTitle>Thank you!</AlertTitle>
                  <AlertDescription>
                    We will notify you once we launched.
                  </AlertDescription>
                </div>
              </Alert>
            }
            {error &&
              <Alert className="flex flex-row gap-3 mt-5">
                <div className="h-6 w-6 bg-red-500 rounded-full flex justify-center items-center"> 
                  <X className="h-4 w-4" style={{ color: 'white' }} />
                </div>
                <div>
                  <AlertTitle>We are sorry.</AlertTitle>
                  <AlertDescription>
                    There is an issue while adding your email. Please try again!
                  </AlertDescription>
                </div>
              </Alert>
            }
          </div>
        }
      </div>
    </div>
  )
}