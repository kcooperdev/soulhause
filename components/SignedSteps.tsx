"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";

type Answers = Record<string, string>;

type ChoiceStep = {
  id: string;
  kind: "choice";
  question: string;
  groupLabel: string;
  empty: string;
  options: string[] | ((answers: Answers) => string[]);
  clears?: string[];
  when?: (answers: Answers) => boolean;
};

type TextStep = {
  id: string;
  kind: "text" | "long";
  question: string;
  hint?: string;
  empty: string;
  optional?: boolean;
  inputType?: "text" | "email";
  autoComplete?: string;
  validate?: (value: string) => string;
  when?: (answers: Answers) => boolean;
};

type SignStep = {
  id: "sign";
  kind: "sign";
  question: string;
  agreement: (answers: Answers) => string;
  when?: (answers: Answers) => boolean;
};

type AgreeStep = {
  id: string;
  kind: "agree";
  question: string;
  label: string;
  when?: (answers: Answers) => boolean;
};

type BookStep = {
  id: string;
  kind: "book";
  question: string;
  detail: string;
  href?: string;
  when?: (answers: Answers) => boolean;
};

export type SignedStep = ChoiceStep | TextStep | SignStep | AgreeStep | BookStep;

type FinishCopy = {
  kicker: string | ((answers: Answers) => string);
  title: string | ((answers: Answers) => string);
  detail: string | ((answers: Answers) => string);
};

function line(value: string | ((answers: Answers) => string), answers: Answers) {
  return typeof value === "function" ? value(answers) : value;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignedSteps({
  formId,
  kicker,
  steps,
  summary,
  finish,
}: {
  formId: string;
  kicker: string;
  steps: SignedStep[];
  summary: (answers: Answers, signedOn: string) => [string, string][];
  finish?: FinishCopy;
}) {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [signature, setSignature] = useState("");
  const [signedOn, setSignedOn] = useState("");
  const [doneKind, setDoneKind] = useState<"" | "sign" | "agree" | "book">("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moved = useRef(false);
  const ink = useRef(false);
  const drawing = useRef(false);

  function visible(current: Answers) {
    return steps.filter((step) => !step.when || step.when(current));
  }

  const list = visible(answers);
  const step = list[Math.min(index, list.length - 1)];
  const bookHref = steps.find((item): item is BookStep => item.kind === "book" && Boolean(item.href))?.href;

  useEffect(() => {
    if (!moved.current) return;
    titleRef.current?.focus();
  }, [index, done]);

  useEffect(() => {
    if (step?.kind !== "sign" || done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.parentElement?.clientWidth ?? 320;
    const height = 180;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ink.current = false;
  }, [step, done]);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function drawTo(event: PointerEvent<HTMLCanvasElement>) {
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx) return;
    const next = point(event);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    ink.current = true;
  }

  function onPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    const ctx = event.currentTarget.getContext("2d");
    const start = point(event);
    ctx?.beginPath();
    ctx?.moveTo(start.x, start.y);
  }

  function onPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    drawTo(event);
  }

  function onPointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    drawTo(event);
    drawing.current = false;
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ink.current = false;
    setError("");
  }

  function problem(current: SignedStep, currentAnswers: Answers) {
    if (current.kind === "choice" && !currentAnswers[current.id]) return current.empty;
    if (current.kind === "text" || current.kind === "long") {
      const value = (currentAnswers[current.id] ?? "").trim();
      if (!value) return current.optional ? "" : current.empty;
      if (current.inputType === "email" && !emailPattern.test(value)) {
        return "Enter an email address like name@email.com.";
      }
      return current.validate?.(value) ?? "";
    }
    if (current.kind === "agree" && currentAnswers[current.id] !== "yes") return "Check this to finish.";
    if (current.kind === "book") return "";
    if (current.kind === "sign") {
      if (!ink.current) return "Draw your signature.";
      if (!(currentAnswers.signedName ?? "").trim()) return "Type your full name under the signature.";
    }
    return "";
  }

  function go(nextIndex: number) {
    moved.current = true;
    setError("");
    setIndex(nextIndex);
  }

  function choose(value: string) {
    if (step.kind !== "choice") return;
    const next = { ...answers, [step.id]: value };
    for (const key of step.clears ?? []) delete next[key];
    const at = visible(next).findIndex((item) => item.id === step.id);
    setAnswers(next);
    go(at + 1);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = problem(step, answers);
    if (message) {
      setError(message);
      return;
    }
    if (step.kind === "sign" || step.kind === "agree" || step.kind === "book") {
      if (step.kind === "sign") setSignature(canvasRef.current?.toDataURL("image/png") ?? "");
      setDoneKind(step.kind);
      setSignedOn(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
      moved.current = true;
      setDone(true);
      return;
    }
    go(index + 1);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setError("");
    setDone(false);
    setSignature("");
    setSignedOn("");
    setDoneKind("");
    ink.current = false;
    moved.current = true;
  }

  if (done) {
    return (
      <section className="form-card" id={formId} aria-labelledby={`${formId}-done`}>
        <p className="kicker">{finish ? line(finish.kicker, answers) : "Signed"}</p>
        <h2 id={`${formId}-done`} tabIndex={-1} ref={titleRef}>
          {finish ? line(finish.title, answers) : "You're signed up."}
        </h2>
        <p className="form-status" role="status">
          {finish ? line(finish.detail, answers) : "No call and no approval. This page does not take payment."}
        </p>
        <dl className="facts">
          {summary(answers, signedOn).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {signature ? <img className="sign-preview" src={signature} alt="Signature you drew" /> : null}
        {doneKind === "book" && bookHref ? (
          <a className="btn coral" href={bookHref} target="_blank" rel="noreferrer">
            Book a call
          </a>
        ) : null}
        <button className="btn white" type="button" onClick={restart}>
          Start over
        </button>
      </section>
    );
  }

  const options = step.kind === "choice" ? (typeof step.options === "function" ? step.options(answers) : step.options) : [];
  const inputId = `${formId}-${step.id}`;

  return (
    <form className="form-card signed-steps" id={formId} onSubmit={onSubmit} noValidate>
      <p className="kicker">{kicker}</p>
      <div
        className="step-progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={list.length}
        aria-valuenow={index + 1}
        aria-label={`Question ${index + 1} of ${list.length}`}
      >
        <span style={{ width: `${((index + 1) / list.length) * 100}%` }} />
      </div>
      <p className="step-count">
        {index + 1} of {list.length}
      </p>
      <h2 id={`${formId}-title`} tabIndex={-1} ref={titleRef}>
        {step.question}
      </h2>
      {"hint" in step && step.hint ? <p>{step.hint}</p> : null}
      {step.kind === "sign" ? <p className="agreement">{step.agreement(answers)}</p> : null}
      {step.kind === "book" ? <p>{step.detail}</p> : null}

      {step.kind === "choice" ? (
        <div className="picks" role="group" aria-label={step.groupLabel}>
          {options.map((option) => (
            <button className="pick" type="button" key={option} onClick={() => choose(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {step.kind === "text" ? (
        <label htmlFor={inputId}>
          <span className="sr-only">{step.question}</span>
          <input
            id={inputId}
            name={step.id}
            type={step.inputType ?? "text"}
            autoComplete={step.autoComplete}
            value={answers[step.id] ?? ""}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${formId}-error` : undefined}
            onChange={(event) => setAnswers((prev) => ({ ...prev, [step.id]: event.target.value }))}
          />
        </label>
      ) : null}

      {step.kind === "long" ? (
        <label htmlFor={inputId}>
          <span className="sr-only">{step.question}</span>
          <textarea
            id={inputId}
            name={step.id}
            value={answers[step.id] ?? ""}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${formId}-error` : undefined}
            onChange={(event) => setAnswers((prev) => ({ ...prev, [step.id]: event.target.value }))}
          />
        </label>
      ) : null}

      {step.kind === "agree" ? (
        <label className="check">
          <input
            type="checkbox"
            checked={answers[step.id] === "yes"}
            onChange={(event) => setAnswers((prev) => ({ ...prev, [step.id]: event.target.checked ? "yes" : "" }))}
          />
          <span>{step.label}</span>
        </label>
      ) : null}

      {step.kind === "sign" ? (
        <div className="sign-block">
          <p id={`${formId}-sign-hint`}>Draw with a finger or a mouse.</p>
          <canvas
            ref={canvasRef}
            className="sign-pad"
            aria-label="Draw your signature"
            aria-describedby={`${formId}-sign-hint`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          <button className="btn white" type="button" onClick={clearSignature}>
            Clear signature
          </button>
          <label htmlFor={`${formId}-signed-name`}>
            Type your full name
            <input
              id={`${formId}-signed-name`}
              name="signedName"
              autoComplete="name"
              value={answers.signedName ?? ""}
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={error ? `${formId}-error` : undefined}
              onChange={(event) => setAnswers((prev) => ({ ...prev, signedName: event.target.value }))}
            />
          </label>
        </div>
      ) : null}

      {error ? (
        <p className="field-error" id={`${formId}-error`} role="alert">
          {error}
        </p>
      ) : null}

      <div className="actions">
        {index > 0 ? (
          <button className="btn white" type="button" onClick={() => go(index - 1)}>
            Back
          </button>
        ) : null}
        {step.kind !== "choice" && "optional" in step && step.optional ? (
          <button
            className="btn white"
            type="button"
            onClick={() => {
              setAnswers((prev) => ({ ...prev, [step.id]: "" }));
              go(index + 1);
            }}
          >
            Skip
          </button>
        ) : null}
        {step.kind === "book" && step.href ? (
          <a
            className="btn coral"
            href={step.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              setDoneKind("book");
              setSignedOn(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
              moved.current = true;
              setDone(true);
            }}
          >
            Book a call
          </a>
        ) : step.kind !== "choice" ? (
          <button className="btn coral" type="submit">
            {step.kind === "sign" ? "Sign and finish" : step.kind === "agree" ? "Agree and finish" : step.kind === "book" ? "Finish" : "Next"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
