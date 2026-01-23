import posthog from "posthog-js";

const isProd = process.env.NODE_ENV === "production";
const apiHost = isProd ? "/ph" : "https://us.i.posthog.com";
const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Helper to add PostHog IDs to wingit.dev links for cross-domain tracking
function addPostHogIdsToUrl(url: string): string {
  if (!url.includes('wingit.dev')) return url;
  const sessionId = posthog.get_session_id();
  const distinctId = posthog.get_distinct_id();
  if (!sessionId || !distinctId) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ph_session_id=${sessionId}&ph_distinct_id=${distinctId}`;
}

if (typeof window !== "undefined" && key) {
  // Bootstrap from cross-domain tracking params
  const params = new URLSearchParams(window.location.search);
  const bootstrap_session_id = params.get('ph_session_id');
  const bootstrap_distinct_id = params.get('ph_distinct_id');

  const bootstrap = bootstrap_session_id && bootstrap_distinct_id ? {
    sessionID: bootstrap_session_id,
    distinctID: bootstrap_distinct_id,
  } : undefined;

  posthog.init(key, {
    api_host: apiHost,
    session_recording: {
        maskAllInputs: true,
    },
    mask_all_text: false,
    cross_subdomain_cookie: true,
    ui_host: uiHost,
    defaults: "2025-11-30",
    capture_pageview: true,
    capture_exceptions: true,
    debug: false,
    person_profiles: 'always',
    ...(bootstrap && { bootstrap }),
  });

  // Expose helper for cross-domain tracking
  (window as any).__addPostHogIdsToUrl = addPostHogIdsToUrl;
}
