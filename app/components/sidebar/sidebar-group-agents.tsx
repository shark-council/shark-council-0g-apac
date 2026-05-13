"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { zerogConfig } from "@/config/0g";
import { useAgents } from "@/hooks/use-agents";
import { BotIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

export function SidebarGroupAgents() {
  const { data: agents, isLoading, isError } = useAgents();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>0G Sharks</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/agents/listing">
          <Plus /> <span className="sr-only">List 0G Shark</span>
        </Link>
      </SidebarGroupAction>
      <SidebarMenu>
        {isLoading && (
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <Spinner />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </SidebarMenuItem>
        )}
        {isError && (
          <SidebarMenuItem>
            <span className="text-sm text-destructive p-2">Failed to load</span>
          </SidebarMenuItem>
        )}
        {agents?.map((agent) => (
          <SidebarMenuItem key={agent.id}>
            <SidebarMenuButton asChild>
              <Link
                href={
                  zerogConfig.chain.blockExplorers.default.url +
                  "/nft/" +
                  zerogConfig.contracts.agenticIdentity +
                  "/" +
                  agent.id
                }
                target="_blank"
              >
                <Avatar size="sm">
                  <AvatarImage
                    src={agent.identity.image}
                    alt={agent.identity.name}
                  />
                  <AvatarFallback>
                    <BotIcon />
                  </AvatarFallback>
                </Avatar>
                <p>{agent.identity.name}</p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
