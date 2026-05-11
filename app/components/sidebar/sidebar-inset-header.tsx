import { SidebarTrigger } from "../ui/sidebar";
import { SidebarInsetHeaderAccountButton } from "./sidebar-inset-header-account-button";

export function SidebarInsetHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <SidebarTrigger />
      <SidebarInsetHeaderAccountButton />
    </header>
  );
}
