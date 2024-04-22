import { ILink } from "@/lib/store/linkSlice";
import { Text } from "lucide-react";

export function TopPerformingLinks({links}: {links: ILink[]}) {
  return (
    <div className="space-y-6">
      {links.map((link, key) => {
        return (
          <div key={key} className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {link.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {link.url}
              </p>
            </div>
            <div className="ml-auto font-medium">{link.clicks}</div>
          </div>
        )
      })}

      {links.length === 0 &&
        <div className="w-full h-64 my-auto flex justify-center items-center">
          <div>
            <Text className="w-8 h-8 text-gray-400 mx-auto" />
            <h6 className="text-sm text-gray-400 mt-2">No records</h6>
          </div>
        </div>
      }
    </div>
  );
}