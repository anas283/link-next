import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-50 h-full flex justify-between">
      <div className="w-full md:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="w-28 h-28 border-2 border-dashed bg-gray-50 rounded-full flex justify-center items-center cursor-pointer">
                  <div>
                    <Upload className="w-6 h-h-6 text-gray-400 flex mx-auto" />
                    <h6 className="text-xs text-gray-500 font-medium mt-2">Add Avatar</h6>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Publish</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <div className="bg-gray-400 rounded-3xl w-[220px] h-[450px]"></div>
      </div>
    </div>
  )
}