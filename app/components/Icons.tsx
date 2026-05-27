export function EventsIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5 H20.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3 V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 3 V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="13.5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="13.5" r="1.2" fill="currentColor" />
      <circle cx="16" cy="13.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function CohortIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 19c0-3 2.5-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 19c0-3 2.5-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ResourcesIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 17a3 3 0 0 1 3-3h10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CommunityIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6.5a3 3 0 0 1-3 3h-6l-4 3v-3H7a3 3 0 0 1-3-3v-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="9" cy="11" r="1.2" fill="currentColor" />
      <circle cx="12" cy="11" r="1.2" fill="currentColor" />
      <circle cx="15" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SparkIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 6l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 18l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 9l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
