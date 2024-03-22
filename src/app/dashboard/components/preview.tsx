"use client"

import { useAppSelector } from "@/lib/hooks";
import { ILinkDetails } from "@/lib/store/linkSlice";
import { useEffect } from "react";

export default function Preview() {
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);

  // useEffect(() => {
  //   console.log('linkDetails');
  //   console.log(linkDetails);
  // },[])

  return (
    <div className="bg-white w-full h-full py-10 px-4">
      <img 
        className="w-16 h-16 mx-auto border-2 border-dashed bg-gray-50 rounded-full flex justify-center items-center overflow-hidden"
        src={linkDetails.profileImage ? linkDetails.profileImage:'https://placehold.co/50'} 
        alt="uploaded-image"
      />
      <h6 className="text-sm text-center mt-2">@{linkDetails.username}</h6>
      <h6 className="text-xs text-center">{linkDetails.bio}</h6>
    </div>
  )
}