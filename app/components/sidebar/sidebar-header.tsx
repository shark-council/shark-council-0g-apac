import { SidebarHeader as OriginSidebarHeader } from "@/components/ui/sidebar";
import { appConfig } from "@/config/app";
import Image from "next/image";
import Link from "next/link";

export function SidebarHeader() {
  return (
    <OriginSidebarHeader>
      <Link href="/" className="flex items-center gap-3">
        <div className="flex flex-col items-center size-9">
          <Image
            src="/images/logo.png"
            alt="Logo"
            priority={false}
            width="100"
            height="100"
            sizes="100vw"
            className="w-full rounded-full"
          />
        </div>
        <div>
          <p className="text-foreground font-bold">{appConfig.name}</p>
          <p className="text-sm text-muted-foreground">{appConfig.edition}</p>
        </div>
      </Link>
    </OriginSidebarHeader>
  );
}
