"use client";

import { useState, type FormEvent } from "react";
import {
  contactSchema,
  SERVICES,
  BUDGETS,
  SOURCES,
  type ContactInput,
} from "@/lib/validation";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Grecaptcha = {
  ready: (key: string) => Promise<void>;
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

const CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "AE +971" },
  { code: "+65", label: "SG +65" },
];

type Errors = Partial<Record<keyof ContactInput, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: ContactInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  services: [],
  budget: "",
  message: "",
  source: "",
  recaptchaToken: "",
};

const fieldCls =
  "w-full rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 text-ice placeholder:text-silver/50 transition-colors focus:border-blue focus:outline-none";

export default function ContactPage() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [country, setCountry] = useState("+91");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  function set<K extends keyof ContactInput>(k: K, v: ContactInput[K]) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  function toggleService(s: string) {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  }

  function onPhoneChange(digits: string) {
    const cleaned = digits.replace(/\D/g, "");
    setPhoneDigits(cleaned);
    set("phone", (country + cleaned) as ContactInput["phone"]);
  }

  function onCountryChange(code: string) {
    setCountry(code);
    if (phoneDigits) {
      set("phone", (code + phoneDigits) as ContactInput["phone"]);
    }
  }

  async function getRecaptcha(): Promise<string | undefined> {
    if (!SITE_KEY) return undefined;
    const w = window as Window & { grecaptcha?: Grecaptcha };
    if (!w.grecaptcha) {
      await new Promise<void>((resolve, reject) => {
        const el = document.createElement("script");
        el.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
        el.async = true;
        el.onload = () => resolve();
        el.onerror = () => reject(new Error("recaptcha load failed"));
        document.head.appendChild(el);
      }).catch(() => undefined);
    }
    const g = w.grecaptcha;
    if (!g) return undefined;
    await g.ready(SITE_KEY);
    return g.execute(SITE_KEY, { action: "contact" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setServerMsg("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("sending");
    setServerMsg("");

    try {
      const token = await getRecaptcha();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, recaptchaToken: token ?? "" }),
      });
      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        setPhoneDigits("");
        setCountry("+91");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      setStatus("error");
      setServerMsg(
        data.error ?? data.message ?? "Something went wrong. Please try again.",
      );
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
        <div className="aurora absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-xl px-6 text-center sm:px-10">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-success/15 text-3xl">
            ✓
          </div>
          <h1 className="font-display text-4xl font-black text-ice sm:text-5xl">
            Message sent.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-silver">
            Thanks — we&apos;ll be in touch within one business day. For anything
            urgent, reach us on WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/" className="px-7 py-3.5">
              Back home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
      <div className="aurora absolute right-0 top-10 h-[420px] w-[420px] opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-blue">
            Let&apos;s Talk
          </p>
          <h1 className="font-display text-5xl font-black leading-tight text-ice sm:text-6xl">
            Start a project
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-silver">
            Tell us what you&apos;re building. We&apos;ll reply with a plan, not a
            pitch deck.
          </p>
        </Reveal>

        <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <div className="grid gap-6">
              <Field label="Full Name" error={errors.name} required>
                <input
                  className={fieldCls}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jane Doe"
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>

              <Field label="Company / Organization" error={errors.company}>
                <input
                  className={fieldCls}
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Acme Inc. (optional)"
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Email" error={errors.email} required>
                  <input
                    type="email"
                    className={fieldCls}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@acme.com"
                    aria-invalid={Boolean(errors.email)}
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <div className="flex gap-2">
                    <select
                      className={`${fieldCls} w-28 shrink-0`}
                      value={country}
                      onChange={(e) => onCountryChange(e.target.value)}
                      aria-label="Country code"
                    >
                      {CODES.map((c) => (
                        <option key={c.code} value={c.code} className="bg-ink-soft">
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      className={fieldCls}
                      value={phoneDigits}
                      onChange={(e) => onPhoneChange(e.target.value)}
                      placeholder="96191 00568"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Service Interested In" error={errors.services} required>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => {
                    const active = values.services.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleService(s)}
                        aria-pressed={active}
                        className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "border-blue bg-blue/15 text-ice"
                            : "border-white/15 text-silver hover:border-white/30 hover:text-ice"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Estimated Budget" error={errors.budget}>
                  <select
                    className={fieldCls}
                    value={values.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="" className="bg-ink-soft">
                      Select a range
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-ink-soft">
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="How did you hear about us?" error={errors.source}>
                  <select
                    className={fieldCls}
                    value={values.source}
                    onChange={(e) => set("source", e.target.value)}
                  >
                    <option value="" className="bg-ink-soft">
                      Select an option
                    </option>
                    {SOURCES.map((s) => (
                      <option key={s} value={s} className="bg-ink-soft">
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Project Description"
                error={errors.message}
                required
                hint={`${values.message.trim().length}/2000`}
              >
                <textarea
                  className={`${fieldCls} min-h-32 resize-y`}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="What are you building, and what does success look like?"
                  aria-invalid={Boolean(errors.message)}
                />
              </Field>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-white/10 bg-ink-soft/60 p-7">
              <h2 className="font-display text-xl font-bold text-ice">
                Ready when you are
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-silver">
                We typically reply within one business day. Prefer to talk it
                through? Reach us directly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button type="submit" className="w-full justify-center px-7 py-3.5">
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>
                <Button
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919690000000"}`}
                  variant="ghost"
                  className="w-full justify-center px-7 py-3.5"
                >
                  <span aria-hidden="true">💬</span> WhatsApp us
                </Button>
              </div>
              {status === "error" && serverMsg && (
                <p
                  role="alert"
                  className="mt-5 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
                >
                  {serverMsg}
                </p>
              )}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-wider text-silver">
                  Why teams choose us
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-silver">
                  <li className="flex items-center gap-2">
                    <Tag variant="success">Fast</Tag> Replies with a plan, not a deck
                  </li>
                  <li className="flex items-center gap-2">
                    <Tag variant="cyan">Agile</Tag> Founder-led, direct communication
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-ice">
        {label}
        {required && <span className="text-blue">*</span>}
        {hint && <span className="font-mono text-xs text-silver">{hint}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-danger">
          {error}
        </span>
      )}
    </label>
  );
}
