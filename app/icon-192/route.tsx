import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffe14a",
          color: "#141414",
          fontSize: 64,
          fontWeight: 800,
          border: "10px solid #141414",
        }}
      >
        BTN
      </div>
    ),
    { width: 192, height: 192 },
  );
}
