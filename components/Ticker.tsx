import { tickerItems } from "@/lib/content";

export function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden border-b border-black/15 bg-ink text-bone" aria-label="Product ticker">
      <div className="dm-ticker px-5 py-2 text-[11px] uppercase tracking-[0.25em]">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="opacity-80">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
