import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LinkwajoLogo from "../../../../public/link-logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { LockKeyhole } from "lucide-react";

export default function HideLogo({ onOpen }: any) {
  return (
    <Card className="relative overflow-hidden">

      <div className="absolute bg-gray-500 w-full h-full top-0 z-10 opacity-90 flex justify-center items-center">
        <div className="text-white text-2xl font-bold">
          Coming Soon
        </div>
      </div>

      <CardHeader>
        <CardContent className="p-0 relative">
          <div className="flex flex-col space-y-5">
            <Label htmlFor="username">Hide Linkwajo logo</Label>
            <div>
              <Image src={LinkwajoLogo} alt="linkwojo" className="w-auto h-10" />
            </div>
          </div>
          <span className="cursor-pointer absolute top-0 right-0 text-xs text-white bg-black rounded py-1 px-2 flex flex-row items-center"
            onClick={onOpen}
          >
            Upgrade
            <LockKeyhole className="w-3.5 h-3.5 ml-1 text-white" />
          </span>
        </CardContent>
      </CardHeader>
    </Card>
  )
}