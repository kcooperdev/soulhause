"use client";

import { useState, type FormEvent } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

export function InquiryForm({
  id,
  legend,
  fields,
  submitLabel,
}: {
  id: string;
  legend: string;
  fields: Field[];
  submitLabel: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blocked, setBlocked] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (field.required && !value) next[field.name] = "Add this before sending.";
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field.name] = "Enter an email address like name@email.com.";
      }
    }
    setErrors(next);
    setBlocked(Object.keys(next).length === 0);
  }

  return (
    <form className="form-card" id={id} onSubmit={onSubmit} noValidate>
      <h2>{legend}</h2>
      {fields.map((field) => {
        const error = errors[field.name];
        const shared = {
          id: `${id}-${field.name}`,
          name: field.name,
          required: field.required,
          "aria-invalid": Boolean(error) || undefined,
          "aria-describedby": error ? `${id}-${field.name}-error` : undefined,
        };
        return (
          <label key={field.name} htmlFor={shared.id}>
            {field.label}
            {field.required ? " *" : ""}
            {field.type === "textarea" ? (
              <textarea {...shared} />
            ) : field.type === "select" ? (
              <select {...shared} defaultValue="">
                <option value="">Choose one</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input {...shared} type={field.type ?? "text"} />
            )}
            {error ? (
              <span className="field-error" id={`${id}-${field.name}-error`}>
                {error}
              </span>
            ) : null}
          </label>
        );
      })}
      <button className="btn" type="submit">
        {submitLabel}
      </button>
      {blocked ? (
        <p className="form-status" role="status">
          This form isn’t connected yet, so nothing was sent. Your answers stayed in the browser.
        </p>
      ) : null}
      {Object.keys(errors).length > 0 ? (
        <p className="field-error" role="alert">
          Check the fields marked above.
        </p>
      ) : null}
    </form>
  );
}
