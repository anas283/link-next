"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useAppDispatch } from "@/lib/hooks";
import { setCookie } from "cookies-next";
import supabase from "@/utils/supabase";
import LoginCover from "../../../public/home/login-cover.png";
import Image from "next/image";

type LoginInputs = {
  email: string,
  password: string
}

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      const googleUserData: any = localStorage.getItem('sb-mxjxkkgypfoucyqihuol-auth-token');
      if (googleUserData) {
        const user = JSON.parse(googleUserData).user;
        if (user.email) checkIfEmailRegistered(user.email, JSON.parse(googleUserData).access_token);
      }
    }, 350);
  },[])

  const checkIfEmailRegistered = async (email: string, token: string) => {
    const users = (await supabase.from('users').select()).data;
    let isEmailExist = users?.find((data) => { 
      return data['email'] === email
    });

    if (isEmailExist) {
      setCookie("token", token);
      router.push('/dashboard');
    } else {
      setError('This email is not registered yet!');
    }
  }

  const onSubmit: SubmitHandler<LoginInputs> = data => {
    signIn(data);
  }

  const signIn = async (user: LoginInputs) => {
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })

    if (data) {
      setCookie("token", data.session?.access_token);
      router.push('/dashboard');
      setLoading(false);
    }
    if (error) {
      setError("Invalid login credentials");
      setLoading(false);
    }
  }

  const signInWithGoogle = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/login',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    })
  }
 
  return (
    <div className="min-h-screen min-w-screen flex items-center">
      <div className="w-full max-w-4xl flex mx-auto flex-col lg:flex-row lg:justify-between px-8">

        <div className="w-full lg:w-1/2 lg:pr-10 flex items-center order-2 lg:order-1 mt-10 lg:mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-3xl font-bold">Log in to your Link</h1>
            <h6 className="text-gray-500 mt-3">Welcome back!</h6>

            {error &&
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            }

            <div>
              <Input type="email" placeholder="Email" className="mt-5"
                {...register("email")}
              />
              <Input type="password" placeholder="Password" className="mt-5"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && 
                <div className="text-sm text-red-500 mt-2">Password must be at least 8 characters</div>
              }
            </div>
            <div className={`mt-4 text-sm ${watch("email") ? "invisible" : "flex"}`}>
              OR
            </div>
            <div className="mt-5">
              {watch("email") ?
                <div>
                  <Button type="submit" disabled={loading} className="rounded-full px-6">
                    {loading &&
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Login
                  </Button>
                </div>
              :
                <Button onClick={(e) => signInWithGoogle(e)} className="rounded-full px-6">Sign in with Google</Button>
              }
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 pl-10 flex justify-center items-center order-1 lg:order-2">
          <Image src={LoginCover} alt="login" width={216} height={228} />
        </div>

      </div>
    </div>
  )
}