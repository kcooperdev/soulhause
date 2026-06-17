type Props = {
  size?: number;
};

export function Logo({ size = 36 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="logo-sun-clip">
          <circle cx="50" cy="73" r="38" />
        </clipPath>
      </defs>

      {/* Sun with stripes */}
      <circle cx="50" cy="73" r="38" fill="#F5C432" />
      <rect x="8" y="59" width="84" height="2"  fill="#F5F0E6" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="61" width="84" height="8"  fill="#F0A020" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="69" width="84" height="2"  fill="#F5F0E6" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="71" width="84" height="8"  fill="#E89070" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="79" width="84" height="2"  fill="#F5F0E6" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="81" width="84" height="7"  fill="#E8703A" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="88" width="84" height="2"  fill="#F5F0E6" clipPath="url(#logo-sun-clip)" />
      <rect x="8" y="90" width="84" height="24" fill="#C45525" clipPath="url(#logo-sun-clip)" />

      {/* House outline over the sun */}
      <rect x="13" y="44" width="74" height="49" rx="5" stroke="#4F9080" strokeWidth="5.5" fill="none" />
      <line x1="8"  y1="47" x2="50" y2="8"  stroke="#4F9080" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="50" y1="8"  x2="92" y2="47" stroke="#4F9080" strokeWidth="5.5" strokeLinecap="round" />
      <polyline
        points="69,28 69,16 78,16 78,26"
        stroke="#4F9080" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
