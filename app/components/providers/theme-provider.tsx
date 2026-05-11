"use client";

import { ThemeProvider as OriginProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof OriginProvider>) {
  return <OriginProvider {...props}>{children}</OriginProvider>;
}
