import { UserDetails } from "@/interface/user-details";
import { ILink } from "@/lib/store/linkSlice";
import supabase from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ITheme } from "../dashboard/appearance/theme-list";
import LinkwajoLogoSmall from "../../../public/link-logo-small.png"; 
import Image from "next/image";

export default function UserPage(data: UserDetails) {
  const [links, setLinks] = useState<ILink[]>();
  const [avatar, setAvatar] = useState<string>();
  const [appearance, setAppearance] = useState<ITheme>();

  useEffect(() => {
    if (data) {
      console.log('data');
      console.log(data);
      
      if (data.avatar) {
        downloadAvatar(data.avatar!);
      }
      getUserLinks(data.id!)
      getAppearance(data.id!)
      handleViewCounter(data)
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

  const getAppearance = async (id: number) => {
    if (id) {
      const { data, error } = await supabase
      .from('appearance')
      .select()
      .eq('uid', id)

      if (data) {
        setAppearance({ themeClass: data[0].theme_class });
      }
    }
  }

  const handleViewCounter = async (data: UserDetails) => {
    const { error } = await supabase
      .from('users')
      .update({
        views: data.views! + 1
      })
      .eq('id', data.id)

    if (error) {
      console.log(error);
    }
  }

  const handleLinkCounter = async (id: number) => {
    const { data } = await supabase
      .from('links')
      .select()
      .eq('id', id)

    if (data) {
      const clicks = data[0].clicks;
      const { error } = await supabase
        .from('links')
        .update({
          clicks: clicks + 1
        })
        .eq('id', id)

      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={`w-full h-screen ${appearance?.themeClass}`}>
      <div className="md:max-w-[400px] py-10 px-4 mx-auto">
        <img 
          className="w-28 h-28 mx-auto bg-gray-50 rounded-full flex justify-center items-center overflow-hidden"
          src={avatar ? avatar:'https://placehold.co/50'} 
          alt="uploaded-image"
        />
        <h6 className="username text-lg text-center font-medium mt-2">@{data.username}</h6>
        <h6 className="bio text-center">{data.bio}</h6>

        <div className="my-8 flex flex-col gap-4">
          {links?.map(function(data: ILink) {
            return (
              <Link 
                key={data.url} 
                href={data.url}
                target="_blank"
                className="link-button rounded px-4 py-3 cursor-pointer"
                onClick={() => handleLinkCounter(data.id)}
              >
                <div className="link-text text-center">
                  {data.title}
                </div>
              </Link>
            )
          })}
        </div>

        {data.is_logo_visible &&
          <Link 
            href="/"
            className="w-fit p-2 mx-auto bg-white rounded-full border border-black flex items-center gap-2"
          >
            <Image src={LinkwajoLogoSmall} alt="linkwojo" className="h-6 w-auto" />
            <h6 className="text-sm font-semibold mr-2">Create your Linkwajo</h6>
          </Link>
        }
      </div>
    </div>
  )
}