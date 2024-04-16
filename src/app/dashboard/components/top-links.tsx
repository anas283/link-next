import { ILink } from "@/lib/store/linkSlice";

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
    </div>
  );
}