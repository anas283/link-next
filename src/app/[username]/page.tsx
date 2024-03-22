'use client';

import { useParams } from "next/navigation";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import ClaimUsername from "./claim-username";
import UserPage from "./user-page";
import { UserDetails } from "@/interface/user-details";

export default function Username() {
  const [isUserExist, setIsUserExist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<any>([]);
  const [userData, setUserData] = useState<UserDetails>();

  const params = useParams();
  const username = params.username as string;

  useEffect(() => {
    checkIfUsernameExist();    
  },[]);

  const checkIfUsernameExist = async () => {
    const users = (await supabase.from('users').select()).data;
    let isUsernameExist = users?.find((data) => { 
      return data['username'] === username
    })

    if (isUsernameExist) {
      const linksData = isUsernameExist['links'];
      const formattedLinks = JSON.parse(linksData);
      setLinks(formattedLinks);
      setUserData(isUsernameExist);
      setIsUserExist(true);
    } else {
      setIsUserExist(false);
    }
    setIsLoading(false);
  }

  return (
    <div>
      {!isLoading && (
        <div>
          {isUserExist ?
            <UserPage {...userData} />
          :
            <ClaimUsername username={username} />
          }  
        </div>
      )}
    </div>
  )
}