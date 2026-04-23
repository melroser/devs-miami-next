import { volumes } from "@/lib/volumes";

export function Masthead({
  numeral,
  kicker,
  title,
  subtitle
}: {
  numeral: string;
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  const volume = volumes.find((item) => item.numeral === numeral);
  const [firstWord, ...rest] = title.split(" ");

  return (
    <section className="cover-in border-b border-black/15 px-6 py-8 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-black/55 sm:text-xs">
            Volume {numeral} / {kicker}
          </p>
          <h1 className="font-black uppercase leading-none text-[3.25rem] sm:text-[5rem] lg:text-[7.5rem]">
            <span className="block">{firstWord}</span>
            {rest.length ? <span className="block">{rest.join(" ")}</span> : null}
          </h1>
        </div>

        <div className="max-w-md pb-2">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-black/50">Miami Software Journal</p>
          {subtitle ? <p className="max-w-md text-base leading-relaxed text-black/80 sm:text-lg">{subtitle}</p> : null}
          <div className="mt-4 h-2 w-16" style={{ background: volume?.tint ?? "#ff6b4a" }} aria-hidden />
        </div>
      </div>
    </section>
  );
}
