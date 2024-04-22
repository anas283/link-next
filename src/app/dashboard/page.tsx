"use client"

import { Pencil, Plus, Trash2, Upload } from "lucide-react";
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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Preview from "./components/preview";
import supabase from "@/utils/supabase";
import { UserDetails } from "@/interface/user-details";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ILink, setLinkDetails, setTheme } from "@/lib/store/linkSlice";
import { useToast } from "@/components/ui/use-toast"
import { setUserDetails } from "@/lib/store/authSlice";

export default function Dashboard() {
  const { register, setValue, getValues, control, handleSubmit, watch } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [userData, setUserData] = useState<UserDetails>();
  const dispatch = useAppDispatch();
  const { toast } = useToast()

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
          if (data[0].avatar) downloadAvatar(data[0].avatar);
          setUserData(data[0]);
          setValue('username', data[0].username);
          setValue('bio', data[0].bio);
          setLoading(false);
          dispatch(setLinkDetails(data[0]));
          getUserLinks(data[0].id)
          getAppearance(data[0].id)
          dispatch(setUserDetails(data[0]));
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
            append({ 
              id: link.id, 
              uid: link.uid, 
              title: link.title, 
              url: link.url, 
              mode: 'view' 
            })
          })
        }
      }
    }
  },[])

  const getAppearance = async (id: number) => {
    if (id) {
      const { data, error } = await supabase
      .from('appearance')
      .select()
      .eq('uid', id)

      if (data) {
        dispatch(setTheme({ themeClass: data[0].theme_class }))
      }
    }
  }

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
    handleAvatarUpload();
    saveLinks();

    const { error } = await supabase
      .from('users')
      .update({
        username: getValues("username"),
        bio: getValues("bio")
      })
      .eq('email', email)

    if (!error) {
      toast({
        description: "Your link has been published.",
      })
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
      console.log('success update avatar for: ' + email);
    }
  }

  const getCurrentLinks = async () => {
    const { data, error } = await supabase
      .from('links')
      .select()
    return data;
  }

  const saveLinks = async () => {
    const currentLinks = await getCurrentLinks();

    if (currentLinks?.length === getValues('links').length) {
      // Link changed, proceed to update
      const { data, error } = await supabase
        .from('links')
        .upsert(getValues('links'), { onConflict: 'id', ignoreDuplicates: false })
        .select()
  
      if (error) {
        console.log('error upsert link');
        console.log(error);
      }
    } else {
      // Link added, proceed insert
      const linkForm: ILink[] = getValues('links');
      const newLink = linkForm.filter(({ id: id1 }) => !currentLinks?.some(({ id: id2 }) => id2 === id1));

      console.log('inserting');
      console.log(newLink);

      const { data, error } = await supabase
        .from('links')
        .insert(newLink)

      if (error) {
        console.log('error insert link');
        console.log(error);
      }
    }
  }

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data);
  }

  const toggleLinkMode = (index: number, mode: string) => {
    if (mode === 'view') setValue('links.' + index + '.mode', 'edit')
    if (mode === 'edit') setValue('links.' + index + '.mode', 'view')
  }

  const deleteLink = async (index: number, id: number) => {
    remove(index);

    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)

    console.log('delete id: ' + id);
    console.log(error);

    if (!error) {
      toast({
        description: "Your link has been deleted.",
      })
    }
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-screen-xl mx-auto flex justify-between">
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
                    <div key={item.id}>
                      {watch('links')[index].mode === 'view' ?
                        <Card className="p-4 flex justify-between">
                          <div>
                            <h6 className="text-sm font-medium">{getValues('links')[index].title}</h6>
                            <h6 className="text-sm text-gray-500">{getValues('links')[index].url}</h6>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button className="w-8 h-8 p-0" variant="outline"
                              onClick={() => toggleLinkMode(index, watch('links')[index].mode)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-8 h-8 p-0" variant="outline">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Delete link?</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this link?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="justify-end">
                                  <DialogClose asChild>
                                    <Button type="button" variant="destructive"
                                      onClick={() => deleteLink(index, getValues('links')[index].id)}
                                    >
                                      Delete
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                          </div>
                        </Card>
                      :
                        <li className={index > 0 ? 'border-t pt-4':''}>
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
                            <div className="flex flex-row gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => toggleLinkMode(index, watch('links')[index].mode)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit"
                                onClick={() => setValue('links.' + index + '.mode', 'view')}
                              >
                                {watch('links')[index].mode === 'edit' ? 'Save':'Add'}
                              </Button>
                            </div>
                          </div>
                        </li>
                      }
                    </div>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full ${fields.length > 0} ? 'mt-4':'mt-0'`}
                  onClick={() => append({ uid: userData?.id, title: '', url: '' })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add link
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button onClick={() => publish()}>Publish</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <div className="bg-gray-400 rounded-3xl h-[77vh] max-h-[600px] shadow overflow-hidden border-4 border-black aspect-9/19">
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
    </div>
  )
}