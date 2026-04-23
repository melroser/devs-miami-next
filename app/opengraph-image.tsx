import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Devs.Miami - Volume Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f5f1e8",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div style={{ width: 190, height: "100%", display: "flex", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
          {["I", "II", "III", "IV", "V", "VI"].map((volume, index) => (
            <div
              key={volume}
              style={{
                width: index === 0 ? 70 : 24,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: index === 0 ? "#151515" : "#202020",
                borderLeft: "1px solid rgba(255,255,255,0.12)"
              }}
            >
              <span style={{ transform: "rotate(-90deg)", fontSize: 18, letterSpacing: "0.14em", fontWeight: 800 }}>VOL {volume}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70 }}>
          <div style={{ width: 96, height: 10, background: "#ff6b4a" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7 }}>Miami Software Journal</div>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexDirection: "column",
                fontSize: 118,
                lineHeight: 0.9,
                fontWeight: 900,
                textTransform: "uppercase"
              }}
            >
              <span>Devs.</span>
              <span>Miami</span>
            </div>
          </div>
          <div style={{ fontSize: 32, maxWidth: 760, lineHeight: 1.25, color: "rgba(245,241,232,0.78)" }}>
            Shipping real software in Miami. Wingit plus tools, experiments, and proof-of-work.
          </div>
        </div>
      </div>
    ),
    size
  );
}
