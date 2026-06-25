import { ImageResponse } from "next/og";

export const alt = "Art Glass — ремонт і полірування автоскла у Києві";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded OG/Twitter card (§10) — premium link preview when the pitch is shared. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C0E",
          padding: "76px",
          color: "#F5F6F8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              border: "1px solid #3A3D42",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path
                d="M7 19.2 C8.6 16.4 11.6 15.4 14 15.2 L16.4 12.9 C17.6 11.9 20.8 12 22 13.4 L24.4 16"
                stroke="#C6CACF"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle cx="12" cy="19.4" r="1.7" stroke="#9A9EA6" strokeWidth="1" />
              <circle cx="20.2" cy="19.4" r="1.7" stroke="#9A9EA6" strokeWidth="1" />
            </svg>
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Прототип
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
            }}
          >
            Чистий погляд на дорогу.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "26px",
              color: "#A2A6AD",
            }}
          >
            <div style={{ width: "44px", height: "2px", background: "#2DD4BF" }} />
            Ремонт скла · полірування фар · захисна плівка · Київ
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
