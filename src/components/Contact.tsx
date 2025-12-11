"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Mail, 
  Calendar,
  CheckCircle2,
  Loader2
} from "lucide-react";

const budgetRanges = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
  "Not sure yet",
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold mb-6">
              Book a Discovery Call
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Ready to explore how AI can transform your operations? Let&apos;s have 
              a focused conversation about your goals, challenges, and opportunities. 
              No pressure, no commitment—just clarity.
            </p>

            {/* What to Expect */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                What to Expect
              </h3>
              <div className="space-y-3">
                {[
                  "30-minute focused conversation",
                  "Assessment of AI opportunities for your business",
                  "Honest evaluation of feasibility and fit",
                  "No sales pressure—just information",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Contact */}
            <div className="p-6 rounded-xl bg-navy-light/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-foreground">
                  Prefer email?
                </span>
              </div>
              <a
                href="mailto:hello@leadershiplegacy.io"
                className="text-gold hover:text-gold-light transition-colors"
              >
                hello@leadershiplegacy.io
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 lg:p-10 rounded-3xl bg-navy-light/50 border border-white/5">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Request Received
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ll be in touch within 24 hours to schedule your discovery call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium text-foreground">
                      Request a Discovery Call
                    </span>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Project */}
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-foreground mb-2">
                      What are you trying to build?
                    </label>
                    <textarea
                      id="project"
                      name="project"
                      value={formState.project}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="Tell us about your project, goals, or challenges..."
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-navy border border-white/10 text-foreground focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Request
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

