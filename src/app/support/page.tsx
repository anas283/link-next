'use client';

import Image from "next/image";
import LinkwajoLogoSmall from "../../../public/link-logo-small.png"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/hooks";
import supabase from "@/utils/supabase";
import { useToast } from "@/components/ui/use-toast"

type SupportInputs = {
  subject: string,
  message: string
}

export default function Support() {
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupportInputs>();
  const userDetails: any = useAppSelector(state => state.auth.userDetails);

  const onSubmit: SubmitHandler<SupportInputs> = data => {
    submitSupport(data);
  }

  const submitSupport = async (support: SupportInputs) => {
    console.log(userDetails.email);
    console.log(support.subject);
    console.log(support.message);

    const { data, error } = await supabase
      .from('customer_support')
      .insert({
        email: userDetails.email,
        subject: support.subject,
        message: support.message
      })
      .select()

    if (data) {
      toast({
        title: "Successfully sent!",
        description: "We will get back to you as soon as possible.",
      })
      reset();
    }
  }

  return (
    <div className="flex min-h-screen items-center">
      <div className="w-full max-w-2xl mx-auto px-4 lg:px-0 py-14">
        <div className="flex flex-row gap-2">
          <Image src={LinkwajoLogoSmall} alt="linkwojo" className="w-6 h-6" />
          <h6 className="font-medium">Linkwajo support</h6>
        </div>

        <Card className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-lg">How can we help?</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="Summary of the problem you have"
                      {...register("subject", { required: true })}
                      className={`${errors.subject ? 'border-red-500':''}`}
                    />
                    {errors.subject && 
                      <div className="text-sm text-red-500 mt-2">Subject is required</div>
                    }
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe the issue you're facing, along with any relevant information"
                      {...register("message", { required: true })}
                      className={`${errors.message ? 'border-red-500':''}`}
                    />
                    {errors.message && 
                      <div className="text-sm text-red-500 mt-2">Message is required</div>
                    }
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Send support request</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}