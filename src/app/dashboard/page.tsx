"use client"

import { Plus, Upload } from "lucide-react";
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
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Preview from "./components/preview";
import { ILink, ILinkDetails, setLinkDetails } from "@/lib/store/linkSlice";
import supabase from "@/utils/supabase";
import { UserDetails } from "@/interface/user-details";
import { connect } from "react-redux";
import { publish } from "./publish";

type LinkInputs = {
  docId: string,
  profileImage: string,
  username: string,
  bio: string
}

export default function Dashboard() {
  const { register, setValue, getValues, control, handleSubmit } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [userData, setUserData] = useState<UserDetails>();
  const dispatch = useAppDispatch();

  const userDetails: any = useAppSelector(state => state.auth.userDetails);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  });

  useEffect(() => {
    setLoading(true);

    const userData: any = localStorage.getItem('sb-mxjxkkgypfoucyqihuol-auth-token');
    const user = JSON.parse(userData).user;

    const getLinkData = async () => {
      if (userData) {
        setEmail(user.email);

        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)

        if (data) {
          // console.log('data');
          // console.log(data[0]);

          downloadAvatar(data[0].avatar)
          setUserData(data[0]);
          setValue('username', data[0].username);
          setValue('bio', data[0].bio);
          // append({ title: '', url: '' });
          setLoading(false);

          getUserLinks(data[0].id)
        }
      }
    }
    getLinkData();

    const getUserLinks = async (id: number) => {
      if (id) {
        const { data, error } = await supabase
        .from('links')
        .select()
        .eq('uid', id)

        if (data) {
          data.map((link) => {
            append({ title: link.title, url: link.url })
          })
        }
      }
    }
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
    if (fileName) {
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
    }
  };

  const publish = async () => {
    // console.log(getValues());

    handleAvatarUpload();
    saveLinks();

    // const { error } = await supabase
    //   .from('users')
    //   .update({
    //     username: getValues("username"),
    //     bio: getValues("bio")
    //   })
    //   .eq('email', email)

    // if (!error) {
    //   console.log('success update for: ' + email);
    // }
  }

  const saveAvatar = async (path: string) => {
    const { error } = await supabase
      .from('users')
      .update({
        avatar: path,
      })
      .eq('email', email)

    if (!error) {
      console.log('success update avatar for: ' + email);
    }
  }

  const checkIfLinkExist = async (id: number) => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('uid', id)

    let linksData = [...getValues("links")];
    linksData.forEach((link) => {
      link.uid = id
    })
    
    console.log('isLinkExist: ');
    console.log(data);

    console.log('linksData: ');
    console.log(linksData);

    // TODO: check if links exist
  }

  const saveLinks = async () => {
    const uid = userData?.id;

    const isLinkExist = checkIfLinkExist(uid!);

    // if (!isLinkExist) {
    //   const { error } = await supabase
    //     .from('links')
    //     .insert(
    //       getValues("links")
    //     )
    //     .eq('uid', uid)

    //   if (!error) {
    //     console.log('success insert link for: ' + uid);
    //   }
    //   else {
    //     console.log(error);
    //   }
    // } else {

    // }
  }

  const addLinkURL = () => {
    console.log(fields);
    append({ title: '', url: '' });
  }

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data);
    
    // dispatch(setLinkDetails(getValues() as any));
    // publish(data);
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

          <CardHeader className="py-3">
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul className="flex flex-col gap-4">
                {fields.map((item, index) => (
                  <li key={item.id} className={index > 0 ? 'border-t pt-4':''}>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title"
                          {...register(`links.${index}.title`)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="url">URL</Label>
                        <Input id="url"
                          {...register(`links.${index}.url`)}
                        />
                      </div>
                      {/* <Button type="submit">Add</Button> */}
                    </div>
                    {/* <Button type="button" onClick={() => remove(index)} className="mt-2">
                      Delete
                    </Button> */}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={() => append({ title: '', url: '' })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add more link
              </Button>
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