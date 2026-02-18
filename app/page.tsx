'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import posthog from 'posthog-js';
import { usePostHog } from 'posthog-js/react';
import { CloudPixelSky } from '@/components/CloudPixelSky';
import { OutrunMockup1Background } from '@/components/OutrunMockup1Background';

type WingitPosthogClient = {
  get_distinct_id?: () => string | undefined;
  get_session_id?: () => string | undefined;
};

type ThemeMode = 'dark' | 'light';
const THEME_OVERRIDE_KEY = 'devs-miami-theme-override';
const THEME_LEGACY_KEY = 'devs-miami-theme';

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

declare global {
  interface Window {
    __addPostHogIdsToUrl?: (url: string) => string;
  }
}

function getWingItUrl(baseUrl: string, ph?: WingitPosthogClient): string {
  if (typeof window === 'undefined') return baseUrl;

  const globalHelper = window.__addPostHogIdsToUrl;
  if (typeof globalHelper === 'function') return globalHelper(baseUrl);

  const distinctId = ph?.get_distinct_id?.();
  const sessionId = ph?.get_session_id?.();

  if (!distinctId && !sessionId) return baseUrl;

  try {
    const url = new URL(baseUrl);
    if (distinctId) url.searchParams.set('ph_distinct_id', distinctId);
    if (sessionId) url.searchParams.set('ph_session_id', sessionId);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

type Project = {
  title: string;
  subtitle: string;
  href: string;
  stage: string;
  tags: string[];
  flagship?: boolean;
};

const projects: Project[] = [
  {
    title: 'Wingit',
    subtitle:
      'Real-time conversation-to-content platform that turns live speech into structured, shareable presentations.',
    href: 'https://wingit.dev',
    stage: 'Flagship Product',
    tags: ['AI', 'Realtime', 'Presentations'],
    flagship: true,
  },
  {
    title: 'SDN OpenAPI',
    subtitle:
      'Open API tooling around OFAC SDN datasets for compliance-centric products.',
    href: 'https://sdn-openapi.netlify.app/',
    stage: 'Developer API',
    tags: ['Compliance', 'API', 'Infrastructure'],
  },
  {
    title: 'Horcrux',
    subtitle:
      'Context layer for saving, restoring, and sharing AI workflow context across tools.',
    href: 'https://horcrux.inc',
    stage: 'R&D Product',
    tags: ['Agents', 'Context', 'Developer Tools'],
  },
  {
    title: 'Loudness Lab',
    subtitle: 'Practical audio analysis and workflow tools for acoustic measurement and loudness leveling.',
    href: 'https://loudness-app.netlify.app',
    stage: 'Utility Suite',
    tags: ['Audio', 'Python', 'Signal Processing'],
  },
  {
    title: 'Drone Talents',
    subtitle: 'Marketplace platform connecting businesses with licensed drone operators.',
    href: 'https://dronetalents.com/',
    stage: 'Marketplace',
    tags: ['Marketplace', 'Operations', 'Gig Economy'],
  },
  {
    title: 'Lern2CWD',
    subtitle:
      'Practice app for learning data structures and solving coding interview problems, with spaced repetition and interactive challenges.',
    href: '#',
    stage: 'Education App',
    tags: ['EdTech', 'Practice'],
  },
  {
    title: 'Vitamax Health',
    subtitle:
      'Health-focused prototype for habit support and vitamin adherence.',
    href: '#',
    stage: 'Prototype',
    tags: ['HealthTech', 'Behavior Design'],
  },
  {
    title: 'Arcology',
    subtitle:
      'Python-powered audio transcription and segmentation pipeline for AI consensus and analysis workflows.',
    href: '#',
    stage: 'R&D',
    tags: ['Audio', 'AI', 'Python'],
  },
];

const founders = [
  {
    name: 'Robert Melrose',
    role: 'Chief Technology & Systems Architecture (CTSA), Co-Founder',
    note: 'Senior full-stack software engineer and primary technical lead. Owns overall system architecture, technical strategy, and core IP direction.',
    href: 'https://www.linkedin.com/in/themelroser/',
  },
  {
    name: 'Gabriel Robayo',
    role: 'Director of Finance & Strategy (DFS), Co-Founder',
    note: 'Operations and finance counterpart: financial modeling, budget/runway planning, pricing, revenue strategy, and partnerships.',
    href: 'https://www.linkedin.com/in/gabriel-robayo-9629877/',
  },
  {
    name: 'Sebastien Dolce',
    role: 'Director of Front-End Engineering (DFE), Co-Founder',
    note: 'Software engineer focused on front-end implementation. Owns user-facing buildout, CMS/theming, templating, and the marketing/content layer.',
    href: 'https://www.linkedin.com/in/sebastien-dolce/',
  },
  {
    name: 'Tatiana Riquelme',
    role: 'Medical + Media Consultant',
    note: 'FNP at Mount Sinai Medical Center. Provides clinical-domain oversight and helps shape clear, compliant, and credible patient/public messaging.',
    href: 'https://www.linkedin.com/in/tatiana-riquelmefnp/',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.18,
    },
  },
};

function useWingitLinks() {
  const posthogClient = usePostHog();
  const [wingitUrl, setWingitUrl] = useState('https://wingit.dev');
  const [appWingitUrl, setAppWingitUrl] = useState('https://app.wingit.dev');
  const [loginUrl, setLoginUrl] = useState('https://app.wingit.dev/auth?mode=login');
  const [registerUrl, setRegisterUrl] = useState('https://app.wingit.dev/auth?mode=register');

  useEffect(() => {
    if (!posthogClient) return;

    const update = () => {
      setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
      setAppWingitUrl(getWingItUrl('https://app.wingit.dev', posthogClient));
      setLoginUrl(getWingItUrl('https://app.wingit.dev/auth?mode=login', posthogClient));
      setRegisterUrl(getWingItUrl('https://app.wingit.dev/auth?mode=register', posthogClient));
    };

    update();
    const t = setTimeout(update, 200);

    return () => clearTimeout(t);
  }, [posthogClient]);

  return { wingitUrl, appWingitUrl, loginUrl, registerUrl };
}

export default function Page() {
  const { wingitUrl, loginUrl, registerUrl } = useWingitLinks();
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [hydrated, setHydrated] = useState(false);

  const nonFlagship = useMemo(() => projects.filter((p) => !p.flagship), []);
  const tickerItems = useMemo(
    () => [
      'Wingit • Real-time presentation engine',
      'SDN OpenAPI • Compliance data API tooling',
      'Horcrux • Context portability for AI workflows',
      'Loudness Lab • Acoustic analysis + utilities',
      'Drone Talents • Drone operator marketplace',
      'Lern2CWD • Coding practice app',
      'Vitamax Health • Habit support and vitamin adherence',
    ],
    []
  );

  const brandLogoSrc = theme === 'dark' ? '/img/logo/palmlogo.png' : '/img/logo/palmlogowhite.png';

  useEffect(() => {
    setHydrated(true);

    const readOverride = (): ThemeMode | null => {
      const override = window.localStorage.getItem(THEME_OVERRIDE_KEY);
      if (isThemeMode(override)) return override;

      const legacy = window.localStorage.getItem(THEME_LEGACY_KEY);
      if (isThemeMode(legacy)) {
        window.localStorage.setItem(THEME_OVERRIDE_KEY, legacy);
        return legacy;
      }

      return null;
    };

    const systemTheme = () => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const applyTheme = () => {
      const nextTheme = readOverride() ?? systemTheme();
      document.documentElement.setAttribute('data-theme', nextTheme);
      setTheme(nextTheme);
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (readOverride()) return;
      const nextTheme: ThemeMode = event.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      setTheme(nextTheme);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onSystemChange);
      return () => mediaQuery.removeEventListener('change', onSystemChange);
    }

    mediaQuery.addListener(onSystemChange);
    return () => mediaQuery.removeListener(onSystemChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const jumpTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    jumpTop();
    requestAnimationFrame(jumpTop);
    const timer = window.setTimeout(jumpTop, 120);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="dm-shell min-h-screen text-[var(--dm-text)]">
      {hydrated ? (theme === 'dark' ? <OutrunMockup1Background /> : <CloudPixelSky />) : null}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--dm-border-soft)] bg-[color:var(--dm-header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <a
            href="#top"
            className="dm-interactive rounded-xl px-2 py-1 text-base font-semibold tracking-[0.02em] text-[var(--dm-text-strong)] transition duration-500 hover:text-[var(--dm-accent)]"
          >
            <span className="flex items-center gap-2.5">
              <img src={brandLogoSrc} alt="Devs Miami logo" className="dm-brand-logo h-9 w-9 object-contain" loading="eager" />
              <span>Devs Miami LLC</span>
            </span>
          </a>

          <nav className="order-3 flex w-full items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-medium tracking-[0.01em] text-[var(--dm-text-muted)] md:order-none md:w-auto md:justify-center md:gap-4">
            <NavLink href="#top" label="Home" />
            <NavLink href="#wingit" label="Flagship" />
            <NavLink href="#roadmap" label="Roadmap" />
            <NavLink href="#products" label="Products" />
            <NavLink href="#about" label="Team" />
            <NavLink href="#contact" label="Contact" />
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme);
                window.localStorage.setItem(THEME_OVERRIDE_KEY, nextTheme);
                window.localStorage.removeItem(THEME_LEGACY_KEY);
                posthog?.capture?.('theme_toggle_click', { theme: nextTheme });
              }}
              className="dm-interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-glass-bg)] text-[var(--dm-text-strong)] transition duration-500 hover:bg-[color:var(--dm-glass-bg-strong)]"
              aria-label="Toggle theme"
            >
              <span className="sr-only">{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 1 0 11 11z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <a
              href={wingitUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'header_wingit' })}
              className="dm-interactive inline-flex rounded-full border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-accent-bg)] px-4 py-2 text-xs font-semibold tracking-[0.04em] text-[var(--dm-accent-text)] transition duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--dm-accent-bg-strong)]"
            >
              Try Wingit
            </a>
          </div>
        </div>
        <div className="border-t border-[color:var(--dm-border-soft)]">
          <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-8">
            <div className="dm-ticker">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-7xl px-5 pb-72 pt-44 sm:px-8 sm:pt-44">
        <motion.section
          id="flagship"
          variants={stagger}
          initial="hidden"
          animate="show"
          className="dm-hero-card relative overflow-hidden rounded-[2rem] border border-[color:var(--dm-border-soft)] p-9 sm:p-14"
        >
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[var(--dm-accent)]">
            Devs Miami // Local Tech Talent
          </motion.p>

          <motion.h1
            variants={reveal}
            className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] text-[var(--dm-text-strong)] sm:text-7xl"
          >
            <span className="dm-brand-pop bg-clip-text text-transparent">
              Devs Miami
            </span>{' '}
            <br/>
            building
            what 
            comes{' '}
            <span className="text-[var(--dm-soft)]">Next</span>
            <br/>
          </motion.h1>
          <motion.p variants={reveal} className="mt-3 max-w-3xl text-xl font-medium text-white sm:text-2xl">
            We build Powerful Web Tools with useful AI features
          </motion.p>

          <motion.p variants={reveal} className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--dm-text)] sm:text-base">
            Devs.Miami is a Miami-based network of builders, software engineers, founders, and operators focused on
            shipping high-quality products with clear communication and consistent delivery.
          </motion.p>
          <motion.p variants={reveal} className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--dm-text)] sm:text-base">
            If you are building an MVP, scaling a team, or trying to move faster without sacrificing quality or utillity, we can
            help you plan, build, and launch.
          </motion.p>

          <motion.div variants={reveal} className="mt-10 grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap">
            <a
              href={loginUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_app_wingit' })}
              className="dm-interactive inline-flex items-center justify-center rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-glass-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--dm-text-strong)] transition duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--dm-glass-bg-strong)]"
            >
              Login
            </a>
            <a
              href={registerUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_register' })}
              className="dm-interactive inline-flex items-center justify-center rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-glass-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--dm-text-strong)] transition duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--dm-glass-bg-strong)]"
            >
              Register
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            className="dm-surface-card mt-12 grid gap-4 rounded-2xl border border-[color:var(--dm-border-soft)] p-4 text-sm text-[var(--dm-text)] sm:grid-cols-3"
          >
            <Metric label="Core Story" value="Building world-changing software in downtown Miami" />
            <Metric label="Team Model" value="The four most valuable people in Miami" />
            <Metric label="Build Thesis" value="Instrumentation first. Ship yesterday. Build a product someone will pay for." />
          </motion.div>
        </motion.section>

        <motion.section
          id="wingit"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="dm-section-shell mt-72 scroll-mt-32 rounded-[2rem] border border-[color:var(--dm-border-soft)] p-7 lg:mt-96 sm:p-10"
        >
          <motion.div variants={reveal} className="mb-12">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--dm-accent)]">AI Slide Generation</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">
              WingIt
              <span className="block">Talk -&gt; Visualize -&gt; Share</span>
              <span className="block">Real Time</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-[var(--dm-text-muted)] sm:text-base">
              Wingit is our flagship conversation-to-content product. It turns live speech into structured, shareable presentations
              with AI-generated visuals and narrative flow, so you can focus on delivery instead of manual deck building.
            </p>
            <div className="mt-6">
              <a
                href="/docs/devs-miami-pitch-deck.pdf"
                onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_view_directions' })}
                target="_blank"
                rel="noreferrer"
                className="dm-interactive inline-flex items-center justify-center rounded-full border border-[color:var(--dm-border-soft)] bg-[color:var(--dm-chip-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--dm-text-strong)] transition duration-500 hover:-translate-y-0.5 hover:bg-[color:var(--dm-glass-bg-strong)]"
              >
                Pitch Deck
              </a>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="mb-12 grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'AI Integration',
                desc: 'Generate structured slides from live speech in real time, with AI shaping flow, visuals, and pacing as you present.',
              },
              {
                title: 'Teleprompter',
                desc: 'If you get stuck, prompt mode helps guide your next points so you can keep momentum without breaking your delivery.',
              },
              {
                title: 'Speaker Notes',
                desc: 'Paste your plan and Wingit can align the presentation around your notes so the narrative and visuals stay in sync.',
              },
              {
                title: 'Theme Engine',
                desc: 'Use polished visual themes and switch styles quickly so every presentation looks intentional and on-brand.',
              },
            ].map((item) => (
              <motion.article variants={reveal} key={item.title} className="dm-surface-card rounded-2xl border border-[color:var(--dm-border-soft)] p-6">
                <p className="text-sm font-semibold text-[var(--dm-text-strong)]">{item.title}</p>
                <p className="mt-2 text-sm text-[var(--dm-text-muted)]">{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
          <motion.div variants={stagger} className="dm-surface-card relative rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
            <div aria-hidden className="absolute bottom-8 left-[1.05rem] top-8 w-px bg-[color:var(--dm-border-strong)] sm:left-[1.15rem]" />
            <div className="space-y-6">
              {[
                {
                  title: 'Present',
                  subs: [
                    'Give it a title',
                    'Add suggestions for what you want it to look like',
                    'Add any notes or plans you have',
                    'Or nothing at all',
                  ],
                },
                {
                  title: 'As you speak',
                  subs: [
                    'Wingit transcribes',
                    'What you say becomes what they see',
                    'Make points, bullets are added',
                    'Shift topics, new slides',
                  ],
                },
                {
                  title: 'Share',
                  subs: [
                    'Send a link',
                    'Send a QR code',
                    'Everyone sees your presentation and what you are saying',
                  ],
                },
              ].map((step, index) => (
                <motion.article variants={reveal} key={step.title} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-accent-bg)] text-xs font-semibold text-[var(--dm-accent-text)]">
                    {index + 1}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--dm-text-muted)]">Step {index + 1}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--dm-text-strong)]">{step.title}</p>
                  {step.subs.length > 0 && (
                    <ul className="mt-2 space-y-1.5 pl-8 text-sm text-[var(--dm-text-muted)]">
                      {step.subs.map((sub) => (
                        <li key={sub}>• {sub}</li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>
          </motion.div>
          <motion.div variants={stagger} className="mt-10 grid gap-4 lg:grid-cols-2">
            <motion.article variants={reveal} className="dm-surface-card rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Target Market + Advantage</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
                <li>Target segments: sales reps, product managers, trainers, educators, consultants, community organizers</li>
                <li>Workflow advantage: removes manual deck building and revision bottlenecks</li>
                <li>Speed-to-clarity: converts raw speech into structured, audience-ready visuals instantly</li>
                <li>Category position: closer to live presentation copilots than standard deck software</li>
              </ul>
            </motion.article>
            <motion.article variants={reveal} className="dm-surface-card rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Voice tiers (monetization-ready)</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
                <li>Free: Browser voice (instant, device-quality)</li>
                <li>Premium: fast, high-quality synthesis</li>
                <li>Ultra/Premium: studio-grade voices</li>
              </ul>
            </motion.article>
          </motion.div>
          <motion.p variants={reveal} className="mt-5 max-w-3xl text-sm text-[var(--dm-text-muted)] sm:text-base">
            Stop making presentations. Just give them.
          </motion.p>
        </motion.section>

        <motion.section
          id="roadmap"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="dm-section-shell mt-72 scroll-mt-32 rounded-[2rem] border border-[color:var(--dm-border-soft)] p-7 lg:mt-96 sm:p-10"
        >
          <motion.div variants={reveal} className="mb-12">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--dm-accent)]">Roadmap Ahead</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">Wingit is what comes next in presentation software.</h2>
          </motion.div>
          <motion.article variants={reveal} className="dm-surface-card mt-10 rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Business / Revenue Model</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
              <li>Pre-revenue (in development)</li>
              <li>SaaS subscriptions: Solo / Pro / Team</li>
              <li>Usage-based add-ons: generation minutes, exports, voice/transcription, premium templates</li>
              <li>Enterprise licensing: SSO, security, admin controls, custom branding, integrations</li>
            </ul>
            <p className="mt-4 text-sm text-[var(--dm-text-muted)]">
              Early metrics are modeled estimates, not finalized performance numbers. We refine assumptions as real
              usage and retention data comes in.
            </p>
          </motion.article>
          <motion.article variants={reveal} className="dm-surface-card mt-10 rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Unit Economics (Modeled)</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
              <li>MRR: $0 (pre-revenue)</li>
              <li>LTV proxy: ~$128 = $25 × 0.85 gross margin × 6-month lifespan</li>
              <li>CAC target: ~$40 based on a 3:1 LTV:CAC benchmark</li>
              <li>Annual churn assumption: ~60% from an 8% monthly churn model</li>
              <li>Initial TAM estimate: ~$300M (1,000,000 users × $300 ACV)</li>
            </ul>
            <p className="mt-4 text-sm text-[var(--dm-text-muted)]">
              Core formulas tracked: CAC = acquisition spend / new paying customers, LTV ≈ ARPU × gross margin × lifespan,
              and churn = customers lost / starting customers.
            </p>
          </motion.article>
          <motion.article variants={reveal} className="dm-surface-card mt-10 rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Go-To-Market Sequence</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
              <li>Bottom-up adoption: creators and presenters first (free to paid)</li>
              <li>Content-led distribution: short demos showing talk-to-deck speed</li>
              <li>Partnerships: coworking spaces, meetup organizers, pitch nights, accelerators, speaker coaches</li>
              <li>B2B wedge: sales enablement and internal training teams after stability milestones</li>
            </ul>
          </motion.article>
          <motion.article variants={reveal} className="dm-surface-card mt-10 rounded-3xl border border-[color:var(--dm-border-soft)] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">Financial Modeling Snapshot</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text)] sm:text-base">
              <li>Current status: pre-revenue, validating retention and pricing</li>
              <li>LTV model: ~$128 from $25 price × 85% margin × 6-month lifespan</li>
              <li>CAC target: ~$40 to stay near a 3:1 LTV:CAC benchmark</li>
              <li>Initial TAM model: ~$300M for prosumer presentation workflows</li>
            </ul>
          </motion.article>
        </motion.section>

        <motion.section
          id="products"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="dm-section-shell mt-72 scroll-mt-32 rounded-[2rem] border border-[color:var(--dm-border-soft)] p-7 lg:mt-96 sm:p-10"
        >
          <motion.div variants={reveal} className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--dm-accent)]">Products</p>
              <h2 className="mt-2 text-3xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">Devs Miami has a variety of products.</h2>
            </div>
            <a href={wingitUrl} onClick={() => posthog?.capture?.('cta_click', { cta: 'products_wingit' })} className="dm-interactive inline-flex rounded-full border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-accent-bg)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dm-accent-text)] transition duration-500 hover:bg-[color:var(--dm-accent-bg-strong)]">Wingit Live</a>
          </motion.div>

          <motion.article variants={reveal} className="rounded-3xl border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-feature-bg)] p-7">
            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--dm-accent)]">Featured Product</p>
                <h3 className="mt-2 text-4xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">Wingit</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--dm-text)] sm:text-base">
                  Real-time presentation generation from spoken narrative. Capture transcript plus audio, generate slides,
                  and export a clean artifact your team can share immediately.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Real-time generation', 'Voice + transcript', 'Presentation quality', 'Ship-ready velocity'].map((pill) => (
                    <span key={pill} className="rounded-full border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-accent-bg)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--dm-accent-text)]">{pill}</span>
                  ))}
                </div>
              </div>
              <div className="dm-orbital-card rounded-2xl border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-glass-deep)] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-text-muted)]">Key Features</p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--dm-text-strong)]">
                  <li>Built for live demos and async storytelling</li>
                  <li>Instrumentation-ready for growth loops</li>
                  <li>Proof of low-latency execution quality</li>
                </ul>
              </div>
            </div>
          </motion.article>
          <motion.div variants={reveal} className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">All Products</p>
          </motion.div>
          <motion.div variants={stagger} className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nonFlagship.map((project) => (
              <motion.a key={project.title} variants={reveal} whileHover={{ y: -6, scale: 1.01 }} href={project.href} onClick={() => posthog?.capture?.('project_click', { title: project.title, href: project.href })} className="dm-card rounded-2xl border border-[color:var(--dm-border-soft)] bg-[linear-gradient(155deg,var(--dm-card-accent),var(--dm-card-bottom)_45%)] p-5 transition duration-500">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--dm-text-muted)]">{project.stage}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--dm-text-strong)]">{project.title}</h3>
                  </div>
                  <span className="text-[var(--dm-text-muted)]">↗</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--dm-text)]">{project.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-chip-bg)] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--dm-text)]">{tag}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="about"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="dm-section-shell mt-72 scroll-mt-32 rounded-[2rem] border border-[color:var(--dm-border-soft)] p-7 lg:mt-96 sm:p-10"
        >
          <motion.div variants={reveal} className="mb-12">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--dm-accent)]">About</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">Team</h2>
            <p className="mt-3 max-w-3xl text-sm text-[var(--dm-text-muted)] sm:text-base">
              Conceived in 2022, Devs.Miami was born from a passion for technology and a goal to connect businesses
              with top software engineering talent in and around Miami.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-[var(--dm-text-muted)] sm:text-base">
              Our mission is to help businesses harness technology to achieve their goals by building high-quality
              software with dependable execution.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2">
            {founders.map((member) => (
              <motion.a key={member.name} variants={reveal} href={member.href} target="_blank" rel="noreferrer" onClick={() => posthog?.capture?.('team_link_click', { name: member.name, href: member.href })} className="dm-card dm-team-card rounded-2xl border border-[color:var(--dm-border-soft)] p-6 transition duration-500 hover:border-[color:var(--dm-accent-border)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--dm-accent)]">{member.role}</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--dm-text-strong)]">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--dm-text)]">{member.note}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section id="contact" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="dm-contact-card mt-72 scroll-mt-28 rounded-3xl border border-[color:var(--dm-border-strong)] p-8 sm:mt-80 sm:p-10">
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--dm-accent)]">Contact</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-[var(--dm-text-strong)] sm:text-5xl">
            Reach the team
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:rob@devs.miami" onClick={() => posthog?.capture?.('cta_click', { cta: 'email_rob' })} className="dm-interactive rounded-full border border-[color:var(--dm-accent-border)] bg-[color:var(--dm-accent-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--dm-accent-text)]">rob@devs.miami</a>
            <a href="mailto:info@devs.miami" onClick={() => posthog?.capture?.('cta_click', { cta: 'email_info' })} className="dm-interactive rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-glass-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--dm-text-strong)]">info@devs.miami</a>
            <a href="https://www.linkedin.com/in/themelroser/" onClick={() => posthog?.capture?.('cta_click', { cta: 'linkedin' })} className="dm-interactive rounded-full border border-[color:var(--dm-border-strong)] bg-[color:var(--dm-chip-bg)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--dm-text-strong)]">LinkedIn</a>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-[color:var(--dm-border-soft)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-5 py-5 text-xs tracking-[0.08em] text-[var(--dm-text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Devs Miami LLC</span>
          <span>Built by Devs Miami LLC</span>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() => posthog?.capture?.('nav_link_click', { label, href })}
      className="dm-interactive rounded-full px-3 py-2 transition duration-500 hover:text-[var(--dm-text-strong)]"
    >
      {label}
    </a>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="dm-surface-card rounded-xl border border-[color:var(--dm-border-soft)] px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--dm-text-muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--dm-text-strong)]">{value}</p>
    </div>
  );
}
