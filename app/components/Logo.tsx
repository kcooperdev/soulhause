type Props = {
  size?: number;
  variant?: "light" | "dark";
};

export function Logo({ size = 32, variant = "light" }: Props) {
  const ring = variant === "dark" ? "#ECE3D0" : "#6B1E20";
  const house = variant === "dark" ? "#6B1E20" : "#ECE3D0";
  const accent = "#2E5BFF";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill={ring} />
      <path
        d="M16 8.4 L8.6 14.2 L8.6 22.6 L23.4 22.6 L23.4 14.2 Z"
        fill={house}
      />
      <rect
        x="14.4"
        y="17.6"
        width="3.2"
        height="5"
        rx="0.4"
        fill={accent}
      />
    </svg>
  );
}
