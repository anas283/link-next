"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { database } from "../../firebase/config";
import { collection } from "firebase/firestore";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { setUserDetails } from "@/lib/store/authSlice";
import { setCookie } from "cookies-next";

type LoginInputs = {
  email: string,
  password: string
}

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const dbInstance = collection(database, 'user-links');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginInputs> = data => {
    signIn(data);
  }

  const signIn = async (user: LoginInputs) => {
    setError('');
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        console.log(user);
        setCookie("token", user.accessToken);
        router.push('/dashboard');
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
      });
  }

  const signInWithGoogle = (event: any) => {
    event.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result: any) => {
        const user = result.user;
        console.log(user);
        setCookie("token", user.accessToken);
        dispatch(setUserDetails(user));
        router.push('/dashboard');
      }).catch((error) => {
        console.log(error);
      });
  }
 
  return (
    <div className="min-h-screen min-w-screen flex items-center">
      <div className="max-w-6xl flex mx-auto justify-between px-8">

        <div className="w-1/2 pr-10 flex items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-3xl font-bold">Log in to your Link</h1>
            <h6 className="text-gray-500 mt-3">Welcome back!</h6>

            {error &&
              <Alert variant="destructive" className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Invalid login credentials
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
                  <Button type="submit" disabled={loading}>
                    {loading &&
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Login
                  </Button>
                </div>
              :
                <Button onClick={(e) => signInWithGoogle(e)}>Sign in with Google</Button>
              }
            </div>
          </form>
        </div>

        <div className="w-1/2 pl-10">
          <img src="https://placehold.co/600x400" alt="image" className="rounded-lg" />
        </div>

      </div>
    </div>
  )
}