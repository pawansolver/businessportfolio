"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Link2, Code2, Send, CheckCircle, User, AtSign, Briefcase, FileText, ArrowRight, Phone } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, socialLinks } from "@/data/site";
import { services } from "@/data/services";

const platformIcon: Record<string, React.ReactNode> = {
  email:    <Mail className="h-4 w-4" />,
  whatsapp: <Phone className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  github:   <Code2 className="h-4 w-4" />,
};

const platformValue = (link: { platform: string; url: string }) => {
  if (link.platform === "email") return siteConfig.email;
  if (link.platform === "whatsapp") return siteConfig.whatsapp;
  return link.url.replace("https://", "").replace("www.", "");
};

const dropdownServices = [
  { id: "web-dev", title: "Custom Web Development" },
  { id: "ecommerce", title: "E-commerce Development" },
  { id: "mobile-app", title: "Mobile App Development" },
  { id: "ui-ux", title: "UI/UX Design & Prototyping" },
  { id: "saas-software", title: "SaaS & Software Development" },
  { id: "digital-marketing", title: "Digital Marketing & SEO" },
  { id: "graphic-branding", title: "Graphic Design & Branding" },
  { id: "maintenance-support", title: "Maintenance & Support" },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-bg-primary px-3 py-2.5 text-sm text-text-primary outline-none transition-all duration-200 placeholder:text-text-secondary/40";
  const inputClass = (field: string) =>
    `${inputBase} ${focused === field ? "border-accent shadow-[0_0_0_2px_rgba(212,255,0,0.1)]" : "border-border hover:border-border-hover"}`;

  return (
    <section id="contact" className="relative bg-bg-primary py-14 sm:py-20 overflow-hidden">
      {/* subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-accent/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Get in Touch" subtitle="Have a project in mind? Let's build something great together." />
        </FadeIn>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ── Left: Info + Channels ── */}
          <FadeIn direction="right" className="h-full">
            <div className="relative h-full flex flex-col justify-center rounded-2xl border border-border bg-bg-card overflow-hidden p-5 sm:p-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              
              <div className="flex flex-col gap-8">
                <div>
                  {/* Availability */}
                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    Available for projects
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Let&apos;s Work Together</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Startup, agency, or enterprise — I deliver high-quality, scalable digital products from concept to deployment.
                    </p>
                  </div>
                </div>

                {/* Channel cards */}
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <motion.li key={link.platform} whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <a
                        href={link.url}
                        target={link.platform !== "email" ? "_blank" : undefined}
                        rel={link.platform !== "email" ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-bg-primary p-3 transition-all duration-200 hover:border-accent/50 hover:shadow-[0_0_16px_rgba(212,255,0,0.07)]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-black">
                          {platformIcon[link.platform] ?? <ArrowRight className="h-4 w-4" />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary capitalize">{link.platform}</p>
                          <p className="truncate text-xs text-text-secondary transition-colors group-hover:text-accent">
                            {platformValue(link)}
                          </p>
                        </div>
                        <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-text-secondary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* ── Right: Form ── */}
          <FadeIn direction="left" className="h-full">
            <div className="relative h-full flex flex-col justify-center rounded-2xl border border-border bg-bg-card overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

              <div className="p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">Message Sent!</h3>
                        <p className="mt-1 text-sm text-text-secondary">I&apos;ll get back to you within 24 hours.</p>
                      </div>
                      <button
                        onClick={() => { setSubmitted(false); setError(null); setFormState({ name: "", email: "", phone: "", service: "", message: "" }); }}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Send another →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-text-primary">Send a Message</h3>
                        <p className="text-xs text-text-secondary">Typically responds within 24 hours.</p>
                      </div>

                      {/* Name + Email */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-1.5">
                            <User className="h-3 w-3" /> Name
                          </label>
                          <input
                            type="text" id="name" name="name" required
                            value={formState.name}
                            onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                            className={inputClass("name")} placeholder="Pawan Kumar"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-1.5">
                            <AtSign className="h-3 w-3" /> Email
                          </label>
                          <input
                            type="email" id="email" name="email" required
                            value={formState.email}
                            onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                            className={inputClass("email")} placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone + Service */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-1.5">
                            <Phone className="h-3 w-3" /> Phone
                          </label>
                          <input
                            type="tel" id="phone" name="phone"
                            value={formState.phone}
                            onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                            onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                            className={inputClass("phone")} placeholder="+1 (234) 567-890"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-1.5">
                            <Briefcase className="h-3 w-3" /> Service
                          </label>
                          <div className="relative">
                            <select
                              id="service" name="service"
                              value={formState.service}
                              onChange={(e) => setFormState(s => ({ ...s, service: e.target.value }))}
                              onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                              className={`${inputClass("service")} appearance-none pr-8`}
                            >
                              <option value="" disabled>Select a service…</option>
                              {dropdownServices.map((s) => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                              ))}
                            </select>
                            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-1.5">
                          <FileText className="h-3 w-3" /> Message
                        </label>
                        <textarea
                          id="message" name="message" rows={4} required
                          value={formState.message}
                          onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                          className={`${inputClass("message")} resize-none`}
                          placeholder="Tell me about your project, goals, and timeline…"
                        />
                      </div>

                      {/* Error message */}
                      {error && (
                        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="group relative w-full overflow-hidden rounded-xl bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_32px_rgba(212,255,0,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              Send Message
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
