import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Code of conduct",
  description: "How we expect people to treat each other at a BMore Tech Nights mixer.",
  path: "/conduct",
});

export default function ConductPage() {
  return (
    <div className="page">
      <article className="panel prose">
        <p className="kicker">Code of conduct</p>
        <h1>Come ready to meet people well.</h1>
        <p>
          BMore Tech Nights is a mixer. The room only works if people can talk, try something, and stay. This code applies to everyone we host: attendees, vendors, sponsors, community partners, and our team. It covers the event itself and any gathering we host around it.
        </p>

        <h2>Treat people with respect</h2>
        <p>
          Speak to people as guests, not as targets. Listen. Disagreement is fine. Insults, slurs, and jokes at someone’s expense are not. That includes comments about race, gender, sexuality, religion, disability, age, or where someone is from.
        </p>
        <p>You do not need a tech job to be here. Do not quiz people on whether they belong.</p>

        <h2>Harassment and harm</h2>
        <p>We do not allow:</p>
        <ul className="plain-list">
          <li>Unwanted sexual attention, comments, or touching.</li>
          <li>Stalking, following someone after they have asked you to stop, or refusing to leave them alone.</li>
          <li>Threats, intimidation, or putting hands on someone in anger.</li>
          <li>Showing sexual or hateful images.</li>
          <li>Taking someone’s photo after they have said no.</li>
        </ul>
        <p>
          If we see this, or someone reports it, we can ask the person to leave. If someone is in immediate danger, call 911 and tell venue staff.
        </p>

        <h2>Drinks</h2>
        <p>
          General admission does not include alcohol. VIP includes one eligible drink voucher for that night, not an open bar. Drink so you can still be decent to the people around you. If someone is too intoxicated to be safe in the room, we can ask them to leave. Illegal drugs are not allowed.
        </p>

        <h2>The room</h2>
        <p>
          Follow the venue’s rules. Do not damage the space or anyone’s setup. Vendors and sponsors stay within the spot we agreed. Do not pitch, recruit, or hand out materials in a way we did not agree to.
        </p>
        <p>
          If you are sick, stay home. Accessibility needs differ by venue. Age rules, step-free access, and other access details are published with each event when we know them.
        </p>

        <h2>How to tell us</h2>
        <p>
          At the event, find someone from BMore Tech Nights and say what happened.
        </p>
        <p>
          We will listen, and we will act on what we can check. Asking someone to leave is a step we will take when the conduct above is broken.
        </p>
      </article>
    </div>
  );
}
