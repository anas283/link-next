import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCallback, useState } from "react";
import { ChevronDown, LockKeyhole } from "lucide-react";
import { debounce } from "lodash";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";

const fonts = [
  { name: "Jakarta Sans", tier: "Free" },
  { name: "Arial", tier: "Free" },
  { name: "Roboto", tier: "Free" },
  { name: "Poppins", tier: "Premium" },
  { name: "Montserrat", tier: "Premium" },
  { name: "Lato", tier: "Premium" },
]

export default function SelectFonts({ onOpen }: any) {
  const [font, setFont] = useState("Jakarta Sans");
  const [color, setColor] = useState("#5389be");

  const chooseFont = (font: any) => {
    if (font.tier === "Free") {
      setFont(font.name);
    }
    else {
      onOpen();
    }
  }

  const handleColorChange = async (color: string) => {
    setColor(color);
  };

  const handleInputColor = (event: any) => {
    setColor(event.target.value);
  }

  const debouncedColorChange = useCallback(debounce(handleColorChange, 200), []);

  return (
    <Card className="relative overflow-hidden">

      <div className="absolute bg-gray-500 w-full h-full top-0 z-10 opacity-90 flex justify-center items-center">
        <div className="text-white text-2xl font-bold">
          Coming Soon
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">Fonts</CardTitle>
        <CardContent className="px-0">
          <div className="flex flex-col space-y-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full max-w-[400px] flex justify-between">
                  {font}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="md:w-[400px] -ml-44">
                {fonts.map((data, key) => {
                  return (
                    <DropdownMenuItem key={key}
                      onClick={() => chooseFont(data)}
                      className="flex justify-between cursor-pointer"
                    >
                      {data.name}
                      {data.tier === 'Premium' &&
                        <LockKeyhole className="w-3.5 h-3.5 ml-1 text-gray-400" />
                      }
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mt-8">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="username">Color</Label>
                <div className="flex flex-row gap-4">
                  <Popover>
                    <PopoverTrigger>
                      <div>
                        <div className="cursor-pointer w-10 h-10 rounded border" style={{ backgroundColor: color }}></div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="ml-10">
                      <HexColorPicker color={color} onChange={debouncedColorChange} />
                    </PopoverContent>
                  </Popover>
                  <Input placeholder="Color" className="w-48"
                    onChange={handleInputColor} value={color}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}