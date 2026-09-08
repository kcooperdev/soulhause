import type { ReactNode } from "react";

function Icon({
  children,
  size = 22,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      fill="currentColor"
    >
      {children}
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  LinkedIn: (
    <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5ZM3 8.75h3.96V21H3V8.75ZM9.34 8.75H13.1v1.67h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.69 2.6 4.69 6V21h-3.96v-5.5c0-1.31 0-3-1.83-3s-2.11 1.43-2.11 2.9V21H9.34V8.75Z" />
  ),
  GitHub: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.32 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  X: (
    <path d="M18.24 3H21l-6.51 7.44L22 21h-6.17l-4.83-6.31L5.3 21H2.52l6.96-7.96L2 3h6.32l4.36 5.77L18.24 3Zm-1.08 16.2h1.7L7 4.7H5.18l11.98 14.5Z" />
  ),
  Instagram: (
    <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8A3.2 3.2 0 0 0 19.2 16V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.7A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9Zm5.05-3.35a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
  ),
  Site: (
    <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm6.9 8.2h-3.12a14.7 14.7 0 0 0-1.2-5 7.22 7.22 0 0 1 4.32 5ZM12 4.8a13 13 0 0 1 1.72 6.4H10.28A13 13 0 0 1 12 4.8ZM5.1 12.8h3.12a14.7 14.7 0 0 0 1.2 5 7.22 7.22 0 0 1-4.32-5Zm3.12-1.6H5.1a7.22 7.22 0 0 1 4.32-5 14.7 14.7 0 0 0-1.2 5ZM12 19.2a13 13 0 0 1-1.72-6.4h3.44A13 13 0 0 1 12 19.2Zm2.58-1.4a14.7 14.7 0 0 0 1.2-5h3.12a7.22 7.22 0 0 1-4.32 5Z" />
  ),
};

const cardLabels = ["LinkedIn", "GitHub", "X"] as const;

function glyph(label: string, size: number) {
  const path = icons[label];
  if (!path) return null;
  return <Icon size={size}>{path}</Icon>;
}

export function SocialIconLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  if (!links.length) return null;

  return (
    <ul className="social-row">
      {links.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className="social-link"
          >
            {glyph(item.label, 20) ?? (
              <span className="text-sm font-semibold">{item.label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialMarks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const shown = cardLabels
    .map((label) => links.find((item) => item.label === label))
    .filter((item): item is { label: string; href: string } => Boolean(item));

  if (!shown.length) return null;

  return (
    <span className="member-cell-socials" aria-hidden>
      {shown.map((item) => (
        <span key={item.label} className="member-cell-social">
          {glyph(item.label, 13)}
        </span>
      ))}
    </span>
  );
}
