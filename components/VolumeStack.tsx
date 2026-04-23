"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { volumes } from "@/lib/volumes";

function isCurrent(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function captureVolume(numeral: string, label: string) {
  posthog?.capture?.("volume_select", { volume: numeral, label });
}

export function VolumeStack() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sticky top-0 z-40 hidden h-screen overflow-visible border-r border-white/10 bg-[#0d0d0d] text-bone lg:flex">
        <nav aria-label="Volume stack" className="relative flex h-full w-full items-stretch justify-end overflow-visible pr-4">
          {volumes.map((volume, index) => {
            const active = isCurrent(pathname, volume.href);
            const activeOffset = active ? "-translate-x-1" : "translate-x-0";

            return (
              <Link
                key={volume.numeral}
                href={volume.href}
                prefetch
                onClick={() => captureVolume(volume.numeral, volume.label)}
                aria-current={active ? "page" : undefined}
                className={`spine group relative flex h-full shrink-0 items-center justify-center overflow-hidden border-l border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                  active ? "w-[104px] bg-steel shadow-spine" : "w-[42px] bg-steel2 -mr-[6px]"
                } ${activeOffset}`}
                style={{
                  zIndex: active ? 80 : 20 + index,
                  borderTopColor: volume.tint
                }}
              >
                <span aria-hidden className="absolute left-0 right-0 top-0 h-1 opacity-95" style={{ background: volume.tint }} />
                <span
                  aria-hidden
                  className={`absolute bottom-0 top-1 w-px ${active ? "left-3 bg-white/14" : "left-2 bg-white/8"}`}
                />
                <span
                  className={`rotate-[-90deg] whitespace-nowrap font-semibold uppercase transition ${
                    active ? "text-xs tracking-[0.14em] text-bone" : "text-[10px] tracking-[0.1em] text-white/72 group-hover:text-bone"
                  }`}
                >
                  {`Miami / Volume ${volume.numeral} / ${volume.label}`}
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-4 text-[10px] font-black uppercase tracking-[0.18em] ${
                    active ? "text-white/60" : "text-white/28"
                  }`}
                >
                  {volume.numeral}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="border-b border-white/10 bg-[#0d0d0d] px-3 py-3 text-bone lg:hidden">
        <nav aria-label="Volume stack mobile" className="flex gap-0 overflow-x-auto pb-1">
          {volumes.map((volume) => {
            const active = isCurrent(pathname, volume.href);
            return (
              <Link
                key={volume.numeral}
                href={volume.href}
                onClick={() => captureVolume(volume.numeral, volume.label)}
                aria-current={active ? "page" : undefined}
                className={`relative min-w-[112px] border border-white/10 px-3 py-2 text-left uppercase first:rounded-l-md last:rounded-r-md ${
                  active ? "z-20 -translate-y-0.5 bg-steel text-bone shadow-[0_8px_20px_rgba(0,0,0,0.24)]" : "-ml-2 bg-steel2 text-white/70"
                }`}
              >
                <span aria-hidden className="absolute left-0 right-0 top-0 h-1" style={{ background: volume.tint }} />
                <span className="block text-[10px] tracking-[0.2em]">Vol {volume.numeral}</span>
                <span className="block text-xs font-black tracking-[0.08em]">{volume.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
