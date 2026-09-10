"use client";

import { useEffect, useState } from "react";
import { HauseFeed } from "@/components/HauseFeed";
import { HouseAvatar } from "@/components/HouseAvatar";
import { SocialIconLinks, SocialMarks } from "@/components/SocialIcons";
import { events, roles } from "@/lib/events";
import {
  CONSENT,
  interestChips,
  lookingChips,
  mixLine,
  offerChips,
  pitchLine,
  type InterestId,
  type LookingId,
  type OfferId,
} from "@/lib/intents";
import {
  ADMIN_ID,
  connectHref,
  houseFields,
  houseMembers,
  normalizeHandle,
  normalizeLinkedIn,
  socialLinks,
  type HouseFieldId,
  type Member,
} from "@/lib/members";
import { planById, planLabel } from "@/lib/plans";
import {
  readGoing,
  readIntents,
  readIntros,
  readProfile,
  readPulses,
  readRsvp,
  readTaste,
  writeIntents,
  writeIntros,
  writeProfile,
  writeSeekConfirmed,
  readSeekConfirmed,
  isDemoWalk,
  type Intro,
  type Pulse,
} from "@/lib/prefs";

export function HouseRoster({
  mine,
  onOpen,
}: {
  mine: Member;
  onOpen: (id: string) => void;
}) {
  const [field, setField] = useState<HouseFieldId | null>(null);
  const people = [mine, ...houseMembers].filter(
    (member, index, list) => list.findIndex((item) => item.id === member.id) === index,
  );
  const shown = field
    ? people.filter((member) => member.fields?.includes(field))
    : people;

  return (
    <div className="roster">
      <p className="roster-lede">
        Find people by field. Open a name. Connect on LinkedIn.
      </p>
      <div className="roster-pills" role="tablist" aria-label="Fields">
        <button
          type="button"
          className="chip"
          aria-pressed={!field}
          onClick={() => setField(null)}
        >
          All
        </button>
        {houseFields.map((item) => (
          <button
            key={item.id}
            type="button"
            className="chip"
            aria-pressed={field === item.id}
            onClick={() => setField(field === item.id ? null : item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="roster-empty">Nobody in this field yet.</p>
      ) : (
        <ul className="member-grid">
          {shown.map((person) => (
            <li key={person.id}>
              <MemberCell
                member={person}
                isYou={person.id === mine.id}
                onOpen={() => onOpen(person.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Directory({
  mine,
  onJoin,
  onSeek,
}: {
  mine: Member | null;
  onJoin: () => void;
  onSeek: (ids: LookingId[]) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [editingSeek, setEditingSeek] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConfirmed(readSeekConfirmed());
    setReady(true);
  }, [mine?.id]);

  const showSeek = Boolean(mine && ready && (!confirmed || editingSeek));

  return (
    <div className="mt-7">
      {showSeek && mine ? (
        <SeekSheet
          initial={mine.lookingIds ?? []}
          allowCancel={confirmed}
          onCancel={() => {
            if (!confirmed) {
              writeSeekConfirmed(true);
              setConfirmed(true);
            }
            setEditingSeek(false);
          }}
          onSave={(ids) => {
            onSeek(ids);
            writeSeekConfirmed(true);
            setConfirmed(true);
            setEditingSeek(false);
          }}
        />
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="kicker">The board</p>
          <h1 className="font-poster mt-2 text-[2.15rem] leading-[0.9] font-extrabold tracking-tight uppercase">
            The Hause
          </h1>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-6 text-muted">
            Posts you submit — a job, what you’re looking for, or a resource.
            They show here for people in that wavelength. Not a profile wall.
          </p>
        </div>
        {!mine && (
          <button type="button" className="ctl ctl-save shrink-0" onClick={onJoin}>
            Join
          </button>
        )}
      </div>

      {mine && confirmed ? (
        <button
          type="button"
          className="ctl-quiet mt-3"
          onClick={() => setEditingSeek(true)}
        >
          Change what you’re looking for
        </button>
      ) : null}

      {!mine ? (
        <p className="mt-8 text-sm leading-6 text-muted">
          Join so you can submit to the board.
        </p>
      ) : !confirmed ? (
        <p className="mt-8 max-w-sm text-sm leading-6 text-muted">
          Tell us what you’re looking for. Then you submit to the board.
        </p>
      ) : (
        <HauseFeed mine={mine} looking={mine.lookingIds ?? []} />
      )}
    </div>
  );
}

function SeekSheet({
  initial,
  onSave,
  onCancel,
  allowCancel,
}: {
  initial: LookingId[];
  onSave: (ids: LookingId[]) => void;
  onCancel: () => void;
  allowCancel: boolean;
}) {
  const [picks, setPicks] = useState<LookingId[]>(initial);

  function toggle(id: LookingId) {
    setPicks((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
  }

  return (
    <div className="seek-overlay" role="presentation">
      <form
        className="seek-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seek-title"
        onSubmit={(event) => {
          event.preventDefault();
          if (!picks.length) return;
          onSave(picks);
        }}
      >
        <p className="kicker">The board</p>
        <h2 id="seek-title" className="font-poster mt-2 text-[2rem] leading-[0.9] font-extrabold uppercase">
          What should we show you?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Tap a few. Jobs, mentors, crews in those wavelengths show first. You can change this later.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {lookingChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="chip"
              aria-pressed={picks.includes(chip.id)}
              onClick={() => toggle(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="ctl ctl-save mt-6 h-12 w-full"
          disabled={!picks.length}
        >
          See the board
        </button>
        <button type="button" className="ctl-quiet mt-2 w-full" onClick={onCancel}>
          {allowCancel ? "Cancel" : "Skip for now"}
        </button>
      </form>
    </div>
  );
}

function MemberCell({
  member,
  isYou,
  onOpen,
}: {
  member: Member;
  isYou: boolean;
  onOpen: () => void;
}) {
  const tag = isYou ? "You" : member.id === ADMIN_ID ? "Host" : null;
  const fields = houseFields.filter((item) => member.fields?.includes(item.id));

  return (
    <button type="button" onClick={onOpen} className="member-cell w-full">
      <HouseAvatar name={member.name} photo={member.photo} size={58} />
      {tag ? <span className="member-cell-tag">{tag}</span> : null}
      <span className="member-cell-name">{member.name}</span>
      <span className="member-cell-role">{member.role}</span>
      <span className="member-cell-city">{member.city}</span>
      {fields.length ? (
        <span className="member-cell-fields">
          {fields.map((item) => item.label).join(" · ")}
        </span>
      ) : null}
      <SocialMarks links={socialLinks(member)} />
    </button>
  );
}

export function Me({
  mine,
  follow,
  onProfile,
  onOpen,
  forceForm,
  onSignOut,
}: {
  mine: Member | null;
  follow: string[];
  onProfile: (member: Member) => void;
  onOpen: (id: string) => void;
  forceForm?: boolean;
  onSignOut?: () => void;
}) {
  const [editing, setEditing] = useState(!mine || Boolean(forceForm));
  const kept = [
    ...(mine && follow.includes(mine.id) ? [mine] : []),
    ...houseMembers.filter((member) => follow.includes(member.id)),
  ].filter(
    (member, index, list) => list.findIndex((item) => item.id === member.id) === index,
  );

  if (!mine || editing) {
    return (
      <div className="mt-8">
        <p className="kicker">Your place</p>
        <h1 className="font-poster mt-2 text-[2.6rem] leading-[0.9] font-extrabold uppercase">
          Join the Hause
        </h1>
        <p className="mt-3 max-w-sm text-[15px] leading-6 text-muted">
          How you show up, what you can share, and what you’re growing toward.
        </p>
        <JoinForm
          initial={mine}
          onSave={(member) => {
            onProfile(member);
            setEditing(false);
          }}
          onCancel={mine ? () => setEditing(false) : undefined}
        />
      </div>
    );
  }

  return (
    <ProfilePage
      member={mine}
      mine={mine}
      kept={false}
      onKeep={() => undefined}
      onEdit={() => setEditing(true)}
      keptPeople={kept}
      onOpenKept={onOpen}
      onSignOut={onSignOut}
    />
  );
}

export function ProfilePage({
  member,
  mine,
  kept,
  onKeep,
  onEdit,
  onBack,
  keptPeople,
  onOpenKept,
  onSignOut,
}: {
  member: Member;
  mine: Member | null;
  kept: boolean;
  onKeep: () => void;
  onEdit?: () => void;
  onBack?: () => void;
  keptPeople?: Member[];
  onOpenKept?: (id: string) => void;
  onSignOut?: () => void;
}) {
  const isYou = mine?.id === member.id;
  const links = socialLinks(member);
  const offers = [
    ...(member.offerIds
      ?.map((id) => offerChips.find((chip) => chip.id === id)?.label)
      .filter((label): label is string => Boolean(label)) ?? []),
  ];
  const looking = [
    ...(member.lookingIds
      ?.map((id) => lookingChips.find((chip) => chip.id === id)?.label)
      .filter((label): label is string => Boolean(label)) ?? []),
  ];

  return (
    <div className="mt-8">
      {onBack && (
        <button type="button" className="ctl-quiet" onClick={onBack}>
          Back
        </button>
      )}
      <div className="mt-6 flex flex-col items-start">
        <HouseAvatar name={member.name} photo={member.photo} size={88} />
        <p className="kicker mt-5">{isYou ? "Your page" : "In the Hause"}</p>
        <h1 className="font-poster mt-2 text-[2.35rem] leading-[0.9] font-extrabold uppercase">
          {member.name}
        </h1>
        <p className="plan-tag" data-plan={planById(member.planId).id}>
          {planLabel(member.planId)}
        </p>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          {member.role}
          {member.id === ADMIN_ID ? " · host" : ""}
        </p>
        <p className="text-[15px] leading-6 text-muted">{member.city}</p>
        <SocialIconLinks links={links} />
      </div>
      <p className="mt-8 max-w-md text-[1.05rem] leading-7">{member.building}</p>

      {(offers.length || member.offer) ? (
        <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">
          <span className="font-semibold text-ink">Offers. </span>
          {[...offers, member.offer].filter(Boolean).join(" · ")}
        </p>
      ) : isYou ? (
        <p className="mt-6 text-sm leading-6 text-muted">
          Nothing listed yet — resources, intros, mentorship, hiring.
        </p>
      ) : null}

      {(looking.length || member.looking) ? (
        <p className="mt-2 max-w-md text-[15px] leading-7 text-muted">
          <span className="font-semibold text-ink">Looking for. </span>
          {[...looking, member.looking].filter(Boolean).join(" · ")}
        </p>
      ) : isYou ? (
        <p className="mt-2 text-sm leading-6 text-muted">
          Job, mentor, capital, or a crew — add it so the Hause can help.
        </p>
      ) : null}

      <div className="mt-8 flex max-w-sm flex-col gap-3">
        <a
          className="ctl ctl-save w-full"
          href={connectHref(member)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isYou ? "Your LinkedIn" : "Connect on LinkedIn"}
        </a>
        {!isYou && (
          <button
            type="button"
            className="ctl ctl-secondary w-full"
            aria-pressed={kept}
            onClick={onKeep}
          >
            {kept ? "Following" : "Follow"}
          </button>
        )}
        {isYou && onEdit && (
          <button type="button" className="ctl ctl-secondary w-full" onClick={onEdit}>
            Edit profile
          </button>
        )}
        {isYou && onSignOut && (
          <button type="button" className="ctl-quiet" onClick={onSignOut}>
            Sign out
          </button>
        )}
      </div>

      {!isYou && (
        <div className="mt-3">
          <IntroAsk member={member} />
        </div>
      )}

      {isYou && keptPeople && (
        <section className="mt-14">
          <p className="kicker">You follow</p>
          <h2 className="font-poster mt-1 text-2xl font-extrabold uppercase">
            Following
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            People you want to remember after the night. They live here on Me —
            not a chat.
          </p>
          {keptPeople.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-muted">
              Open someone from Tech Hause, then Follow.
            </p>
          ) : (
            <ul className="member-grid mt-5">
              {keptPeople.map((person) => (
                <li key={person.id}>
                  <MemberCell
                    member={person}
                    isYou={false}
                    onOpen={() => onOpenKept?.(person.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

function IntroAsk({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    setFlagged(readIntros().some((item) => item.toId === member.id));
  }, [member.id]);

  if (flagged) {
    return <span className="min-h-12 inline-flex items-center text-sm text-muted">Intro flagged</span>;
  }

  if (!open) {
    return (
      <button
        type="button"
        className="min-h-12 text-sm underline underline-offset-4"
        onClick={() => setOpen(true)}
      >
        Request intro
      </button>
    );
  }

  return (
    <form
      className="mt-2 w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const line = note.trim().slice(0, 120);
        if (!line) return;
        const rest = readIntros().filter((item) => item.toId !== member.id);
        writeIntros([
          ...rest,
          { toId: member.id, toName: member.name, note: line },
        ]);
        setFlagged(true);
      }}
    >
      <input
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="One line for the host"
        className="field"
      />
      <button type="submit" className="ctl ctl-save mt-2">
        Flag intro
      </button>
    </form>
  );
}

function readPhoto(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/") || file.size > 4_000_000) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const image = new window.Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 320 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
}

export function JoinForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Member | null;
  onSave: (member: Member) => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "Builder");
  const [building, setBuilding] = useState(initial?.building ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [instagram, setInstagram] = useState(initial?.socials?.instagram ?? "");
  const [x, setX] = useState(initial?.socials?.x ?? "");
  const [github, setGithub] = useState(initial?.socials?.github ?? "");
  const [site, setSite] = useState(initial?.socials?.site ?? "");
  const [offerIds, setOfferIds] = useState<OfferId[]>(initial?.offerIds ?? []);
  const [lookingIds, setLookingIds] = useState<LookingId[]>(
    initial?.lookingIds ?? [],
  );
  const [offer, setOffer] = useState(initial?.offer ?? "");
  const [looking, setLooking] = useState(initial?.looking ?? "");
  const [matchPool, setMatchPool] = useState(Boolean(initial?.matchPool));
  const [photo, setPhoto] = useState(initial?.photo ?? "");
  const [error, setError] = useState("");
  const [step, setStep] = useState(initial ? 2 : 1);
  const signup = !initial;

  function toggleOffer(id: OfferId) {
    setOfferIds((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
  }

  function toggleLooking(id: LookingId) {
    setLookingIds((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
  }

  function saveMember() {
    const demo = isDemoWalk();
    const linked = normalizeLinkedIn(link) || (demo ? "https://www.linkedin.com/in/demo" : "");
    if (!demo && !linked) {
      setError("A LinkedIn URL is required.");
      return false;
    }
    if (!demo && (!name.trim() || !city.trim())) {
      setError("Name and city are required.");
      return false;
    }
    const member: Member = {
      id: initial?.id ?? "you",
      name: name.trim() || "Demo",
      role: role.trim() || "Builder",
      building: building.trim() || "In the Hause",
      city: city.trim() || "Laurel",
      link: linked || "https://www.linkedin.com/in/demo",
      interests: initial?.interests ?? readIntents(),
      offerIds,
      lookingIds,
      offer: offer.trim() || undefined,
      looking: looking.trim() || undefined,
      matchPool,
      photo: photo || undefined,
      socials: {
        instagram: normalizeHandle(instagram, "instagram") ?? undefined,
        x: normalizeHandle(x, "x") ?? undefined,
        github: normalizeHandle(github, "github") ?? undefined,
        site: normalizeHandle(site, "site") ?? undefined,
      },
    };
    writeProfile(member);
    onSave(member);
    return true;
  }

  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (signup && step === 1) {
          const linked = normalizeLinkedIn(link);
          if (!isDemoWalk() && (!name.trim() || !city.trim() || !linked)) {
            setError("Name, city, and LinkedIn get you in.");
            return;
          }
          setError("");
          setStep(2);
          return;
        }
        saveMember();
      }}
    >
      {signup ? (
        <p className="kicker">Step {step} of 2</p>
      ) : (
        <p className="text-sm font-semibold">Edit your profile</p>
      )}
      {signup && step === 1 ? (
        <p className="text-sm leading-6 text-muted">
          Name, where you are, LinkedIn. That’s the account. You can add more
          next.
        </p>
      ) : (
        <p className="text-sm leading-6 text-muted">
          What you can share and what you’re growing toward. Skip anything you
          don’t know yet.
        </p>
      )}
      {(!signup || step === 1) && (
        <>
      <input
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        className="field"
      />
      <p className="kicker mt-1">Photo</p>
      <div className="flex items-center gap-4">
        <HouseAvatar name={name || "S"} photo={photo || undefined} size={64} />
        <div className="flex flex-col gap-2">
          <label className="ctl ctl-secondary inline-flex cursor-pointer">
            Add a photo
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                void readPhoto(file).then((data) => {
                  if (data) setPhoto(data);
                  else setError("Use a smaller photo (under 4MB).");
                });
              }}
            />
          </label>
          {photo ? (
            <button
              type="button"
              className="ctl-quiet text-left"
              onClick={() => setPhoto("")}
            >
              Keep the house mark
            </button>
          ) : (
            <p className="text-sm text-muted">Optional. Default is your initial.</p>
          )}
        </div>
      </div>
      <p className="kicker mt-1">How you show up</p>
      <div className="flex flex-wrap gap-2">
        {roles.map((item) => (
          <button
            key={item.id}
            type="button"
            className="chip"
            aria-pressed={role === item.id}
            onClick={() => setRole(item.id)}
          >
            {item.id}
          </button>
        ))}
      </div>
      <input
        required
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Laurel, MD"
        className="field"
      />
      <input
        required
        value={link}
        onChange={(event) => setLink(event.target.value)}
        placeholder="linkedin.com/in/you"
        className="field"
      />
        </>
      )}
      {(!signup || step === 2) && (
        <>
      <input
        value={building}
        onChange={(event) => setBuilding(event.target.value)}
        placeholder="What you’re building or learning"
        className="field"
      />
      <p className="kicker mt-2">Optional handles</p>
      <input
        value={instagram}
        onChange={(event) => setInstagram(event.target.value)}
        placeholder="Instagram @ or URL"
        className="field"
      />
      <input
        value={x}
        onChange={(event) => setX(event.target.value)}
        placeholder="X / Twitter @ or URL"
        className="field"
      />
      <input
        value={github}
        onChange={(event) => setGithub(event.target.value)}
        placeholder="GitHub @ or URL"
        className="field"
      />
      <input
        value={site}
        onChange={(event) => setSite(event.target.value)}
        placeholder="Personal site"
        className="field"
      />
      <p className="kicker mt-2">I can offer</p>
      <div className="flex flex-wrap gap-2">
        {offerChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            aria-pressed={offerIds.includes(chip.id)}
            onClick={() => toggleOffer(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <input
        value={offer}
        onChange={(event) => setOffer(event.target.value)}
        placeholder="Optional one-liner"
        className="field"
      />
      <p className="kicker mt-2">I’m looking for</p>
      <div className="flex flex-wrap gap-2">
        {lookingChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            aria-pressed={lookingIds.includes(chip.id)}
            onClick={() => toggleLooking(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <input
        value={looking}
        onChange={(event) => setLooking(event.target.value)}
        placeholder="Optional one-liner"
        className="field"
      />
        </>
      )}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {(!signup || step === 2) && (
        <>
      <p className="text-sm leading-6 text-muted">{CONSENT}</p>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          className="mt-1"
          checked={matchPool}
          onChange={(event) => setMatchPool(event.target.checked)}
        />
        <span>
          Suggest me when someone is looking for what I offer. Off unless you
          check this. Same-quest people can still see overlap. Still no DMs.
        </span>
      </label>
        </>
      )}
      <div className="flex flex-col gap-2">
        <button type="submit" className="ctl ctl-save w-full">
          {signup
            ? step === 1
              ? "Continue"
              : "Enter"
            : "Save profile"}
        </button>
        {signup && step === 2 && (
          <button type="button" className="ctl-quiet" onClick={() => setStep(1)}>
            Back
          </button>
        )}
        {onCancel && (
          <button type="button" className="ctl" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export function Insights() {
  const [copied, setCopied] = useState(false);
  const [rsvp, setRsvp] = useState<string[]>([]);
  const [going, setGoing] = useState<ReturnType<typeof readGoing>>([]);
  const [intents, setIntents] = useState<ReturnType<typeof readIntents>>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [intros, setIntros] = useState<Intro[]>([]);
  const [mine, setMine] = useState<Member | null>(null);

  useEffect(() => {
    setRsvp(readRsvp());
    setGoing(readGoing());
    setIntents(readIntents());
    setPulses(readPulses());
    setIntros(readIntros());
    setMine(readProfile());
  }, []);
  const night = events[0];
  const pulse: Pulse[] = pulses.filter((item) => item.eventId === night?.id);

  const goingHere = going.filter((person) => person.eventId === night?.id);
  const guestCount = Math.max(goingHere.length, rsvp.length, mine ? 1 : 0);
  const people = mine ? [mine] : [];

  const transitioning = people.filter(
    (member) => member.role === "Transitioning",
  ).length;
  const lookingInvestors = people.filter((member) =>
    member.lookingIds?.includes("investor"),
  ).length;
  const hiringDevs = people.filter(
    (member) =>
      member.offerIds?.includes("hiring-dev") ||
      member.lookingIds?.includes("dev-job"),
  ).length;
  const car = intents.includes("car") ? 1 : 0;

  const pitch = [
    mixLine(transitioning, "transitioning into tech"),
    mixLine(lookingInvestors, "looking for investors"),
    mixLine(hiringDevs, "hiring / looking for developers"),
    pitchLine(car, guestCount, "a vehicle"),
  ]
    .filter(Boolean)
    .join(" ");

  const again = pulse.filter((item) => item.again === true).length;
  const great = pulse.filter((item) => item.room === "great").length;

  async function copyPitch() {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8">
      <p className="kicker">For hosts</p>
      <h1 className="font-poster mt-2 text-[2.6rem] leading-[0.9] font-extrabold uppercase">
        House notes
      </h1>
      <p className="mt-3 max-w-sm text-[15px] leading-6 text-muted">
        Opt-in counts from this Hause. Prototype is on-device — never a sold
        list.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-3">
        <Stat label="RSVPs" value={rsvp.length} />
        <Stat label="I’ll be there" value={goingHere.length} />
        <Stat label="In the house" value={people.length} />
      </dl>

      <section className="panel mt-8 px-4 py-4">
        <p className="kicker">Sponsor pitch</p>
        <p className="mt-2 text-[15px] leading-6 text-ink">{pitch}</p>
        <p className="mt-2 text-sm text-muted">
          Come again: {pulse.length ? `${again}/${pulse.length}` : "—"}
          {great ? ` · ${great} great` : ""}
        </p>
        <button type="button" className="ctl ctl-save mt-4" onClick={copyPitch}>
          {copied ? "Copied" : "Copy pitch"}
        </button>
      </section>

      {intros.length > 0 && (
        <section className="mt-8">
          <p className="kicker">Intro asks</p>
          <ul className="mt-3 space-y-2">
            {intros.map((item) => (
              <li key={item.toId} className="text-sm leading-6">
                <span className="font-semibold">{item.toName}. </span>
                {item.note}
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-6 text-sm leading-6 text-muted">{CONSENT}</p>
    </div>
  );
}

function MarketCard() {
  const [picks, setPicks] = useState<InterestId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromStore = readIntents();
    const fromProfile = readProfile()?.interests ?? [];
    setPicks(fromStore.length ? fromStore : fromProfile);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeIntents(picks);
    const mine = readProfile();
    if (mine) writeProfile({ ...mine, interests: picks });
  }, [picks, hydrated]);

  return (
    <section className="mt-8">
      <h2 className="font-poster text-2xl font-extrabold uppercase">
        In the market for?
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{CONSENT}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {interestChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            aria-pressed={picks.includes(chip.id)}
            onClick={() =>
              setPicks((list) =>
                list.includes(chip.id)
                  ? list.filter((item) => item !== chip.id)
                  : [...list, chip.id],
              )
            }
          >
            {chip.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="panel px-4 py-3">
      <dt className="kicker">{label}</dt>
      <dd className="font-poster mt-1 text-3xl font-extrabold">{value}</dd>
    </div>
  );
}
