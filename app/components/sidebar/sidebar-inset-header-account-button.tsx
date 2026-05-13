"use client";

import { zerogConfig } from "@/config/0g";
import { baseConfig } from "@/config/base";
import { formatAddress } from "@/lib/utils";
import { GlobeIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

// TODO: Display actual wallet balance
export function SidebarInsetHeaderAccountButton() {
  const accountAddress = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS;

  if (!accountAddress) {
    return <Spinner className="mx-1" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-auto gap-2 py-1.5 pl-3 pr-5">
          <Avatar>
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p>Account</p>
            <p className="text-xs text-muted-foreground">
              {formatAddress(accountAddress)}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Blockchain Explorers</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={
                zerogConfig.chain.chain.blockExplorers.default.url +
                "/address/" +
                accountAddress
              }
              target="_blank"
            >
              <GlobeIcon /> 0G
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={
                baseConfig.chain.blockExplorers.default.url +
                "/address/" +
                accountAddress
              }
              target="_blank"
            >
              <GlobeIcon /> Base
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={true}>
            <LogOutIcon /> Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
