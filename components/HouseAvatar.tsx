export function HouseAvatar({
  name,
  photo,
  size = 64,
}: {
  name: string;
  photo?: string;
  size?: number;
}) {
  const letter = name.trim().charAt(0).toUpperCase() || "S";

  return (
    <span
      className="house-avatar"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {photo ? (
        // Data URLs from the profile form; not a remote asset.
        <img src={photo} alt="" className="house-avatar-photo" />
      ) : null}
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <path
          fill={photo ? "none" : "var(--cream)"}
          stroke="var(--teal)"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          d="M32 6.4 56.8 29.6H50v26.8H14V29.6H7.2L32 6.4Z"
        />
        <path
          fill="none"
          stroke="var(--teal)"
          strokeWidth="2.4"
          strokeLinecap="round"
          d="M43.2 12.6v10"
        />
      </svg>
      {photo ? null : (
        <span className="house-avatar-letter" style={{ fontSize: size * 0.34 }}>
          {letter}
        </span>
      )}
    </span>
  );
}
