import { SidebarFooter as OriginSidebarFooter } from "@/components/ui/sidebar";
import { appConfig } from "@/config/app";
import Link from "next/link";
import { Button } from "../ui/button";

export function SidebarFooter() {
  return (
    <OriginSidebarFooter>
      <p className="text-sm text-muted-foreground">
        Built by
        <Button variant="link" className="px-1 py-0" asChild>
          <Link href={appConfig.developer.url} target="_blank">
            {appConfig.developer.name}
          </Link>
        </Button>
        © 2026
      </p>
    </OriginSidebarFooter>
  );
}
