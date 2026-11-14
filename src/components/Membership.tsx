"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { plans, TRIAL_DAYS, TRIAL_OPEN } from "@/lib/ladder";

export default function Membership() {
  return (
    <section id="membership" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Membership
          </span>
          <h2 className="mt-4 text-3xl lg:text-5xl font-serif font-semibold">
            A workspace that keeps your work.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Two plans, one {TRIAL_DAYS}-day trial. Cancel yourself, any time,
            and what you made stays yours.
          </p>
        </motion.div>

        {!TRIAL_OPEN && (
          <p
            role="note"
            className="max-w-3xl mx-auto mb-10 px-5 py-3 rounded-xl border border-gold/20 bg-gold/5 text-sm text-center text-muted-foreground"
          >
            Membership is in preparation. Prices are not set, nothing is
            billed, and no account is created from this page.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col p-8 rounded-2xl bg-navy-light/50 border border-white/5"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.tagline}
              </p>

              <div className="mt-6 mb-6">
                {plan.monthly ? (
                  <>
                    <span className="text-3xl font-bold text-gold">
                      {plan.monthly}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      / month
                    </span>
                    {plan.annual && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        or {plan.annual} / year
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-lg font-medium text-gold">
                    Price set at launch
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1">
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/start"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-all"
          >
            See how the trial works
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground border border-white/20 rounded-full hover:bg-white/5 transition-colors"
          >
            Use the free tools first
          </Link>
        </div>
      </div>
    </section>
  );
}
