'use client'

import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "../components/overview";
import { TopPerformingLinks } from "../components/top-links";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, FolderKanban, Mail, MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { ILink } from "@/lib/store/linkSlice";
import { useAppSelector } from "@/lib/hooks";
import { UserDetails } from "@/interface/user-details";

export default function Analytics() {
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [links, setLinks] = useState<ILink[]>();

  const userDetails: UserDetails = useAppSelector(state => state.auth.userDetails);
  const linkDetails: any = useAppSelector(state => state.link.linkDetails);

  useEffect(() => {
    if (userDetails.tier !== 'FREE') {
      getUser();
      getLinks();
    }
  },[])

  const getUser = async () => {
    const { data } = await supabase
      .from('users')
      .select()
      .eq('id', linkDetails.id)

    if (data) {
      setTotalViews(data[0].views)
    }
  }

  const getLinks = async () => {
    const { data } = await supabase
      .from('links')
      .select()
      .eq('uid', linkDetails.id)

    if (data) {
      setLinks(data);
      calculateTotalClicks(data);
    }
  }

  const calculateTotalClicks = (data: ILink[]) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].clicks;
    }
    setTotalClicks(total);
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-screen-xl min-h-screen mx-auto flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          {/* <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="relative overflow-hidden">
                <UpgradeToView {...userDetails} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Views
                  </CardTitle>
                  <Eye className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalViews}</div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <UpgradeToView />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Clicks
                  </CardTitle>
                  <MousePointerClick className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalClicks}</div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <UpgradeToView />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CTR</CardTitle>
                  <FolderKanban className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{((totalClicks ?? 0/totalViews ?? 0)*100).toFixed(2)}%</div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <UpgradeToView />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscribers
                  </CardTitle>
                  <Mail className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 relative overflow-hidden">
                <div className="absolute bg-gray-500 w-full h-full top-0 z-10 opacity-90 flex justify-center items-center">
                  <div className="text-white text-2xl font-bold">
                    Coming Soon
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3 relative overflow-hidden">
                <UpgradeToView />
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-base font-bold">Top Performing Links</CardTitle>
                    <div className="text-gray-500 text-sm">Clicks</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TopPerformingLinks links={links ?? []} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UpgradeToView(userDetails: UserDetails) {
  return (
    <>
      {userDetails.tier === 'FREE' &&
        <div className="absolute bg-gray-500 w-full h-full top-0 z-10 opacity-90 flex justify-center items-center">
          <div className="text-white text-sm font-medium">
            Upgrade
          </div>
        </div>
      }
    </>
  )
}