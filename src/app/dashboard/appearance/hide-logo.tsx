import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LinkwajoLogo from "../../../../public/link-logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { LockKeyhole } from "lucide-react";
import { UserDetails } from "@/interface/user-details";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { useAppSelector } from "@/lib/hooks";

interface IUserProps {
  user: UserDetails
}

interface ButtonProps {
  onOpen: (params: any) => any;
}

export default function HideLogo({ user }: IUserProps, { onOpen }: ButtonProps) {
  const [hideLogo, setHideLogo] = useState(false);

  const linkDetails: any = useAppSelector(state => state.link.linkDetails);

  useEffect(() => {
    setHideLogo(user.is_logo_visible!);
  },[])

  const handleHideLogo = async () => {
    setHideLogo(!hideLogo);

    const { error } = await supabase
      .from('users')
      .update({
        'is_logo_visible': hideLogo
      })
      .eq('id', linkDetails.id)
  }

  return (
    <Card>
      <CardHeader>
        <CardContent className="p-0 relative">
          <div className="flex flex-col space-y-5">
            <div className="flex justify-between">
              <Label htmlFor="username">Hide Linkwajo logo</Label>
              <Switch
                checked={hideLogo}
                onCheckedChange={() => handleHideLogo()}
              />
            </div>
            <div>
              <Image src={LinkwajoLogo} alt="linkwojo" className="w-auto h-10" />
            </div>
          </div>
          {user.tier === 'FREE' &&
            <span className="cursor-pointer absolute top-0 right-0 text-xs text-white bg-black rounded py-1 px-2 flex flex-row items-center"
              onClick={onOpen}
            >
              Upgrade
              <LockKeyhole className="w-3.5 h-3.5 ml-1 text-white" />
            </span>
          }
        </CardContent>
      </CardHeader>
    </Card>
  )
}