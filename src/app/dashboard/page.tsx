"use client"

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import Preview from "./components/preview";
import { setLinkDetails } from "@/lib/store/linkSlice";
import supabase from "@/utils/supabase";
import { UserDetails } from "@/interface/user-details";

type LinkInputs = {
  docId: string,
  profileImage: string,
  username: string,
  bio: string
}

export default function Dashboard() {
  const { register, setValue, getValues } = useForm<LinkInputs>();
  const userDetails: any = useAppSelector(state => state.auth.userDetails);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [userData, setUserData] = useState<UserDetails>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    const getLinkData = async () => {
      const userData: any = localStorage.getItem('sb-mxjxkkgypfoucyqihuol-auth-token');
      if (userData) {
        const user = JSON.parse(userData).user;
        setEmail(user.email);

        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)

        if (data) {
          console.log('data');
          console.log(data[0]);

          downloadAvatar(data[0].avatar)
          setUserData(data[0]);
          setValue('username', data[0].username);
          setValue('bio', data[0].bio);

          setLoading(false);
        }
      }
    }
    getLinkData();
  },[])

  const downloadAvatar = async (avatarPath: string) => {
    const { data, error } = await supabase
      .storage
      .from('link-bucket')
      .download(avatarPath)

    if (data) {
      const objectUrl = URL.createObjectURL(data)
      setPreview(objectUrl);
    }
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl);
    setValue("profileImage", objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0] ?? file);
      console.log(e.target.files[0]);
    }
  };

  const handleAvatarUpload = async () => {
    const fileName: string = file?.name ?? '';
    const { data, error } = await supabase
      .storage
      .from('link-bucket')
      .upload('avatars/' + fileName, file!, {
        cacheControl: '3600',
        upsert: false
      })

    if (data) {
      saveAvatar(data.path);
    }
    if (error) {
      console.log(error);

      if (error.message === "The resource already exists") {
        saveAvatar('avatars/' + fileName);
      }
    }
  };

  const publish = async () => {
    console.log(getValues());

    handleAvatarUpload();

    const { error } = await supabase
      .from('users')
      .update({
        username: getValues("username"),
        bio: getValues("bio")
      })
      .eq('email', email)

    if (!error) {
      console.log('success update for: ' + email);
    }
  }

  const saveAvatar = async (path: string) => {
    const { error } = await supabase
      .from('users')
      .update({
        avatar: path,
      })
      .eq('email', email)

    if (!error) {
      console.log('success update for: ' + email);
    }
  }

  // const saveDetails = (
  //   profileImage?: string,
  //   username?: string,
  //   bio?: string
  // ) => {
  //   const linkDetails: any = {
  //     profileImage: profileImage ?? getValues("username"),
  //     username: username ?? getValues("username"),
  //     bio: bio ?? getValues("bio")
  //   }

  //   console.log('saving...');
  //   console.log(linkDetails);

  //   dispatch(setLinkDetails(linkDetails));
  // }

  return (
    <div className="p-4 bg-gray-50 h-full flex justify-between">
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <label htmlFor="file" className="w-28 h-28 border-2 border-dashed bg-gray-50 rounded-full flex justify-center items-center cursor-pointer overflow-hidden">
                  {preview ? 
                    <div>
                      <img src={preview} alt="uploaded-image" />
                    </div>
                  :
                    <div>
                      <Upload className="w-6 h-h-6 text-gray-400 flex mx-auto" />
                      <h6 className="text-xs text-gray-500 font-medium mt-2">Add Avatar</h6>
                    </div>
                  }
                  <input id="file" type="file" onChange={handleFileChange} className="invisible z-0 absolute" />
                </label>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username"
                    {...register('username')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" 
                    {...register('bio')}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => publish()}>Publish</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <div className="bg-gray-400 rounded-3xl w-[220px] h-[450px] shadow overflow-hidden">
          {loading ?
            <div className="w-full h-full flex justify-center items-center">
              <div className="border-shade-5 h-8 w-8 animate-spin rounded-full border-2 border-t-black border-r-black"></div>
            </div>
          :
            <Preview {...userData} />
          }
        </div>
      </div>
    </div>
  )
}