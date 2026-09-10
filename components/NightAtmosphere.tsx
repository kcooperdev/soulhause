const STAR_COUNT = 72;

function star(i: number) {
  return {
    left: `${((i * 47) % 1000) / 10}%`,
    top: `${((i * 97) % 920) / 10}%`,
    size: `${1 + (i % 3)}px`,
    duration: `${2.1 + (i % 6) * 0.55}s`,
    delay: `${(i % 9) * 0.28}s`,
    low: `${0.08 + (i % 4) * 0.04}`,
  };
}

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => star(i));

export function NightAtmosphere() {
  return (
    <>
      <div className="night-stars" aria-hidden="true">
        {STARS.map((item, i) => (
          <i
            key={i}
            className="night-star"
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
              animationDuration: item.duration,
              animationDelay: item.delay,
              ["--lo" as string]: item.low,
            }}
          />
        ))}
      </div>
      <div className="night-skyline" aria-hidden="true">
        <svg viewBox="0 0 1400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
          <g fill="currentColor">
            <rect x="0" y="140" width="55" height="60" />
            <rect x="30" y="110" width="30" height="90" />
            <rect x="70" y="125" width="45" height="75" />
            <rect x="100" y="95" width="25" height="105" />
            <rect x="120" y="130" width="50" height="70" />
            <rect x="160" y="80" width="35" height="120" />
            <rect x="175" y="60" width="12" height="140" />
            <rect x="190" y="115" width="55" height="85" />
            <rect x="240" y="90" width="40" height="110" />
            <rect x="275" y="55" width="18" height="145" />
            <rect x="290" y="105" width="60" height="95" />
            <rect x="345" y="75" width="45" height="125" />
            <rect x="380" y="100" width="30" height="100" />
            <rect x="405" y="120" width="50" height="80" />
            <rect x="445" y="60" width="35" height="140" />
            <rect x="455" y="40" width="8" height="160" />
            <rect x="475" y="95" width="55" height="105" />
            <rect x="520" y="70" width="40" height="130" />
            <rect x="555" y="110" width="30" height="90" />
            <rect x="580" y="50" width="50" height="150" />
            <rect x="620" y="85" width="35" height="115" />
            <rect x="650" y="100" width="60" height="100" />
            <rect x="700" y="65" width="40" height="135" />
            <rect x="710" y="45" width="10" height="155" />
            <rect x="735" y="115" width="45" height="85" />
            <rect x="775" y="80" width="35" height="120" />
            <rect x="805" y="55" width="50" height="145" />
            <rect x="845" y="95" width="30" height="105" />
            <rect x="870" y="120" width="55" height="80" />
            <rect x="915" y="70" width="40" height="130" />
            <rect x="948" y="50" width="12" height="150" />
            <rect x="955" y="100" width="50" height="100" />
            <rect x="1000" y="85" width="35" height="115" />
            <rect x="1030" y="115" width="55" height="85" />
            <rect x="1075" y="60" width="40" height="140" />
            <rect x="1085" y="40" width="8" height="160" />
            <rect x="1110" y="95" width="45" height="105" />
            <rect x="1150" y="75" width="35" height="125" />
            <rect x="1180" y="110" width="55" height="90" />
            <rect x="1225" y="55" width="40" height="145" />
            <rect x="1258" y="35" width="10" height="165" />
            <rect x="1265" y="90" width="50" height="110" />
            <rect x="1305" y="120" width="35" height="80" />
            <rect x="1335" y="75" width="45" height="125" />
            <rect x="1370" y="100" width="30" height="100" />
            <rect x="0" y="198" width="1400" height="4" />
          </g>
        </svg>
      </div>
      <span className="night-side night-side-left">Tech After Dark · After Hours</span>
      <span className="night-side night-side-right">After Hours · Tech & AI</span>
    </>
  );
}
