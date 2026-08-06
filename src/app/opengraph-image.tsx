import { ImageResponse } from "next/og";

export const alt = "Nexus Arena — Next-Generation Competitive Gaming Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 * Uses only system-safe font stacks and inline styles — the OG renderer
 * supports a limited CSS subset (no CSS variables, no Tailwind).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 120% 90% at 20% 0%, #1a0b3d 0%, #04050a 55%), radial-gradient(ellipse 90% 70% at 90% 100%, #3d0b28 0%, transparent 60%)",
          backgroundColor: "#04050a",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #00e5ff, #7c3aed 50%, #ff2e88)",
            display: "flex",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(0,229,255,0.22), transparent 65%)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
          <div style={{ width: 44, height: 3, background: "#00e5ff", display: "flex" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#00e5ff",
              fontWeight: 700,
              display: "flex",
            }}
          >
            SEASON 7 · NOW LIVE
          </div>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", fontSize: 108, fontWeight: 900, letterSpacing: -3 }}>
          <span style={{ color: "#eef2ff" }}>NEXUS</span>
          <span style={{ color: "#00e5ff" }}>ARENA</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#9aa6c4",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          1,200 titles. $42M in prize money. The competitive gaming platform built by players.
        </div>

        {/* Stat row */}
        <div style={{ display: "flex", gap: 56, marginTop: 56 }}>
          {[
            ["1.2M+", "Players Online", "#00e5ff"],
            ["$42M", "Prizes Awarded", "#ff2e88"],
            ["1,200+", "Titles", "#7c3aed"],
          ].map(([value, label, color]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 46, fontWeight: 800, color, display: "flex" }}>{value}</div>
              <div
                style={{
                  fontSize: 20,
                  color: "#64708f",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
