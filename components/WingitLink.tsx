"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

type WingitPosthogClient = {
  get_distinct_id?: () => string | undefined;
  get_session_id?: () => string | undefined;
};

declare global {
  interface Window {
    __addPostHogIdsToUrl?: (url: string) => string;
  }
}

function getWingItUrl(baseUrl: string, ph?: WingitPosthogClient): string {
  if (typeof window === "undefined") return baseUrl;

  const globalHelper = window.__addPostHogIdsToUrl;
  if (typeof globalHelper === "function") return globalHelper(baseUrl);

  const distinctId = ph?.get_distinct_id?.();
  const sessionId = ph?.get_session_id?.();

  if (!distinctId && !sessionId) return baseUrl;

  try {
    const url = new URL(baseUrl);
    if (distinctId) url.searchParams.set("ph_distinct_id", distinctId);
    if (sessionId) url.searchParams.set("ph_session_id", sessionId);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function useWingitUrl(baseUrl: string) {
  const [url, setUrl] = useState(baseUrl);

  useEffect(() => {
    const update = () => setUrl(getWingItUrl(baseUrl, posthog));

    update();
    const timeout = window.setTimeout(update, 200);

    return () => window.clearTimeout(timeout);
  }, [baseUrl]);

  return url;
}

export function WingitLink({
  href,
  children,
  capture,
  onClick,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  capture?: { event: string; properties?: Record<string, unknown> };
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const url = useWingitUrl(href);

  return (
    <a
      href={url}
      onClick={(event) => {
        if (capture) posthog?.capture?.(capture.event, capture.properties);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
