"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { burst } from "./confetti";

// Web3Forms emails submissions to you for free, with no server of our own.
// Get an access key at https://web3forms.com and set NEXT_PUBLIC_WEB3FORMS_KEY.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please enter your name.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (String(data.get("message") ?? "").trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
}

const inputClass =
  "mt-2 block w-full rounded-xl border-[2.5px] bg-background px-4 py-3 text-base outline-none transition-[box-shadow,transform] duration-200 placeholder:text-muted-foreground/70 focus:-translate-y-0.5 focus:shadow-[4px_4px_0_var(--pink)]";

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    if (!ACCESS_KEY) {
      // No key configured yet: fall back to the visitor's mail client.
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `Portfolio enquiry from ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      const r = form.getBoundingClientRect();
      burst(r.left + r.width / 2, Math.min(r.bottom - 60, window.innerHeight * 0.6), 30);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = (name: keyof Errors) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? "border-destructive" : "border-line"}`,
  });

  const errorText = (name: keyof Errors) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[name]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: bots fill it, people never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-bold">Name</label>
          <input type="text" autoComplete="name" placeholder="Jane Doe" {...field("name")} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-bold">Email</label>
          <input type="email" autoComplete="email" placeholder="jane@company.com" {...field("email")} />
          {errorText("email")}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-bold">Message</label>
        <textarea rows={5} placeholder="Tell me about the role or project..." {...field("message")} />
        {errorText("message")}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-pink"
        >
          {status === "sending" ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        <div aria-live="polite" className="text-sm">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p key="sent" initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 14 }} className="inline-flex items-center gap-1.5 font-bold text-accent">
                <CircleCheck className="size-4" aria-hidden="true" /> Thanks! I&apos;ll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p key="error" initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 14 }} className="inline-flex items-center gap-1.5 text-destructive">
                <CircleAlert className="size-4" aria-hidden="true" /> Something went wrong. Email me at{" "}
                <a href={`mailto:${fallbackEmail}`} className="underline">{fallbackEmail}</a>.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
