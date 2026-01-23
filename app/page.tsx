'use client';

import React, { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { usePostHog } from 'posthog-js/react';

// Helper to add PostHog IDs to wingit.dev links.
// Prefers a global helper (if your PostHog init defines one), but falls back to
// reading IDs directly from the PostHog client.
function getWingItUrl(baseUrl: string, ph?: any): string {
  if (typeof window === 'undefined') return baseUrl;

  const globalHelper = (window as any).__addPostHogIdsToUrl;
  if (typeof globalHelper === 'function') return globalHelper(baseUrl);

  const distinctId = ph?.get_distinct_id?.();
  const sessionId = ph?.get_session_id?.();

  // If PostHog isn't ready yet, don't mutate the URL.
  if (!distinctId && !sessionId) return baseUrl;

  try {
    const url = new URL(baseUrl);
    if (distinctId) url.searchParams.set('ph_distinct_id', distinctId);
    if (sessionId) url.searchParams.set('ph_session_id', sessionId);
    return url.toString();
  } catch {
    // If baseUrl isn't a valid URL (shouldn't happen here), just return it.
    return baseUrl;
  }
}

type Card = {
  title: string;
  subtitle: string;
  href: string;
  tags: string[];
  date?: string;
};

const projects: Card[] = [
  {
    title: 'WingIt',
    subtitle: 'Real-time presentation engine with auto-generated slides, transcript, and voice.',
    href: 'https://wingit.dev',
    tags: ['Product', 'Realtime', 'AI'],
  },
  {
    title: 'Horcrux.inc',
    subtitle: 'AI System and MCP Tool for Managing and Restoring Context',
    href: 'https;//horcrux.inc',
    tags: ['R&D', 'Agents', 'Systems'],
  },
  {
    title: 'SDN OpenAPI',
    subtitle: 'OFAC SDN list API tooling for compliance automation.',
    href: 'https://sdn-openapi.netlify.app',
    tags: ['API', 'Compliance', 'Infra'],
  },
  {
    title: 'Devs.Miami',
    subtitle: 'Projects, writing, and experiments.',
    href: 'https://devs.miami',
    tags: ['Hub', 'Portfolio'],
  },
];

const blog: Card[] = [
  {
    title: 'Welcome to Devs.Miami',
    subtitle: 'Miami Based Local Tech Talent.',
    href: '#blog-welcome',
    tags: ['Announcement', 'Miami'],
    date: '2024-04-10',
  },
  {
    title: 'Film.fyi',
    subtitle: 'Endless Scroll Portfolios made for Photographers',
    href: 'https://film.fyi',
    tags: ['Project', 'Photography'],
    date: '2023-11-24',
  },
  {
    title: 'Drone Talents',
    subtitle: 'An Online Marketplace for finding licensed Drone Pilots.',
    href: 'https://devs.miami/projects/drone-talents/',
    tags: ['Project', 'Marketplace'],
    date: '2023-11-20',
  },
];

const team = [
  { name: 'Rob', note: 'Founder, Cheif of Engineering.  melroser.com', href: 'https://melroser.com' },
  { name: 'Dolce', note: 'CTO, architecture and technical lead. debugdynasty.com', href: 'https://debugdynasty.com' },
  { name: 'Gabe', note: 'Operations and strategy. gabe.miami', href: 'https://gabe.miami' },
];

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-5 pb-20">
        <Hero />

        <Section id="projects" eyebrow="PROJECTS" title="Recent work">
          <Grid cards={projects} onClickName="project_click" />
        </Section>

        <Section
          id="blog"
          eyebrow="BLOG"
          title="Updates, launches, and notes"
          subtitle="Short posts on what we’re building, learning, and shipping."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured post */}
            <FeaturedPost />

            {/* List */}
            <div className="lg:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white/85">Latest</div>
                <a
                  href="#blog-welcome"
                  onClick={() => posthog?.capture?.('blog_cta_click', { cta: 'view_featured' })}
                  className="text-sm text-white/60 hover:text-white"
                >
                  Read featured →
                </a>
              </div>

              <BlogGrid cards={blog} onClickName="blog_click" />

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70 backdrop-blur-xl">
                Want more updates? Follow along on{' '}
                <a
                  className="text-white/85 hover:text-white underline decoration-white/20 hover:decoration-white/50 underline-offset-4"
                  href="https://www.linkedin.com/in/themelroser/"
                  onClick={() => posthog?.capture?.('blog_cta_click', { cta: 'linkedin_follow' })}
                >
                  LinkedIn
                </a>{' '}
                or check out{' '}
                <a
                  className="text-white/85 hover:text-white underline decoration-white/20 hover:decoration-white/50 underline-offset-4"
                  href="#projects"
                  onClick={() => posthog?.capture?.('blog_cta_click', { cta: 'view_projects' })}
                >
                  recent work
                </a>
                .
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="about"
          eyebrow="ABOUT"
          title="About Devs.Miami"
          subtitle="A growing network of software engineers and tech entrepreneurs living in and around Miami."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: narrative + mission/values */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold">Welcome</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Welcome to Devs.Miami — a growing network of software engineers and tech entrepreneurs living in and
                around Miami. Founded in 2022, Devs.Miami was born out of a passion for technology and a desire to connect
                businesses with the best software engineering talent.
              </p>

              <h3 className="mt-5 text-lg font-semibold">Our mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Our mission is simple: to help businesses harness the power of technology to achieve their goals. We
                believe great software can change the world — and we focus on building high-quality products with clear
                communication and consistent delivery.
              </p>

              <h3 className="mt-5 text-lg font-semibold">Our values</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/75">
                <li>
                  <span className="text-white/90">Excellence:</span> high standards in craftsmanship and service.
                </li>
                <li>
                  <span className="text-white/90">Innovation:</span> pushing boundaries, exploring new tools and ideas.
                </li>
                <li>
                  <span className="text-white/90">Collaboration:</span> teamwork with each other and our clients.
                </li>
                <li>
                  <span className="text-white/90">Integrity:</span> honesty, transparency, and follow-through.
                </li>
              </ul>
            </div>

            {/* Right: promise + team */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold">Our promise</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>
                  <span className="text-white/90">Exceptional talent:</span> top-tier engineers across a wide range of
                  stacks.
                </li>
                <li>
                  <span className="text-white/90">Tailored solutions:</span> pragmatic builds aligned to your business
                  goals.
                </li>
                <li>
                  <span className="text-white/90">Commitment to excellence:</span> quality work, on time, with clear
                  updates.
                </li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold">Team</h3>
              <div className="mt-3 space-y-3">
                {team.map((t) => (
                  <a
                    key={t.name}
                    href={t.href}
                    onClick={() => posthog?.capture?.('team_link_click', { name: t.name })}
                    className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="font-semibold">{t.name}</div>
                    <div className="mt-1 text-sm text-white/70">{t.note}</div>
                  </a>
                ))}
              </div>

              <div className="mt-5 text-sm text-white/70">Based in Brickell. Get in touch if you have a project.</div>
            </div>
          </div>
        </Section>

        <Section
          id="contact"
          eyebrow="CONTACT"
          title="Get in touch"
          subtitle="General inquiries: info@devs.miami. Direct contact: rob@devs.miami."
        >
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/15"
              href="mailto:rob@devs.miami"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'email_rob' })}
            >
              Email Rob
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/15"
              href="mailto:info@devs.miami"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'email_info' })}
            >
              Email Info
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/15"
              href="https://www.linkedin.com/in/themelroser/"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'linkedin' })}
            >
              LinkedIn
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/15"
              href="https://github.com/melroser"
              onClick={() => posthog?.capture?.('cta_click', { cta: 'github' })}
            >
              GitHub
            </a>
          </div>
        </Section>

        <Footer />
      </main>
    </div>
  );
}

function Header() {
  const posthogClient = usePostHog();
  const [wingitUrl, setWingitUrl] = useState('https://wingit.dev');

  useEffect(() => {
    if (!posthogClient) return;

    // PostHog can exist before session/distinct IDs are ready. Try immediately,
    // then retry once shortly after.
    setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
    const t = setTimeout(() => {
      setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
    }, 150);

    return () => clearTimeout(t);
  }, [posthogClient]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="rounded-xl px-3 py-1.5 text-sm font-semibold tracking-wide text-white/90 hover:bg-white/10">
          Devs.Miami
        </a>

        <nav className="hidden gap-1 text-sm text-white/70 sm:flex">
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#blog" label="Blog" />
          <NavLink href="#about" label="About" />
          <NavLink href="#contact" label="Contact" />
        </nav>

        <a
          href={wingitUrl}
          onClick={() => posthog?.capture?.('cta_click', { cta: 'header_wingit' })}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/15"
        >
          WingIt →
        </a>
      </div>
    </header>
  );
}

function Hero() {
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
    const t = setTimeout(update, 150);

    return () => clearTimeout(t);
  }, [posthogClient]);

  return (
    <section id="top" className="pt-12 sm:pt-16">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-10">
        <div className="text-sm text-white/65">Local Tech Talent</div>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Devs●Miami</h1>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="block text-white/30">Building What Comes Next</span>
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
          Devs.Miami is a network of software engineers and tech entrepreneurs in Miami. We build cutting edge web
          applications with usefull AI features.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={wingitUrl}
            onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_wingit' })}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/20"
          >
            Latest App
          </a>
          <a
            href={appWingitUrl}
            onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_wingit_app' })}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/15"
          >
            WingIt.dev
          </a>
          <a
            href="#projects"
            onClick={() => posthog?.capture?.('cta_click', { cta: 'hero_projects' })}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/15"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-14">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-[0.2em] text-white/55">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-white/70">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Grid({ cards, onClickName }: { cards: Card[]; onClickName: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((c) => (
        <a
          key={c.title}
          href={c.href}
          onClick={() => posthog?.capture?.(onClickName, { title: c.title, href: c.href })}
          className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">{c.title}</div>
              {c.date ? <div className="mt-1 text-xs text-white/50">{c.date}</div> : null}
            </div>
            <div className="text-white/55 transition group-hover:text-white">→</div>
          </div>

          <div className="mt-2 text-sm leading-relaxed text-white/70">{c.subtitle}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/65">
                {t}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function WelcomePost() {
  return (
    <div
      id="blog-welcome"
      className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6 text-sm leading-relaxed text-white/75 backdrop-blur-xl"
    >
      <div className="text-xs font-semibold tracking-[0.2em] text-white/55">2024-04-10 • rob</div>
      <h3 className="mt-2 text-xl font-semibold">Welcome to Devs.Miami</h3>
      <p className="mt-3">
        Devs.Miami connects businesses with software engineering talent. There's high demand and a lot of noise—we focus on
        clear communication and quality work.
      </p>
      <p className="mt-3">Whether you're building an MVP, scaling a team, or working on something ambitious, we can help you ship it.</p>
    </div>
  );
}

function FeaturedPost() {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl lg:sticky lg:top-20 lg:self-start">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold tracking-[0.2em] text-white/55">FEATURED</div>
        <div className="text-xs text-white/50">2024-04-10 • rob</div>
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight">Welcome to Devs.Miami</h3>

      <p className="mt-3 text-sm leading-relaxed text-white/75">
        Devs.Miami is a Miami-based network of builders — software engineers, founders, and operators — focused on shipping
        high-quality products with clear communication and consistent delivery.
      </p>

      <p className="mt-3 text-sm leading-relaxed text-white/75">
        If you’re building an MVP, scaling a team, or trying to move faster without sacrificing quality, we can help you plan,
        build, and launch.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/65">Miami</span>
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/65">Consulting</span>
        <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/65">Shipping</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#blog-welcome"
          onClick={() => posthog?.capture?.('blog_cta_click', { cta: 'read_featured' })}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/20"
        >
          Read post →
        </a>
        <a
          href="#contact"
          onClick={() => posthog?.capture?.('blog_cta_click', { cta: 'contact_from_blog' })}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/15"
        >
          Work with us
        </a>
      </div>
    </article>
  );
}

function BlogGrid({ cards, onClickName }: { cards: Card[]; onClickName: string }) {
  return (
    <div className="grid gap-4">
      {cards.map((c) => (
        <a
          key={c.title}
          href={c.href}
          onClick={() => posthog?.capture?.(onClickName, { title: c.title, href: c.href })}
          className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="text-lg font-semibold">{c.title}</div>
                {c.date ? <div className="text-xs text-white/50">{c.date}</div> : null}
              </div>
              <div className="mt-1 text-sm leading-relaxed text-white/70">{c.subtitle}</div>
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-white/55 transition group-hover:text-white">
              <span className="hidden sm:inline">Read</span> →
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/65">
                {t}
              </span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() => posthog?.capture?.('nav_link_click', { label, href })}
      className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white"
    >
      {label}
    </a>
  );
}

function Footer() {
  const posthogClient = usePostHog();
  const [wingitUrl, setWingitUrl] = useState('https://wingit.dev');

  useEffect(() => {
    if (!posthogClient) return;

    setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
    const t = setTimeout(() => {
      setWingitUrl(getWingItUrl('https://wingit.dev', posthogClient));
    }, 150);

    return () => clearTimeout(t);
  }, [posthogClient]);

  return (
    <footer className="mt-14 border-t border-white/10 py-10 text-sm text-white/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} Devs.Miami</div>
        <div className="flex gap-4">
          <a
            className="hover:text-white"
            href={wingitUrl}
            onClick={() => posthog?.capture?.('footer_link_click', { label: 'WingIt', href: 'https://wingit.dev' })}
          >
            WingIt
          </a>
          <a
            className="hover:text-white"
            href="https://melroser.com"
            onClick={() => posthog?.capture?.('footer_link_click', { label: 'melroser.com', href: 'https://melroser.com' })}
          >
            melroser.com
          </a>
          <a
            className="hover:text-white"
            href="mailto:rob@devs.miami"
            onClick={() => posthog?.capture?.('footer_link_click', { label: 'rob@devs.miami', href: 'mailto:rob@devs.miami' })}
          >
            rob@devs.miami
          </a>
        </div>
      </div>
    </footer>
  );
}