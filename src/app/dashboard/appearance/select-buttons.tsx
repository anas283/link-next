import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function SelectButtons({ onOpen }: any) {
  const [bgColor, setBgColor] = useState("#888888");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [shadowColor, setShadowColor] = useState("#ffffff");

  const [color, setColor] = useState("#5389be");

  const selectButton = (type: string) => {
    console.log(type);
  }

  const handleColorChange = async (color: string, type: string) => {
    if (type == 'bg-color') {
      setBgColor(color);
    }
    else if (type == 'font-color') {
      setFontColor(color);
    }
    else if (type == 'shadow-color') {
      setShadowColor(color);
    }
  };

  const handleInputColor = (event: any, type: string) => {
    if (type == 'bg-color') {
      setBgColor(event.target.value);
    }
    else if (type == 'font-color') {
      setFontColor(event.target.value);
    }
    else if (type == 'shadow-color') {
      setShadowColor(event.target.value);
    }
  }

  const debouncedColorChange = useCallback(debounce(handleColorChange, 500), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Buttons</CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Fill</Label>
          <div className="flex justify-between gap-8">
            <div className="w-full cursor-pointer" onClick={() => selectButton('rounded-none')}>
              <div className="w-full h-10 bg-black"></div>
            </div>
            <div className="w-full cursor-pointer" onClick={() => selectButton('rounded')}>
              <div className="w-full h-10 bg-black rounded"></div>
            </div>
            <div className="w-full cursor-pointer" onClick={() => selectButton('rounded-full')}>
              <div className="w-full h-10 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Outline</Label>
          <div className="flex justify-between gap-8">
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black rounded"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Soft shadow</Label>
          <div className="flex justify-between gap-8">
            <div className="w-full">
              <div className="w-full h-10 bg-white drop-shadow-md"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white drop-shadow-md rounded"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white drop-shadow-md rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Hard shadow</Label>
          <div className="flex justify-between gap-8">
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0)]"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0)]"></div>
            </div>
            <div className="w-full">
              <div className="w-full h-10 bg-white border border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0)]"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Button color</Label>
          <div className="flex flex-row gap-4">
            <Popover>
              <PopoverTrigger>
                <div>
                  <div className="cursor-pointer w-10 h-10 rounded border" style={{ backgroundColor: bgColor }}></div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="ml-10">
                <HexColorPicker color={bgColor} onChange={(e) => debouncedColorChange(e, 'bg-color')} />
              </PopoverContent>
            </Popover>
            <Input placeholder="Color" className="w-48"
              onChange={(e) => handleInputColor(e, 'bg-color')} value={bgColor}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Button font color</Label>
          <div className="flex flex-row gap-4">
            <Popover>
              <PopoverTrigger>
                <div>
                  <div className="cursor-pointer w-10 h-10 rounded border" style={{ backgroundColor: fontColor }}></div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="ml-10">
                <HexColorPicker color={bgColor} onChange={(e) => debouncedColorChange(e, 'font-color')} />
              </PopoverContent>
            </Popover>
            <Input placeholder="Color" className="w-48"
              onChange={(e) => handleInputColor(e, 'font-color')} value={fontColor}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5 gap-2">
          <Label htmlFor="username">Shadow color</Label>
          <div className="flex flex-row gap-4">
            <Popover>
              <PopoverTrigger>
                <div>
                  <div className="cursor-pointer w-10 h-10 rounded border" style={{ backgroundColor: shadowColor }}></div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="ml-10">
                <HexColorPicker color={shadowColor} onChange={(e) => debouncedColorChange(e, 'shadow-color')} />
              </PopoverContent>
            </Popover>
            <Input placeholder="Color" className="w-48"
              onChange={(e) => handleInputColor(e, 'shadow-color')} value={shadowColor}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}