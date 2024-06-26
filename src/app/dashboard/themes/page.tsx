'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import Preview from "../components/preview";
import { ITheme, themes } from "./theme-list";
import { setTheme } from "@/lib/store/linkSlice";
import Image from "next/image";
import supabase from "@/utils/supabase";
import { LockKeyhole, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Themes() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);
  const selectedTheme = useAppSelector(state => state.link.selectedTheme);
  const dispatch = useAppDispatch();

  const selectTheme = async (theme: ITheme) => {
    const userTier = "Free";

    if (userTier === "Free" && theme.type === "Free") {
      dispatch(setTheme(theme));
  
      const { error } = await supabase
        .from('appearance')
        .update({ theme_class: theme.themeClass })
        .eq('uid', linkDetails.id)
    } else {
      setOpen(true);
    }
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
                      <h6 className="text-sm text-center mt-1">
                        {theme.name}
                      </h6>
                      {theme.type === 'Premium' && 
                        <div>
                          <span className="absolute top-2 right-4 text-xs text-white bg-black rounded py-1 px-2 flex flex-row items-center">
                            Upgrade
                            <LockKeyhole className="w-3.5 h-3.5 ml-1 text-white" />
                          </span>
                        </div>
                      }
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <div className="bg-gray-400 rounded-3xl h-[77vh] max-h-[600px] shadow overflow-hidden border-4 border-black aspect-9/19">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Try Premium to use this feature</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Get 30 days of Pro for free. Cancel anytime.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col my-2 text-sm">
            <h5>
              Grow, know and own your audience with a free 30-day Pro trial. Just RM16.50 MYR/month after. Get instant access to Pro features, including:
            </h5>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-row">
                <Check className="w-5 h-5 mt-0.5 mr-2" />
                Lifetime analytics and powerful insights
              </div>
              <div className="flex flex-row">
                <Check className="w-5 h-5 mt-0.5 mr-2" />
                Unlimited customization for your brand
              </div>
              <div className="flex flex-row">
                <Check className="w-5 h-5 mt-0.5 mr-2" />
                Integration with third-party marketing tools
              </div>
              <div className="flex flex-row">
                <Check className="w-5 h-5 mt-0.5 mr-2" />
                Priority customer support and much more
              </div>
            </div>
          </div>
          <DialogFooter className="justify-end">
            <Button type="button" variant="outline">
              View all plans
            </Button>
            <Button type="button">
              Free for 30 days
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}