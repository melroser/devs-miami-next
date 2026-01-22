'use client';

import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;

    if (posthog.__loaded) return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // we manually capture on route change
      capture_pageleave: true,
    });
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // Avoid useSearchParams() so build doesn't require Suspense (fixes /_not-found prerender crash)
    const url = typeof window !== 'undefined' ? window.location.href : pathname;

    posthog.capture('$pageview', {
      $current_url: url,
    });
  }, [pathname]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

