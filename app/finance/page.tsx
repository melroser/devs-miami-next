import type { Metadata } from "next";
import Link from "next/link";
import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";

export const metadata: Metadata = {
  title: "Sanctions Intelligence Demo - Devs.Miami",
  description:
    "A fintech engineering case study combining TypeScript OpenAPI sanctions data, Python FastAPI, OFAC SDN data, Subjective Logic, and AI-assisted risk analysis."
};

const links = [
  { label: "View live API", href: "https://sdn-openapi.netlify.app" },
  { label: "Swagger UI", href: "https://sdn-openapi.netlify.app/swagger-ui" },
  { label: "ReDoc", href: "https://sdn-openapi.netlify.app/docs" },
  { label: "SDN GitHub", href: "https://github.com/melroser/sdn-openapi" },
  { label: "ED 209 GitHub", href: "https://github.com/melroser/ed-209" }
];

const stack = [
  { layer: "API", tools: "TypeScript, Netlify Functions, OpenAPI, Swagger UI, ReDoc" },
  { layer: "Search", tools: "Fuse.js, OFAC SDN data, fuzzy entity lookup" },
  { layer: "Risk engine", tools: "Python, FastAPI, Subjective Logic, evidence fusion" },
  { layer: "AI layer", tools: "Optional Claude-assisted risk summaries" },
  { layer: "Frontend", tools: "Static HTML dashboard, recruiter-friendly demo flow" },
  { layer: "Deployment", tools: "Netlify for the API, local FastAPI prototype for ED 209" }
];

const nextBuild = [
  "Batch screening for multiple entities.",
  "Country risk dashboard built from sanctions counts and entity types.",
  "News ingestion with source citations.",
  "Historical sentiment snapshots.",
  "A market hypothesis page clearly labeled as speculative analysis."
];

const flow = [
  "Treasury OFAC SDN source data",
  "TypeScript OpenAPI layer",
  "Fuzzy search and entity lookup",
  "Subjective Logic evidence model",
  "Decision: clear, block, escalate, or gather more"
];

export default function FinanceCaseStudy() {
  return (
    <MagazineShell>
      <Masthead
        numeral="VII"
        kicker="Sanctions Intelligence"
        title="Finance Intel"
        subtitle="A fintech engineering showcase combining OpenAPI, TypeScript, Python, OFAC data, fuzzy search, uncertainty modeling, and AI-assisted risk analysis."
      />

      <section className="grid border-b border-black/15 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-black/15 px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">Case Study</p>
          <h2 className="max-w-4xl text-[2.6rem] font-black uppercase leading-[0.92] sm:text-[4.5rem] lg:text-[6.2rem]">
            Sanctions
            <br />
            Intelligence
            <br />
            Demo
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-black/75">
            This project demonstrates how raw compliance data can become a developer-friendly API, then become an evidence-based risk engine. The first layer exposes U.S. Treasury OFAC SDN data through a documented OpenAPI interface. The second layer applies uncertainty-aware screening so borderline matches do not become blind yes/no decisions.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/65">
            The larger concept is a financial intelligence workflow that can combine sanctions data, country risk, news sentiment, and AI analysis to support market research.
          </p>
        </div>

        <aside className="bg-ink2 px-6 py-10 text-bone sm:px-8 lg:px-10 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/45">Primary Artifacts</p>
          <h3 className="text-3xl font-black uppercase leading-none sm:text-4xl">One funnel, two builds</h3>
          <div className="mt-8 grid gap-3">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/15 bg-white/8 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/80 transition hover:-translate-y-0.5 hover:bg-white/12 hover:text-white"
              >
                {item.label} -&gt;
              </a>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-white/15 bg-white/8 p-5 text-sm leading-relaxed text-white/70">
            This is not a trading model. It demonstrates how compliance data, uncertainty modeling, and AI-assisted country analysis could feed a financial intelligence workflow.
          </p>
        </aside>
      </section>

      <section className="grid border-b border-black/15 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-black/15 bg-amber px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/55">The Problem</p>
          <h2 className="text-4xl font-black uppercase leading-none sm:text-5xl">Messy entity data needs explanation.</h2>
          <p className="mt-6 text-base leading-relaxed text-black/75">
            Financial and compliance systems often need to reason about names, aliases, countries, sanctions programs, and missing context. A fuzzy score alone does not explain whether a match should be blocked, ignored, escalated, or sent back for more information.
          </p>
        </div>

        <div className="px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">The Build</p>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-black/15 bg-white/70 p-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-black/45">Part 1 / API Layer</p>
              <h3 className="text-2xl font-black uppercase">SDN OpenAPI</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/70">
                A TypeScript serverless API for querying OFAC SDN data through OpenAPI, Swagger UI, ReDoc, fuzzy search, metadata, entity lookup, and scheduled refresh.
              </p>
            </article>

            <article className="rounded-lg border border-black/15 bg-white/70 p-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-black/45">Part 2 / Risk Engine</p>
              <h3 className="text-2xl font-black uppercase">ED 209</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/70">
                A Python FastAPI prototype that uses Subjective Logic opinions to explain uncertainty in sanctions screening and recommend actions like GATHER_MORE.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-black/15 bg-bone2 px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-black/45">Architecture</p>
            <h2 className="text-3xl font-black uppercase sm:text-4xl">From source data to decision support</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-black/65">
            The point is not just querying OFAC. The point is showing a path from public compliance data to documented APIs to uncertainty-aware reasoning.
          </p>
        </div>

        <ol className="grid gap-3 md:grid-cols-5">
          {flow.map((step, index) => (
            <li key={step} className="rounded-lg border border-black/15 bg-white/75 p-5">
              <span className="font-mono text-xs text-black/35">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-sm font-black uppercase leading-tight text-black/80">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid border-b border-black/15 lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-black/15 px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">Why It Matters</p>
          <h2 className="text-4xl font-black uppercase leading-none sm:text-5xl">A binary flag is often too crude.</h2>
          <p className="mt-6 text-base leading-relaxed text-black/75">
            A useful screening system should explain what evidence exists, what evidence is missing, and whether the next action is clear, escalate, block, or gather more information.
          </p>
          <blockquote className="mt-8 rounded-lg border-l-4 border-heat bg-white/70 p-6 text-lg font-black uppercase leading-tight text-black/75">
            I can turn messy public financial and compliance data into documented APIs, then build reasoning systems on top of it.
          </blockquote>
        </div>

        <div className="bg-ink2 px-6 py-10 text-bone sm:px-8 lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/45">Technical Stack</p>
          <div className="overflow-hidden rounded-lg border border-white/15">
            {stack.map((row) => (
              <div key={row.layer} className="grid border-b border-white/10 last:border-b-0 sm:grid-cols-[0.32fr_0.68fr]">
                <div className="bg-white/8 px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-white/65">{row.layer}</div>
                <div className="px-4 py-4 text-sm leading-relaxed text-white/80">{row.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1fr_0.9fr]">
        <div className="border-b border-black/15 bg-amber px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/55">What I would build next</p>
          <ul className="grid gap-3">
            {nextBuild.map((item) => (
              <li key={item} className="rounded-lg border border-black/15 bg-white/55 p-4 text-sm font-black uppercase leading-tight text-black/75">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">Recruiter Summary</p>
          <p className="text-lg leading-relaxed text-black/75">
            I built a small financial intelligence portfolio project that combines a TypeScript OpenAPI sanctions data API with a Python FastAPI uncertainty engine. The API exposes OFAC SDN data through Swagger/ReDoc with fuzzy search and entity lookup. The Python layer explores Subjective Logic for compliance screening, so borderline matches can return actionable decisions like gather more evidence instead of a crude binary flag.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://sdn-openapi.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-ink2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-bone transition hover:-translate-y-0.5"
            >
              View live API
            </a>
            <a
              href="https://github.com/melroser/ed-209"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-heat px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5"
            >
              View ED 209
            </a>
            <Link
              href="/team"
              className="rounded-md border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white/60"
            >
              Robert profile
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5 hover:bg-white/60"
            >
              Back to products
            </Link>
          </div>
        </div>
      </section>
    </MagazineShell>
  );
}
