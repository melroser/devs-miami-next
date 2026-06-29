import Image from "next/image";
import Link from "next/link";
import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { WingitLink } from "@/components/WingitLink";
import { coverFacts, notes } from "@/lib/content";

const issueLinks = [
  { n: "II", title: "Wingit Flagship", href: "/wingit" },
  { n: "III", title: "Roadmap + Economics", href: "/roadmap" },
  { n: "IV", title: "Product Portfolio", href: "/products" },
  { n: "V", title: "Who We Are", href: "/team" },
  { n: "VI", title: "Contact the Desk", href: "/contact" },
  { n: "VII", title: "Fintech + Compliance", href: "/finance" }
];

export default function Cover() {
  return (
    <MagazineShell>
      <Masthead
        numeral="I"
        kicker="Cover Issue"
        title="Devs. Miami"
        subtitle="A Miami-Based Software Company comprised of builders, software engineers, founders, and operators focused on shipping high-quality products with clear communication and consistent delivery."
      />

      <section className="grid lg:grid-cols-[1.55fr_0.95fr]">
        <div className="border-b border-black/15 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs">Cover Story</p>
          <h2 className="max-w-4xl text-[2.6rem] font-black uppercase leading-[0.92] sm:text-[4rem] lg:text-[5.8rem]">
            Useful software
            <br />
            and AI Tools
            <br />
            for real people
          </h2>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-black/15 bg-ink2 p-6 text-bone shadow-cover lg:p-8">
              <div className="absolute inset-0 ink-hatch opacity-80" aria-hidden />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">Devs Miami LLC</p>
                    <p className="mt-3 max-w-sm text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                      Building what comes next
                    </p>
                  </div>
                  <div className="relative h-24 w-24 shrink-0 rounded-lg border border-white/15 bg-white/95 p-2">
                    <Image src="/img/logo/logo_white.svg" alt="Devs Miami logo" fill className="object-contain p-2" priority />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">Software / identity / systems / visuals</p>
                  <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                    We build powerful web tools with useful AI features, from live presentation generation to developer APIs and workflow utilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {coverFacts.map((fact) => (
                <article key={fact.label} className="rounded-lg border border-black/15 bg-white/75 p-6">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45 sm:text-xs">{fact.label}</p>
                  <p className="text-xl font-black uppercase leading-tight sm:text-2xl">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-black/15 bg-white/80 p-6 shadow-[0_18px_40px_rgba(10,10,10,0.08)] sm:p-7">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45 sm:text-xs">Featured fintech case study</p>
            <h3 className="max-w-3xl text-3xl font-black uppercase leading-none sm:text-4xl">
              Financial Intelligence and Compliance API Demo
            </h3>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-black/72 sm:text-base">
              A two-part fintech engineering showcase: a TypeScript and Netlify serverless API exposing OFAC SDN sanctions data through OpenAPI, Swagger UI, and ReDoc, paired with a Python FastAPI prototype that uses Subjective Logic to explain uncertainty in sanctions screening.
            </p>
            <p className="mt-4 max-w-3xl text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-black/55">
              Demonstrates: TypeScript, Python, FastAPI, OpenAPI, Swagger, API documentation, fuzzy search, compliance data, financial intelligence, and AI-assisted analysis.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://sdn-openapi.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-ink2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-bone transition hover:-translate-y-0.5"
              >
                View live API
              </a>
              <a
                href="https://github.com/melroser/ed-209"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-black/20 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white"
              >
                View risk engine
              </a>
              <Link
                href="/finance"
                className="rounded-md bg-heat px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5"
              >
                Read case study
              </Link>
              <a
                href="https://github.com/melroser/sdn-openapi"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-black/20 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <WingitLink
              href="https://app.wingit.dev/auth?mode=login"
              capture={{ event: "cta_click", properties: { cta: "cover_login" } }}
              className="rounded-md border border-ink/20 bg-ink2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-bone transition hover:-translate-y-0.5"
            >
              Login to Wingit
            </WingitLink>
            <WingitLink
              href="https://app.wingit.dev/auth?mode=register"
              capture={{ event: "cta_click", properties: { cta: "cover_register" } }}
              className="rounded-md border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white/60"
            >
              Register
            </WingitLink>
            <Link
              href="/wingit"
              className="rounded-md bg-heat px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5"
            >
              Read Volume II
            </Link>
            <a
              href="https://lern2cwd.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white/60"
            >
              Try Lern2CWD
            </a>
          </div>
        </div>

        <aside className="bg-bone2 px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45 sm:text-xs">In This Issue</p>
          <h2 className="text-[2.25rem] font-black uppercase leading-none sm:text-[3rem] lg:text-[3.5rem]">
            What
            <br />
            Devs.Miami
            <br />
            makes
          </h2>

          <ul className="mt-8 space-y-3">
            {issueLinks.map((link, index) => (
              <li key={link.n}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-black/15 bg-white/70 p-5 transition hover:bg-white"
                >
                  <span>
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.28em] text-black/45">
                      Volume {link.n} / {String(index + 2).padStart(2, "0")}
                    </span>
                    <span className="block text-xl font-black uppercase">{link.title}</span>
                  </span>
                  <span className="text-lg text-black/40 transition group-hover:translate-x-1 group-hover:text-black/80" aria-hidden>
                    -&gt;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg bg-ink2 p-6 text-bone">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-xs">Issue Notes</p>
            <ul className="space-y-3 text-sm leading-relaxed text-white/80">
              {notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="text-white/35" aria-hidden>
                    /
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="grid border-t border-black/15 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-black/15 bg-white/50 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-10">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45 sm:text-xs">From the editors</p>
          <h3 className="mb-6 text-[2rem] font-black uppercase leading-none sm:text-[3rem] lg:text-[3.75rem]">
            From Miami
            <br />
            to the internet
          </h3>
          <p className="max-w-lg text-base leading-relaxed text-black/75">
            If you are building an MVP, scaling a team, or trying to move faster without sacrificing quality or utility, we can help you plan, build,
            and launch.
          </p>
        </div>
        <div className="bg-amber px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/55 sm:text-xs">Closing Mark</p>
              <div className="text-[2.5rem] font-black uppercase leading-[0.95] sm:text-[3.5rem] lg:text-[5rem]">
                Devs.
                <br />
                Miami
              </div>
            </div>
            <div className="max-w-sm text-black/75">
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-black/55">Software. Systems. Taste.</p>
              <p className="text-base leading-relaxed">Established 2025 / Miami, FL / Devs Miami LLC</p>
            </div>
          </div>
        </div>
      </section>
    </MagazineShell>
  );
}
