type Props = {
  size?: number;
  variant?: "light" | "dark";
};

export function Logo({ size = 32 }: Props) {
  return (
    <img
      src="/logo.png"
      alt="SoulHause"
      width={size}
      height={size}
      style={{ objectFit: "contain", display: "block" }}
      aria-hidden="true"
    />
  );
}
