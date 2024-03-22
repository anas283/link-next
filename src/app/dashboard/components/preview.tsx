import { UserDetails } from "@/interface/user-details";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Links {
  image: string;
  link: string;
  social: string;
  username: string;
}

export default function Preview(data: UserDetails) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (data && data.links) {
      const links = data.links || '';
      setLinks(JSON.parse(links));
      console.log(JSON.parse(links));
    }
  },[])

  return (
    <div className="bg-white w-full md:max-w-[400px] h-screen py-10 px-4 border mx-auto">
      <img 
        className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex justify-center items-center overflow-hidden"
        src={data.profileImage ? data.profileImage:'https://placehold.co/50'} 
        alt="uploaded-image"
      />
      <h6 className="text-sm md:text-normal text-center mt-2">@{data.username}</h6>
      <h6 className="text-xs md:text-sm text-center">{data.bio}</h6>

      <div className="mt-5 flex flex-col gap-4">
        {links.map(function(data: Links) {
          return (
            <Link 
              key={data.link} 
              href={data.link}
              target="_blank"
              className="bg-blue-500 rounded px-4 py-3 cursor-pointer"
            >
              <div className="text-white">{data.username}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}