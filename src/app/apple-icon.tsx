import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0C0E",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" stroke="#3A3D42" strokeWidth="1" />
          <path
            d="M7 19.2 C8.6 16.4 11.6 15.4 14 15.2 L16.4 12.9 C17.6 11.9 20.8 12 22 13.4 L24.4 16"
            stroke="#C6CACF"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M8.4 19.2 L23.6 19.2" stroke="#9A9EA6" strokeWidth="1" />
          <circle cx="12" cy="19.4" r="1.7" stroke="#9A9EA6" strokeWidth="1" />
          <circle cx="20.2" cy="19.4" r="1.7" stroke="#9A9EA6" strokeWidth="1" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
