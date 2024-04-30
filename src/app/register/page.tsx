"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Check, Loader2, MoveLeft, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import supabase from "@/utils/supabase";
import { setCookie } from "cookies-next";

type RegisterInputs = {
  email: string,
  password: string
}
import LoginCover from "../../../public/home/login-cover.png";
import Image from "next/image";

export default function Register() {
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<RegisterInputs>();
  const [isClaimed, setIsClaimed] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const googleUserData: any = localStorage.getItem('sb-mxjxkkgypfoucyqihuol-auth-token');
      if (googleUserData) {
        const user = JSON.parse(googleUserData).user;
        setCookie("token", JSON.parse(googleUserData).access_token);
        if (user.email) checkIfEmailRegistered(user.email);
      }
    }, 200);
  },[])

  const checkIfEmailRegistered = async (email: string) => {
    setIsClaimed(true);

    const users = (await supabase.from('users').select()).data;
    let isEmailExist = users?.find((data) => { 
      return data['email'] === email
    });

    if (isEmailExist) {
      setError('This email is already registered!');
    } else {
      registerUsername(email);
    }
  }

  const onSearch = (e: any) => {
    setLoading(true);
    setSearch(e.target.value);
    debouncedHandleSearch(e.target.value)
  }

  const handleSearch = async (username: string) => {
    const users = (await supabase.from('users').select()).data;

    let isUsernameExist = users?.find((data) => { 
      return data['username'] === username
    })

    if (isUsernameExist) {
      setAvailable(false);
    } else {
      setAvailable(true);
      localStorage.setItem('search-username', username);
      setUsername(username);
    }

    setLoading(false);
  }

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 800), []);

  const onSubmit: SubmitHandler<RegisterInputs> = data => {
    setLoading(true);
    signUpNewUser(data);
  }

  const signUpNewUser = async (user: RegisterInputs) => {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    })

    if (data) {
      registerUsername(user.email);
    }
    if (error) {
      setError('This email is already registered!');
    }
  }

  const registerUsername = async (email: string) => {
    const username = localStorage.getItem('search-username') ?? search;

    const { data, error } = await supabase
      .from("users")
      .insert({ username: username, email: email })
      .select()

    if (data) {
      setDefaultAppearance(data[0]);
    }
  }

  const setDefaultAppearance = async (userData: any) => {
    const { data, error } = await supabase
      .from("appearance")
      .insert({ uid: userData.id, theme_class: 'iris-snow' })
      .select()

    if (data) {
      const { data } = await supabase.auth.signInWithPassword({
        email: getValues("email"),
        password: getValues("password"),
      })
  
      if (data) {
        setCookie("token", data.session?.access_token);
      }
      setLoading(false);
      router.push('/dashboard');
    }
  }

  const signUpWithGoogle = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://www.linkwajo.com/register',
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
          {isClaimed ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button variant="ghost" onClick={() => setIsClaimed(!isClaimed)} className="p-0 hover:bg-transparent">
                <MoveLeft className="h-6 w-6" />
              </Button>
              <h6 className="text-gray-500 mt-3">linkwajo.com/{username} is yours!</h6>
              <h1 className="text-3xl font-bold">Now, create your account.</h1>

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
                      Create Account
                    </Button>
                  </div>
                :
                  <Button onClick={(e) => signUpWithGoogle(e)} className="rounded-full px-6">
                    Sign up with Google
                  </Button>
                }
              </div>
            </form>
          :
            <div>
              <h1 className="text-3xl font-bold">First, claim your unique link</h1>
              <h6 className="text-gray-500 mt-3">The good ones are still available!</h6>
              <div className="relative">
                <Input type="email" placeholder="your-name" className="mt-5"
                  value={search}
                  onChange={onSearch}
                />
                {search &&
                  <div>
                    {loading ? (
                      <div>
                        <div className="w-4 h-4 rounded-full flex justify-center items-center absolute top-2.5 right-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        {available ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex justify-center items-center absolute top-2.5 right-3">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute top-2.5 right-3">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                }
              </div>
              <Button className={`rounded-full px-6 mt-5 ${search ? "visible":"invisible"}`} onClick={() => setIsClaimed(!isClaimed)}
                disabled={loading || !available}
              >
                Grab my link
              </Button>
            </div>
          }
        </div>

        <div className="w-full lg:w-1/2 pl-10 flex justify-center items-center order-1 lg:order-2">
          <Image src={LoginCover} alt="login" width={216} height={228} />
        </div>

      </div>
    </div>
  )
}