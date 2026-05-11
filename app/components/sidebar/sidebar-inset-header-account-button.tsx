"use client";

import { accountConfig } from "@/config/account";
import { formatAddress } from "@/lib/utils";
import { GlobeIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// TODO: Display actual wallet balance
export function SidebarInsetHeaderAccountButton() {
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
              {formatAddress(accountConfig.walletAddress)}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem asChild>
          <Link href={accountConfig.baseBlockchainExplorer} target="_blank">
            <GlobeIcon /> Base Blockchain Explorer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={accountConfig["0gTestnetBlockchainExplorer"]}
            target="_blank"
          >
            <GlobeIcon /> 0G Testnet Blockchain Explorer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={true}>
          <LogOutIcon /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
