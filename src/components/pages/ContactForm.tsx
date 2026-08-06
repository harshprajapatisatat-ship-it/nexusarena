"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

const TOPICS = [
  "Player Support",
  "Bug Report",
  "Refund Request",
  "Press Enquiry",
  "Partnership",
  "Accessibility Issue",
  "Something else",
];

interface Errors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Tell us what to call you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.topic) next.topic = "Pick a topic so we can route this.";
    if (values.message.trim().length < 20)
      next.message = "Give us at least 20 characters of detail.";
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and SR users land on it.
      const firstKey = Object.keys(found)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setState("sending");
    // Demo only — no endpoint is wired up behind this form.
    setTimeout(() => setState("done"), 1000);
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        role="status"
        className="clip-corner rounded-xl border border-neon-lime/40 bg-neon-lime/8 p-8 text-center sm:p-12"
      >
        <CheckCircle2 size={38} className="mx-auto text-neon-lime" aria-hidden />
        <h3 className="mt-5 font-display text-xl font-bold text-ink">Message received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-dim">
          Thanks, {values.name.split(" ")[0]}. A {values.topic.toLowerCase()} specialist will reply
          to <strong className="text-neon-lime">{values.email}</strong> — usually well inside two
          hours.
        </p>
        <p className="mt-4 text-xs text-ink-faint">
          This is a demo form, so nothing was actually sent.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", topic: "", message: "" });
            setState("idle");
          }}
          className="mt-7 rounded-lg border border-white/12 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ink-dim transition-colors hover:border-neon-lime/50 hover:text-ink"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  const fieldBase =
    "w-full rounded-lg border bg-carbon px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint";

  function fieldClass(hasError: boolean) {
    return `${fieldBase} ${
      hasError
        ? "border-neon-pink/70 focus:ring-2 focus:ring-neon-pink/35"
        : "border-white/10 focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/25"
    }`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink-dim"
          >
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            placeholder="Alex Rivera"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-neon-pink">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink-dim"
          >
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-neon-pink">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label
          htmlFor="contact-topic"
          className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink-dim"
        >
          Topic
        </label>
        <select
          id="contact-topic"
          value={values.topic}
          onChange={(e) => set("topic", e.target.value)}
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "contact-topic-error" : undefined}
          className={`${fieldClass(!!errors.topic)} ${values.topic ? "" : "text-ink-faint"}`}
        >
          <option value="" className="bg-carbon">
            Select a topic…
          </option>
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-carbon text-ink">
              {t}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="contact-topic-error" role="alert" className="mt-1.5 text-xs text-neon-pink">
            {errors.topic}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink-dim"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Give us the details — reproduction steps, order IDs, or match IDs all help."
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : "contact-message-hint"
          }
          className={`${fieldClass(!!errors.message)} resize-y`}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-neon-pink">
            {errors.message}
          </p>
        ) : (
          <p id="contact-message-hint" className="mt-1.5 text-xs text-ink-faint">
            {values.message.trim().length} characters — 20 minimum.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(100deg,#00e5ff,#7c3aed_55%,#ff2e88)] bg-[length:200%_auto] px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-void transition-all duration-500 hover:bg-[position:100%_center] hover:shadow-[0_0_34px_-8px_rgba(255,46,136,0.85)] disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        <p className="text-xs text-ink-faint">
          We reply to every message. No auto-close, no ticket black holes.
        </p>
      </div>
    </form>
  );
}
