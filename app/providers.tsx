"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { initPostHog } from "../instrumentation-client";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}
