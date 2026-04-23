import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { team } from "@/lib/content";

export default function Team() {
  return (
    <MagazineShell>
      <Masthead
        numeral="V"
        kicker="About / Team"
        title="The Masthead"
        subtitle="Conceived in 2022, Devs.Miami was born from a passion for technology and a goal to connect businesses with top software engineering talent in and around Miami."
      />

      <section className="grid border-b border-black/15 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-black/15 bg-ink2 px-6 py-10 text-bone sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/50">Mission</p>
          <h2 className="text-[2.5rem] font-black uppercase leading-none sm:text-[4.25rem]">
            Dependable
            <br />
            execution
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/78">
            Our mission is to help businesses harness technology to achieve their goals by building high-quality software with dependable execution.
          </p>
        </div>

        <div className="bg-bone2 px-6 py-10 sm:px-8 lg:px-12 lg:py-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">Team Model</p>
          <h2 className="max-w-2xl text-3xl font-black uppercase leading-tight sm:text-5xl">The four most valuable people in Miami</h2>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {team.map((member, index) => (
            <article key={member.name} className="rounded-lg border border-black/15 bg-white/70 p-7">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-black/45">Masthead / {String(index + 1).padStart(2, "0")}</p>
                <span className="font-mono text-xs text-black/35">Vol V</span>
              </div>
              <h2 className="text-3xl font-black uppercase leading-tight">{member.name}</h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/50">{member.role}</p>
              <p className="mt-5 text-sm leading-relaxed text-black/75">{member.bio}</p>
              <a href={member.href} className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.2em] text-black/70 transition hover:text-black">
                LinkedIn -&gt;
              </a>
            </article>
          ))}
        </div>
      </section>
    </MagazineShell>
  );
}
