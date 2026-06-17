export function SunMark({
  size = 160,
  opacity = 0.07,
  color = "#4F9080",
}: {
  size?: number;
  opacity?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity, display: "block" }}
    >
      <circle cx="50" cy="50" r="47" stroke={color} strokeWidth="2.5" />
      {[30, 38, 46, 54, 62, 70].map((y) => {
        const dy = Math.abs(y - 50);
        const half = Math.sqrt(47 * 47 - dy * dy);
        return (
          <line
            key={y}
            x1={50 - half}
            y1={y}
            x2={50 + half}
            y2={y}
            stroke={color}
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
