import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

// Social preview card generated at build time from the profile content.
export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const profile = await getProfile();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1120",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(34,197,94,0.28), transparent 45%), linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#22c55e" }}>~/portfolio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#94a3b8", maxWidth: 960 }}>{profile.headline}</div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "#94a3b8" }}>
          {profile.stats.slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
