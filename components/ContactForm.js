"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";

const needs = ["Brand Identity", "Website", "Social Media", "Packaging & CGI", "Brochure & Collateral", "Not sure yet"];

// Works with no backend: opens the visitor's email app with everything filled in.
// For a real inbox form, see README (Formspree / Web3Forms).
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", needs: [] });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleNeed = (n) => set("needs", form.needs.includes(n) ? form.needs.filter((x) => x !== n) : [...form.needs, n]);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Add your name so we know who to reply to.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter an email like name@company.com.";
    if (form.message.trim().length < 10) err.message = "Tell us a little about the project (at least 10 characters).";
    setErrors(err);
    if (Object.keys(err).length) return;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nLooking for: ${form.needs.join(", ")}\n\n${form.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry from " + form.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="done" className="form-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.svg viewBox="0 0 52 52" width="72" height="72">
            <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
            <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
          </motion.svg>
          <h3>Your email is ready to send</h3>
          <p>We&apos;ve opened your email app with the details filled in. Press send and we&apos;ll get back to you soon.</p>
          <button className="btn btn--ghost" onClick={() => setSent(false)}>Edit enquiry</button>
        </motion.div>
      ) : (
        <motion.form key="form" className="cform" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }}>
          <fieldset className="cform__group">
            <legend>What do you need?</legend>
            <div className="chips">
              {needs.map((n) => (
                <motion.button type="button" key={n} whileTap={{ scale: 0.92 }}
                  className={`chip ${form.needs.includes(n) ? "is-on" : ""}`} aria-pressed={form.needs.includes(n)} onClick={() => toggleNeed(n)}>{n}</motion.button>
              ))}
            </div>
          </fieldset>

          <div className="cform__row">
            <Field id="name" label="Your name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
            <Field id="email" type="email" label="Email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
          </div>
          <Field id="company" label="Company or organisation (optional)" value={form.company} onChange={(v) => set("company", v)} />
          <Field id="message" label="Tell us about the project" textarea value={form.message} onChange={(v) => set("message", v)} error={errors.message} />


          <motion.button type="submit" className="btn btn--dark btn--lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Send enquiry</motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ id, label, value, onChange, error, textarea, type = "text" }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className={`field ${value ? "has-value" : ""} ${error ? "has-error" : ""}`}>
      <Tag id={id} type={textarea ? undefined : type} value={value} rows={textarea ? 5 : undefined}
        onChange={(e) => onChange(e.target.value)} placeholder=" " aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
      <label htmlFor={id}>{label}</label>
      <span className="field__line" aria-hidden="true" />
      <AnimatePresence>
        {error && <motion.p id={`${id}-err`} className="field__err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}
