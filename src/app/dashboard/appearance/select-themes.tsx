import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ITheme, themes } from "./theme-list"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBackground, setBackgroundColor, setButtonColor, setGradientDirection, setTheme } from "@/lib/store/linkSlice";
import supabase from "@/utils/supabase";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";

export default function SelectThemes({ onOpen }: any) {
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);
  const selectedTheme = useAppSelector(state => state.link.selectedTheme);
  const dispatch = useAppDispatch();

  const selectTheme = async (theme: ITheme) => {
    if (
      (linkDetails.tier === "FREE" && theme.type === "Free") ||
      linkDetails.tier === "PRO" || linkDetails.tier === "PREMIUM"
    ) {
      dispatch(setTheme(theme));
      dispatch(setBackground({
        name: "",
        previewImage: ''
      }))
      dispatch(setBackgroundColor(""));
      dispatch(setButtonColor(""));
      dispatch(setGradientDirection(""));
  
      const { error } = await supabase
        .from('appearance')
        .update({ theme_class: theme.themeClass })
        .eq('uid', linkDetails.id)
    } else {
      onOpen()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Themes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
          {themes.map((theme, key) => {
            return (
              <div key={key} className="group flex w-full flex-col items-center focus:outline-none self-stretch"
                onClick={() => selectTheme(theme)}
              >
                <div className={`border rounded overflow-hidden cursor-pointer relative ${selectedTheme?.name === theme.name ? 'border-black border-dashed border-2':''}`}>
                  <Image src={theme.previewImage} alt={theme.name} width={120} height={200} className="object-cover w-full h-auto" />
                  {(linkDetails.tier === 'FREE' && theme.type !== 'Free') && 
                    <div>
                      <span className="absolute top-2 right-2 text-xs text-white bg-black rounded py-1 px-2 flex flex-row items-center">
                        Upgrade
                        <LockKeyhole className="w-3.5 h-3.5 ml-1 text-white" />
                      </span>
                    </div>
                  }
                </div>
                <h6 className="text-sm text-center mt-1">
                  {theme.name}
                </h6>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}