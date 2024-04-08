import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IBackground, backgrounds } from "./background-list";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import { setBackground } from "@/lib/store/linkSlice";
import { debounce } from "lodash";

export default function SelectBackgrounds({ onOpen }: any) {
  const [color, setColor] = useState("#5389be");

  const linkDetails: any = useAppSelector(state => state.link.linkDetails);
  const selectedBackground = useAppSelector(state => state.link.selectedBackground);
  const dispatch = useAppDispatch();

  const selectBackground = async (background: IBackground) => {
    dispatch(setBackground(background));
  }

  const handleColorChange = async (color: string) => {
    if (selectedBackground.name === 'Flat Color') {
      setColor(color);
    }
  };

  const handleInputColor = (event: any) => {
    setColor(event.target.value);
  }

  const debouncedColorChange = useCallback(debounce(handleColorChange, 500), []);

  return (
    <>
      <Card className="bg-blue-100">
        <CardHeader>
          <CardTitle className="text-lg">Custom appearance</CardTitle>
          <CardDescription>
            Completely customize your Linktree profile. 
            Change your background with colors, gradients and images. 
            Choose a button style, change the typeface and more.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Background</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="inline-grid w-full grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-4">
            {backgrounds.map((background, key) => {
              return (
                <div key={key} className="group flex w-full flex-col items-center focus:outline-none self-stretch"
                  onClick={() => selectBackground(background)}
                >
                  <div className={`border rounded overflow-hidden cursor-pointer relative ${selectedBackground?.name === background.name ? 'border-black border-dashed border-2':''}`}>
                    <Image src={background.previewImage} alt={background.name} width={120} height={200} className="object-cover w-auto h-auto" />
                    {background.type === 'Premium' && 
                      <div>
                        <span className="absolute top-2 right-2 text-xs text-white bg-black rounded py-1 px-2 flex flex-row items-center">
                          Upgrade
                          <LockKeyhole className="w-3.5 h-3.5 ml-1 text-white" />
                        </span>
                      </div>
                    }
                  </div>
                  <h6 className="text-sm text-center mt-1">
                    {background.name}
                  </h6>
                </div>
              )
            })}
          </div>
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
        </CardContent>
      </Card>
    </>
  )
}