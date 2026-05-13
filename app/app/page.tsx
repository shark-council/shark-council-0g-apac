"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// TODO: Add a form
export default function IndexPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-4">
      <div className="max-w-2xl">
        {/* Hero */}
        <Image
          src="/images/hero.gif"
          alt="Hero"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        {/* Title */}
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-center mt-8">
          Let <span className="text-primary">0G Sharks</span>, built by elite{" "}
          <span className="text-accent">0G Developers</span>, debate and execute
          your trade ideas
        </h2>
        {/* Form */}
        <Skeleton className="h-12 mt-8" />
      </div>
    </main>
  );
}
