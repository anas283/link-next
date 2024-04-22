'use client'

import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import Preview from "../components/preview";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import SelectButtons from "./select-buttons";
import SelectThemes from "./select-themes";
import SelectBackgrounds from "./select-background";
import HideLogo from "./hide-logo";
import SelectFonts from "./select-font";
import { UserDetails } from "@/interface/user-details";

export default function Themes() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const userDetails: UserDetails = useAppSelector(state => state.auth.userDetails);
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);

  const handleOpenDialog = () => {
    setOpen(!open);
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <div className="w-full md:w-1/2 flex flex-col gap-y-5 pb-5">
          <SelectThemes onOpen={handleOpenDialog} />
          <HideLogo onOpen={handleOpenDialog} />
          <SelectBackgrounds onOpen={handleOpenDialog} />
          <SelectButtons onOpen={handleOpenDialog} />
          <SelectFonts onOpen={handleOpenDialog} />
        </div>
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <div className="fixed bg-gray-400 rounded-3xl h-[77vh] max-h-[600px] shadow overflow-hidden border-4 border-black aspect-9/19">
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