import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { financialSnapshot, roadmap } from "@/lib/content";

export default function Roadmap() {
  return (
    <MagazineShell>
      <Masthead
        numeral="III"
        kicker="Roadmap Ahead"
        title="What Next"
        subtitle="Wingit is what comes next in presentation software. Here is the plan, the math, and the market we are pointed at."
      />

      <section className="px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-6">
          {roadmap.map((chapter, index) => (
            <article key={chapter.title} className="rounded-lg border border-black/15 bg-white/70 p-8 sm:p-10">
              <div className="flex items-baseline justify-between gap-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">{String(index + 1).padStart(2, "0")} / Chapter</p>
                <span className="text-xs uppercase tracking-[0.2em] text-black/35">Vol III</span>
              </div>
              <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">{chapter.title}</h2>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-black/80 sm:text-base">
                {chapter.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-black/35" aria-hidden>
                      /
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-ink2 p-8 text-bone">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/55">Financial Modeling Snapshot</p>
          <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight sm:text-4xl">
            Early metrics are modeled estimates, not finalized performance numbers.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75">
            We refine assumptions as real usage and retention data comes in. Core formulas tracked: CAC = acquisition spend / new paying
            customers, LTV approximates ARPU x gross margin x lifespan, and churn = customers lost / starting customers.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {financialSnapshot.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MagazineShell>
  );
}
