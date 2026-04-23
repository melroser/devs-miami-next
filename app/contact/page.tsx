import Image from "next/image";
import { MagazineShell } from "@/components/MagazineShell";
import { Masthead } from "@/components/Masthead";
import { contactLinks } from "@/lib/content";

export default function Contact() {
  return (
    <MagazineShell>
      <Masthead
        numeral="VI"
        kicker="Contact"
        title="Reach The Team"
        subtitle="Talk to Devs.Miami about Wingit, MVPs, product architecture, software delivery, partnerships, and practical AI systems."
      />

      <section className="grid min-h-[620px] lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-black/15 px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/45">Contact Desk</p>
          <h2 className="max-w-2xl text-[2.7rem] font-black uppercase leading-[0.95] sm:text-[4.4rem] lg:text-[5.6rem]">
            Plan, build,
            <br />
            and launch.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-black/75">
            If you are building an MVP, scaling a team, or trying to move faster without sacrificing quality or utility, Devs.Miami can help you
            move from plan to product.
          </p>

          <div className="mt-8 grid gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center justify-between rounded-lg border border-black/15 bg-white/70 p-5 text-left transition hover:bg-white"
              >
                <span className="text-xl font-black uppercase">{link.label}</span>
                <span className="text-black/35 transition group-hover:translate-x-1 group-hover:text-black" aria-hidden>
                  -&gt;
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-ink2 px-6 py-10 text-bone sm:px-8 lg:px-12 lg:py-14">
          <div className="relative mb-8 h-40 w-40 rounded-lg border border-white/15 bg-white p-3">
            <Image src="/img/logo/logo_white.svg" alt="Devs Miami logo" fill className="object-contain p-4" />
          </div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/45">Built by Devs Miami LLC</p>
          <h2 className="text-[2.5rem] font-black uppercase leading-none sm:text-[4rem]">
            Miami
            <br />
            to the internet
          </h2>
          <div className="mt-8 grid gap-4 text-sm leading-relaxed text-white/75">
            <p>rob@devs.miami</p>
            <p>info@devs.miami</p>
            <p>Miami, FL</p>
            <p>Devs Miami LLC</p>
          </div>
        </div>
      </section>
    </MagazineShell>
  );
}
