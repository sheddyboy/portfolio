import { ImageResponse } from "next/og";

// iOS home-screen icon, drawn from the same mark as icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b1120" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M16 20l16 12-16 12" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 46h14" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
