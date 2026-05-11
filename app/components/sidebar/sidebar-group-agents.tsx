"use client";

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

export function SidebarGroupAgents() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>0G Sharks</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/agents/listing">
          <Plus /> <span className="sr-only">List 0G Shark</span>
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
