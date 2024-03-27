'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import Preview from "../components/preview";
import { ITheme, themes } from "./theme-list";
import { setTheme } from "@/lib/store/linkSlice";
import Image from "next/image";
import supabase from "@/utils/supabase";

export default function Themes() {
  const [loading, setLoading] = useState<boolean>(false);
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);
  const selectedTheme = useAppSelector(state => state.link.selectedTheme);
  const dispatch = useAppDispatch();

  const selectTheme = async (theme: ITheme) => {
    dispatch(setTheme(theme));

    const { error } = await supabase
      .from('appearance')
      .update({ theme_class: theme.themeClass })
      .eq('uid', linkDetails.id)
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
                {themes.map((theme, key) => {
                  return (
                    <div key={key} className="group relative flex w-full flex-col items-center focus:outline-none self-stretch"
                      onClick={() => selectTheme(theme)}
                    >
                      <div className={`border rounded overflow-hidden cursor-pointer ${selectedTheme?.name === theme.name ? 'border-black border-dashed border-2':''}`}>
                        <Image src={theme.previewImage} alt={theme.name} width={120} height={200} className="object-cover" />
                      </div>
                      <h6 className="text-sm text-center mt-1">{theme.name}</h6>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <div className="bg-gray-400 rounded-3xl w-[220px] h-[450px] shadow overflow-hidden border-4 border-black">
            {loading ?
              <div className="w-full h-full flex justify-center items-center">
                <div className="border-shade-5 h-8 w-8 animate-spin rounded-full border-2 border-t-black border-r-black"></div>
              </div>
            :
              <Preview {...linkDetails} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}