'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import posthog from 'posthog-js';
import { usePostHog } from 'posthog-js/react';

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

type Direction = {
  name: string;
  headline: string;
  description: string;
  bestFor: string;
  mood: string[];
};

const projects: Project[] = [
  {
    title: 'Wingit',
    subtitle: 'Flagship real-time presentation studio with AI-generated slides, transcript, and voice.',
    href: 'https://wingit.dev',
    stage: 'Flagship Product',
    tags: ['AI', 'Realtime', 'Presentations'],
    flagship: true,
  },
  {
    title: 'Vitamax Health',
    subtitle: 'Health-focused prototype to help users take the right vitamins, at the right time.',
    href: '#',
    stage: 'Prototype',
    tags: ['HealthTech', 'Mobile', 'Behavior Design'],
  },
  {
    title: 'Horcrux.inc',
    subtitle: 'AI context layer for saving, restoring, and sharing model context across workflows.',
    href: 'https://horcrux.inc',
    stage: 'R&D Product',
    tags: ['Agents', 'Context', 'Developer Tools'],
  },
  {
    title: 'Drone Talents',
    subtitle: 'Marketplace platform connecting businesses with licensed drone operators.',
    href: 'https://devs.miami/projects/drone-talents/',
    stage: 'Marketplace',
    tags: ['Marketplace', 'Operations', 'Gig Economy'],
  },
  {
    title: 'Lern2CWD',
    subtitle: 'Practice app for learning data structures and coding interview problem solving.',
    href: '#',
    stage: 'Education App',
    tags: ['EdTech', 'LeetCode', 'Practice'],
  },
  {
    title: 'SDN OpenAPI',
    subtitle: 'Open API tooling around OFAC SDN datasets for compliance-centric products.',
    href: 'https://sdn-openapi.netlify.app/',
    stage: 'Developer API',
    tags: ['Compliance', 'API', 'Infrastructure'],
  },
];

const directions: Direction[] = [
  {
    name: 'Direction 01',
    headline: 'Kinetic Product Theatre',
    description:
      'A high-drama, animation-led site where Wingit is the center of gravity and every scroll beat feels like a product launch.',
    bestFor: 'Investor demos and high-attention brand storytelling',
    mood: ['Immersive', 'Loud', 'Cinematic'],
  },
  {
    name: 'Direction 02',
    headline: 'Precision Innovation Lab',
    description:
      'Sharper structure, high contrast, and technical credibility. Designed to show disciplined execution across multiple bets.',
    bestFor: 'Enterprise trust and technical buyer conversion',
    mood: ['Confident', 'Structured', 'High Signal'],
  },
  {
    name: 'Direction 03',
    headline: 'Future Builder Collective',
    description:
      'Editorial + experimental blend focused on team, momentum, and portfolio. Wingit remains featured, ecosystem stays visible.',
    bestFor: 'Recruiting, partnerships, and community building',
    mood: ['Human', 'Experimental', 'Modern'],
  },
];

const founders = [
  {
    name: 'Rob Melroser',
    role: 'CTO / CEO / VP Engineering',
    note: 'Lead technical architect and primary product execution across the portfolio.',
    href: 'https://melroser.com',
  },
  {
    name: 'Gabriel Robayo',
    role: 'Acting CFO',
    note: 'Financial strategy, planning, and business model discipline for sustainable growth.',
    href: '#',
  },
  {
    name: 'Sebastien Dolce',
    role: 'COO Candidate / Operations + Technical Strategy',
    note: 'Execution support across WordPress operations and technical product brainstorming.',
    href: '#',
  },
  {
    name: 'Tatiana Riquelme',
    role: 'Media + Medical Domain Advisor',
    note: 'Creative media direction plus nurse practitioner expertise for medical software initiatives.',
    href: '#',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 1, 0.35, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

function useWingitLinks() {
  const posthogClient = usePostHog();
  const [wingitUrl, setWingitUrl] = useState('https://wingit.dev');
  const [appWingitUrl, setAppWingitUrl] = useState('https://app.wingit.dev');

  useEffect(() => {
    if (!posthogClient) return;

    const update = () => {
      setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
      setAppWingitUrl(getWingItUrl('https://app.wingit.dev', posthogClient));
    };

    update();
    const t = setTimeout(update, 200);

    return () => clearTimeout(t);
  }, [posthogClient]);

  return { wingitUrl, appWingitUrl };
}

export default function Page() {
  const { wingitUrl, appWingitUrl } = useWingitLinks();
  const nonFlagship = useMemo(() => projects.filter((p) => !p.flagship), []);
  const tickerItems = useMemo(
    () => [
      'Wingit • Real-time presentation engine',
      'Vitamax • Personalized vitamin support prototype',
      'Horcrux.inc • AI context portability',
      'Drone Talents • Drone operator marketplace',
      'Lern2CWD • Coding practice app',
      'SDN OpenAPI • Compliance data API tooling',
    ],
    []
  );

  return (
    <div className="dm-shell min-h-screen text-[#e6f0f2]">
      <div className="dm-vignette" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#031017]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85 transition hover:text-[#74ffe2]"
          >
            Devs Miami LLC
          </a>

          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/60 md:flex">
            <NavLink href="#flagship" label="Wingit" />
            <NavLink href="#directions" label="Directions" />
            <NavLink href="#products" label="Products" />
            <NavLink href="#team" label="Team" />
            <NavLink href="#contact" label="Contact" />
          </nav>

          <a
            href={wingitUrl}
            onClick={() => posthog?.capture?.('cta_click', { cta: 'header_wingit' })}
            className="rounded-full border border-[#74ffe2]/55 bg-[#74ffe2]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#dcfffa] transition hover:-translate-y-0.5 hover:bg-[#74ffe2]/20"
          >
            Launch Wingit
          </a>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <motion.section
          id="flagship"
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_10%_20%,rgba(88,215,255,0.24),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(255,122,77,0.2),transparent_35%),rgba(2,11,18,0.85)] p-7 sm:p-12"
        >
          <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/65 sm:right-8 sm:top-8">
            Flagship Priority
          </div>

          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[#8aeedb]">
            Devs Miami // build fast, ship for real
          </motion.p>

          <motion.h1
            variants={reveal}
            className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-7xl"
          >
            Wingit is the hero product.
            <span className="mt-2 block text-[#88f7ff]">Everything else proves range.</span>
          </motion.h1>

          <motion.p variants={reveal} className="mt-6 max-w-2xl text-sm leading-relaxed text-[#d4e7e9] sm:text-base">
            Devs Miami LLC is an execution-first studio collective. We prototype, harden, and ship ambitious software.
            Wingit leads the story. The rest of our ecosystem shows that we can build across AI, health, education,
            marketplaces, and compliance.
          </motion.p>

          <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3">
            <a
              href={wingitUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_wingit' })}
              className="rounded-full border border-[#8effe4]/70 bg-[#8effe4]/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#edfffb] transition hover:-translate-y-0.5 hover:bg-[#8effe4]/30"
            >
              Enter Wingit
            </a>
            <a
              href={appWingitUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_app_wingit' })}
              className="rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/90 transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              Open App
            </a>
            <a
              href="#directions"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_view_directions' })}
              className="rounded-full border border-white/20 bg-black/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/90 transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              See Redesign Concepts
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            className="mt-9 grid gap-4 rounded-2xl border border-white/12 bg-black/35 p-4 text-sm text-white/80 sm:grid-cols-3"
          >
            <Metric label="Core Story" value="Wingit First" />
            <Metric label="Team Model" value="4 Co-Founders" />
            <Metric label="Build Thesis" value="Scrappy + Shippable" />
          </motion.div>
        </motion.section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <div className="dm-ticker">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <motion.section
          id="directions"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
        >
          <motion.div variants={reveal} className="mb-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[#8aeedb]">Creative Directions</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-5xl">Three redesign paths for devs.miami</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">
              This page is now an inspiration mockup. Pick one direction, then we can turn that direction into a production
              system with custom interactions and page-level storytelling.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {directions.map((direction, index) => (
              <motion.article
                key={direction.name}
                variants={reveal}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-3xl border border-white/14 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(0,0,0,0.08)_55%)] p-6"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#65ffe8]/20 blur-2xl transition group-hover:bg-[#ff8f55]/30" />
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">{direction.name}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{direction.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{direction.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#99f7e5]">Best for</p>
                <p className="mt-1 text-sm text-white/85">{direction.bestFor}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {direction.mood.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => posthog?.capture?.('direction_interest_click', { direction: direction.headline, index })}
                  className="mt-6 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/12"
                >
                  Choose This Direction
                </button>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="products"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
        >
          <motion.div variants={reveal} className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[#8aeedb]">Product Universe</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-5xl">Flagship plus a full build portfolio</h2>
            </div>
            <a
              href={wingitUrl}
              onClick={() => posthog?.capture?.('cta_click', { cta: 'products_wingit' })}
              className="inline-flex rounded-full border border-[#7cfde3]/40 bg-[#7cfde3]/12 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#dcfff8] transition hover:bg-[#7cfde3]/24"
            >
              Wingit Live
            </a>
          </motion.div>

          <motion.article variants={reveal} className="rounded-3xl border border-[#7cfde3]/35 bg-[#071f24]/65 p-7">
            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#9df8e9]">Featured Flagship</p>
                <h3 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">Wingit</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d0ebed] sm:text-base">
                  Wingit transforms rough prompts into presentable narratives in real time. It captures transcript + audio,
                  accelerates delivery, and helps teams communicate clearly without sacrificing speed.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Real-time generation', 'Voice + transcript', 'Presentation quality', 'Ship-ready velocity'].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-[#88ffe6]/45 bg-[#88ffe6]/12 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#dbfff8]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="dm-orbital-card rounded-2xl border border-white/15 bg-black/35 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">Flagship Signals</p>
                <ul className="mt-4 space-y-3 text-sm text-white/85">
                  <li>Built for live demos and async storytelling</li>
                  <li>Data instrumentation ready for growth loops</li>
                  <li>Acts as brand proof of execution quality</li>
                </ul>
              </div>
            </div>
          </motion.article>

          <motion.div variants={stagger} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nonFlagship.map((project) => (
              <motion.a
                key={project.title}
                variants={reveal}
                whileHover={{ y: -6, scale: 1.01 }}
                href={project.href}
                onClick={() => posthog?.capture?.('project_click', { title: project.title, href: project.href })}
                className="rounded-2xl border border-white/12 bg-[linear-gradient(155deg,rgba(120,234,255,0.1),rgba(0,0,0,0.12)_45%)] p-5 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{project.stage}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="text-white/55">↗</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{project.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/18 bg-black/35 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="team"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
        >
          <motion.div variants={reveal} className="mb-7">
            <p className="text-xs uppercase tracking-[0.26em] text-[#8aeedb]">Founding Team</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-5xl">A multi-domain, high-velocity crew</h2>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2">
            {founders.map((member) => (
              <motion.a
                key={member.name}
                variants={reveal}
                href={member.href}
                onClick={() => posthog?.capture?.('team_link_click', { name: member.name, href: member.href })}
                className="rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(0,0,0,0.2))] p-6 transition hover:border-[#7bfde2]/45"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#91f7e4]">{member.role}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{member.note}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="contact"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-20 rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_0%_0%,rgba(116,255,226,0.25),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(255,135,88,0.24),transparent_32%),rgba(5,12,17,0.9)] p-8 sm:p-10"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-[#96f9e7]">Build With Devs Miami</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            If you need a team that can prototype fast and ship production-grade systems, let’s talk.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:rob@devs.miami"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'email_rob' })}
              className="rounded-full border border-[#8effe4]/70 bg-[#8effe4]/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f0fffc] transition hover:-translate-y-0.5 hover:bg-[#8effe4]/32"
            >
              rob@devs.miami
            </a>
            <a
              href="mailto:info@devs.miami"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'email_info' })}
              className="rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 transition hover:-translate-y-0.5 hover:bg-white/14"
            >
              info@devs.miami
            </a>
            <a
              href="https://www.linkedin.com/in/themelroser/"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'linkedin' })}
              className="rounded-full border border-white/25 bg-black/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() => posthog?.capture?.('nav_link_click', { label, href })}
      className="transition hover:text-white"
    >
      {label}
    </a>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/12 bg-white/5 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
