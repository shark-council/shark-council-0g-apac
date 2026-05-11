import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";

export function SidebarGroupDebates() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>0G Debates</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/">
          <Plus /> <span className="sr-only">New 0G Debate</span>
        </Link>
      </SidebarGroupAction>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 p-2">
            <Spinner />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
