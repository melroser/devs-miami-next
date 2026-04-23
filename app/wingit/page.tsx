import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { WingitLink } from "@/components/WingitLink";
import { wingitFeatures, wingitSteps } from "@/lib/content";

export default function Wingit() {
  return (
    <MagazineShell>
      <Masthead
        numeral="II"
        kicker="Flagship / AI Slide Generation"
        title="Wingit"
        subtitle="Talk -> Visualize -> Share in real time. Wingit turns live speech into structured, shareable presentations with AI-generated visuals and narrative flow."
      />

      <section className="px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {wingitFeatures.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-black/15 bg-white/70 p-7">
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/45">Feature</p>
              <h2 className="mb-2 text-2xl font-black uppercase">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-black/75">{feature.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-black/15 bg-ink2 p-8 text-bone sm:p-10">
          <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-white/55">How It Works</p>
          <ol className="grid gap-6 md:grid-cols-3">
            {wingitSteps.map((step) => (
              <li key={step.step} className="relative rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-heat text-sm font-black text-ink2">{step.step}</div>
                <p className="text-lg font-black uppercase">{step.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-white/35" aria-hidden>
                        /
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-black/15 bg-heat p-7 text-ink2">
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/55">Target Market + Advantage</p>
            <ul className="space-y-2 text-sm font-medium">
              <li>Target segments: sales reps, product managers, trainers, educators, consultants, community organizers</li>
              <li>Workflow advantage: removes manual deck building and revision bottlenecks</li>
              <li>Speed-to-clarity: converts raw speech into structured, audience-ready visuals instantly</li>
              <li>Category position: closer to live presentation copilots than standard deck software</li>
            </ul>
          </div>
          <div className="rounded-lg border border-black/15 bg-white/60 p-7">
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-black/45">Voice Tiers</p>
            <ul className="space-y-2 text-sm leading-relaxed text-black/80">
              <li>Free: browser voice, instant and device-quality</li>
              <li>Premium: fast, high-quality synthesis</li>
              <li>Ultra/Premium: studio-grade voices</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <WingitLink
            href="https://wingit.dev"
            capture={{ event: "cta_click", properties: { cta: "wingit_try" } }}
            className="rounded-md bg-ink2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-bone transition hover:-translate-y-0.5"
          >
            Try Wingit
          </WingitLink>
          <a
            href="/contact"
            className="rounded-md border border-black/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink2 transition hover:-translate-y-0.5"
          >
            Request Pitch Deck
          </a>
        </div>

        <p className="mt-10 max-w-3xl text-lg font-black uppercase text-black/80">Stop making presentations. Just give them.</p>
      </section>
    </MagazineShell>
  );
}
