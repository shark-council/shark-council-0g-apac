import { SidebarTrigger } from "../ui/sidebar";
import { SidebarInsetHeaderWalletButton } from "./sidebar-inset-header-wallet-button";

export function SidebarInsetHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <SidebarTrigger />
      <SidebarInsetHeaderWalletButton />
    </header>
  );
}
