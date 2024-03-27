import { UserDetails } from "@/interface/user-details";
import { useAppSelector } from "@/lib/hooks";
import { ILink } from "@/lib/store/linkSlice";
import supabase from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Preview(data: UserDetails) {
  const [links, setLinks] = useState<ILink[]>();
  const [avatar, setAvatar] = useState<string>();
  const selectedTheme = useAppSelector(state => state.link.selectedTheme);

  useEffect(() => {
    if (data) {
      if (data.avatar) {
        downloadAvatar(data.avatar!);
      }
      getUserLinks(data.id!)
    }
  },[])

  const downloadAvatar = async (avatarPath: string) => {
    const { data, error } = await supabase
      .storage
      .from('link-bucket')
      .download(avatarPath)

    if (data) {
      const objectUrl = URL.createObjectURL(data);
      setAvatar(objectUrl);
    }
    if (error) {
      console.log(error);
    }
  }

  const getUserLinks = async (id: number) => {
    if (id) {
      const { data, error } = await supabase
      .from('links')
      .select()
      .eq('uid', id)

      if (data) {
        setLinks(data);
      }
    }
  }

  return (
    <div className={`w-full md:max-w-[400px] h-screen py-10 px-4 mx-auto ${selectedTheme?.themeClass}`}>
      <img 
        className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex justify-center items-center overflow-hidden"
        src={avatar ? avatar:'https://placehold.co/50'} 
        alt="uploaded-image"
      />
      <h6 className="username text-sm text-center font-medium mt-2">@{data.username}</h6>
      <h6 className="bio text-xs text-center">{data.bio}</h6>

      <div className="my-6 flex flex-col gap-3">
        {links?.map(function(data: ILink) {
          return (
            <Link 
              key={data.url} 
              href={data.url}
              target="_blank"
              className="link-button rounded px-3 py-2 pointer-events-none"
            >
              <div className="link-text text-xs text-center">
                {data.title}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}