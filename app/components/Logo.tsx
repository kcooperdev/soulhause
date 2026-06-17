type Props = {
  size?: number;
};

export function Logo({ size = 36 }: Props) {
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
