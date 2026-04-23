import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Ticker } from "@/components/Ticker";
import { VolumeStack } from "@/components/VolumeStack";

export const metadata: Metadata = {
  title: "Devs.Miami - Volume Stack",
  description:
    "Shipping real software in Miami. Wingit plus tools, experiments, and proof-of-work in a collectible Miami software journal.",
  metadataBase: new URL("https://devs.miami"),
  openGraph: {
    title: "Devs.Miami",
    description: "Shipping real software in Miami. Wingit plus tools, experiments, and proof-of-work.",
    url: "https://devs.miami",
    siteName: "Devs.Miami",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Devs.Miami",
    images: ["/twitter-image"]
  },
  icons: { icon: "/img/logo/logo_white.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-ink font-sans antialiased">
        <Providers>
          <div className="min-h-screen bg-ink lg:grid lg:grid-cols-[330px_minmax(0,1fr)]">
            <VolumeStack />
            <main className="relative z-10 min-w-0 bg-bone text-ink shadow-[-24px_0_60px_rgba(0,0,0,0.34)]">
              <Ticker />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
