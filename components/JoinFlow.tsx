"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HouseAvatar } from "@/components/HouseAvatar";
import { roleGroups } from "@/lib/events";
import { normalizeLinkedIn, type Member } from "@/lib/members";
import { readIntents, writeProfile } from "@/lib/prefs";

type Step = "path" | "name" | "city" | "link" | "role" | "photo" | "welcome";

const ONBOARD: Step[] = ["name", "city", "link", "role", "photo"];
const ARRIVAL: Step[] = [...ONBOARD, "welcome"];

const LABELS: Record<Step, string> = {
  path: "Join",
  name: "You",
  city: "City",
  link: "Account",
  role: "Role",
  photo: "Face",
  welcome: "In",
};

const COPY: Record<Exclude<Step, "path" | "welcome">, { ask: string; hint: string; placeholder: string }> = {
  name: {
    ask: "What should we call you?",
    hint: "First name is enough. This is how you show up.",
    placeholder: "Your name",
  },
  city: {
    ask: "Where are you based?",
    hint: "City is enough. People find each other by place.",
    placeholder: "Laurel, MD",
  },
  link: {
    ask: "How do people find you?",
    hint: "LinkedIn keeps the room real. Paste the URL.",
    placeholder: "linkedin.com/in/you",
  },
  role: {
    ask: "How do you show up?",
    hint: "Pick the closest. You can change it later.",
    placeholder: "",
  },
  photo: {
    ask: "Add a face?",
    hint: "Optional. People recognize you faster with one.",
    placeholder: "",
  },
};

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

function firstName(value: string) {
  return value.trim().split(/\s+/)[0] || "there";
}

export function JoinFlow({
  brand,
  start = "path",
  demo = false,
  onSave,
  onDemoNew,
  onDemoExisting,
}: {
  brand: ReactNode;
  start?: Step;
  demo?: boolean;
  onSave: (member: Member) => void;
  onDemoNew?: () => void;
  onDemoExisting?: () => void;
}) {
  const [step, setStep] = useState<Step>(start === "name" ? "name" : start);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [link, setLink] = useState("");
  const [role, setRole] = useState("Builder");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(demo);
  const [ready, setReady] = useState<Member | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onboardIndex = ONBOARD.indexOf(step);
  const arrivalIndex = ARRIVAL.indexOf(step);
  const copy = step === "path" || step === "welcome" ? null : COPY[step];

  useEffect(() => {
    setStep(start === "name" ? "name" : start);
  }, [start]);

  useEffect(() => {
    setSkip(demo);
  }, [demo]);

  useEffect(() => {
    setError("");
    inputRef.current?.focus();
  }, [step]);

  function memberFromForm(nextPhoto = photo): Member | null {
    const linked = normalizeLinkedIn(link) || (skip ? "https://www.linkedin.com/in/demo" : "");
    if (!skip && (!linked || !name.trim() || !city.trim())) {
      setError("Name, city, and LinkedIn get you in.");
      setStep(!name.trim() ? "name" : !city.trim() ? "city" : "link");
      return null;
    }
    return {
      id: "you",
      name: name.trim() || "Demo",
      role: role.trim() || "Builder",
      building: "In the Hause",
      city: city.trim() || "Laurel",
      link: linked || "https://www.linkedin.com/in/demo",
      interests: readIntents(),
      photo: nextPhoto || undefined,
      planId: "member",
      status: "approved",
    };
  }

  function finish(nextPhoto = photo) {
    const member = memberFromForm(nextPhoto);
    if (!member) return;
    writeProfile(member);
    setReady(member);
    setStep("welcome");
  }

  function enter() {
    if (!ready) return;
    onSave(ready);
  }

  function next() {
    if (!skip) {
      if (step === "name" && !name.trim()) {
        setError("Add your name to continue.");
        return;
      }
      if (step === "city" && !city.trim()) {
        setError("Add a city to continue.");
        return;
      }
      if (step === "link" && !normalizeLinkedIn(link)) {
        setError("A LinkedIn URL gets you in.");
        return;
      }
    }
    setError("");
    if (step === "photo") {
      finish();
      return;
    }
    if (step === "path") {
      setStep("name");
      return;
    }
    setStep(ONBOARD[Math.max(0, onboardIndex) + 1]);
  }

  const count = LABELS[step];
  const progress = arrivalIndex < 0 ? 0 : (arrivalIndex + 1) / ARRIVAL.length;

  return (
    <div className="join-flow">
      <header className="join-flow-bar">
        {brand}
        <div className="join-flow-bar-end">
          <Link href="/" className="join-flow-home">
            Home
          </Link>
          <p className="join-flow-count">{count}</p>
        </div>
      </header>
      {step !== "path" ? (
        <div className="join-flow-progress" aria-hidden="true">
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      ) : null}

      <form
        className="join-flow-stage"
        onSubmit={(event) => {
          event.preventDefault();
          if (step === "welcome") return;
          next();
        }}
      >
        <p className="join-flow-kicker">Tech Hause</p>

        {step === "path" ? (
          <>
            <h1 className="join-flow-ask">Join the house</h1>
            <p className="join-flow-hint">New here, or do you already have a place on this device?</p>
            <div className="join-flow-roles">
              <button type="button" className="join-flow-role" onClick={() => setStep("name")}>
                I’m new
              </button>
              <button
                type="button"
                className="join-flow-role"
                onClick={() =>
                  setError("This device doesn’t have you yet. Join as new, or use Test existing user.")
                }
              >
                I have a place
              </button>
            </div>
          </>
        ) : null}

        {copy ? (
          <>
            <h1 className="join-flow-ask">{copy.ask}</h1>
            <p className="join-flow-hint">{copy.hint}</p>
          </>
        ) : null}

        {step === "welcome" ? (
          <>
            <h1 className="join-flow-ask">You’re in, {firstName(ready?.name || name)}.</h1>
            <p className="join-flow-hint">People can find you. Open a name after the night.</p>
            <div className="join-flow-doors">
              <button type="button" className="join-flow-door" onClick={() => enter()}>
                <strong>See the house</strong>
                <span>Names, faces, LinkedIn</span>
              </button>
            </div>
          </>
        ) : null}

        {step === "name" ? (
          <input
            ref={inputRef}
            className="join-flow-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy?.placeholder}
            autoComplete="name"
            autoCapitalize="words"
          />
        ) : null}

        {step === "city" ? (
          <input
            ref={inputRef}
            className="join-flow-input"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder={copy?.placeholder}
            autoComplete="address-level2"
          />
        ) : null}

        {step === "link" ? (
          <input
            ref={inputRef}
            className="join-flow-input"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder={copy?.placeholder}
            autoComplete="url"
            inputMode="url"
          />
        ) : null}

        {step === "role" ? (
          <div className="join-flow-role-groups">
            {roleGroups.map((group) => (
              <div key={group.label} className="join-flow-role-group">
                <p className="join-flow-role-label">{group.label}</p>
                <div className="join-flow-roles" role="listbox" aria-label={group.label}>
                  {group.roles.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={role === item.id}
                      className="join-flow-role"
                      onClick={() => {
                        setRole(item.id);
                        setError("");
                        setStep("photo");
                      }}
                    >
                      {item.id}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {step === "photo" ? (
          <div className="join-flow-photo">
            <HouseAvatar name={name || "S"} photo={photo || undefined} size={88} />
            <label className="join-flow-text">
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
          </div>
        ) : null}

        {error ? <p className="join-flow-error">{error}</p> : null}

        {step !== "path" && step !== "role" && step !== "welcome" ? (
          <button type="submit" className="join-flow-ok">
            {step === "photo" ? (photo ? "Enter" : "Continue") : "OK"}
            <span aria-hidden="true"> ↵</span>
          </button>
        ) : null}

        {step === "photo" ? (
          <button type="button" className="join-flow-text" onClick={() => finish("")}>
            Skip for now
          </button>
        ) : null}

        {step !== "path" && step !== "welcome" ? (
          <button
            type="button"
            className="join-flow-text"
            onClick={() => {
              if (onboardIndex > 0) setStep(ONBOARD[onboardIndex - 1]);
              else setStep("path");
            }}
          >
            Back
          </button>
        ) : null}

        <div className="join-flow-demo">
          {onDemoNew ? (
            <button
              type="button"
              className="join-flow-text"
              onClick={() => {
                setSkip(true);
                setStep("name");
                onDemoNew();
              }}
            >
              Test new user
            </button>
          ) : null}
          {onDemoExisting ? (
            <button type="button" className="join-flow-text" onClick={onDemoExisting}>
              Test existing user
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
