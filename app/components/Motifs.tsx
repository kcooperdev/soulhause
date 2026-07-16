export function MemberCard({
  name = "Member",
  no = "001",
}: {
  name?: string;
  no?: string;
}) {
  return (
    <div className="member-card">
      <div className="mc-top">
        <span>SoulHause · Member</span>
        <span>No. {no}</span>
      </div>
      <div className="mc-name">
        a small house<br />with the <em>lights on.</em>
      </div>
      <div className="mc-bot">
        <div className="mc-detail">
          {name}
          <br />
          Valid · for life
        </div>
        <div className="mc-seal">
          ★<br />MEMBER
          <br />PASS
        </div>
      </div>
    </div>
  );
}

export function Ticket() {
  return (
    <div className="ticket">
      <div>
        <div className="ticket-lbl">Doors open</div>
        <div className="ticket-num">2026</div>
      </div>
      <div className="ticket-divide">
        <div className="ticket-lbl">★ Weekly events</div>
        <div className="ticket-lbl">★ Build together</div>
      </div>
    </div>
  );
}

export function Stamp({
  children,
  variant = "oxblood",
}: {
  children: React.ReactNode;
  variant?: "oxblood" | "sky" | "sand";
}) {
  return <div className={`stamp${variant !== "oxblood" ? " " + variant : ""}`}>{children}</div>;
}
