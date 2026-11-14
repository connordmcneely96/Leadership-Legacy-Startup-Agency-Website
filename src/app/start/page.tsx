import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TRIAL_DAYS, TRIAL_OPEN } from "@/lib/ladder";

export const metadata: Metadata = {
  title: "Seven-day trial | Leadership Legacy",
  description:
    "How the seven-day trial of the Workflow Suite will work. In preparation: nothing is billed and no account is created.",
};

const steps = [
  {
    title: "Start",
    body: "Create an account. The trial is for new members, one per email, adults only.",
  },
  {
    title: `Days 1 to ${TRIAL_DAYS}`,
    body: "One part of the Workflow Suite opens every 24 hours from your start time. Parts not yet open say which day they open.",
  },
  {
    title: `Day ${TRIAL_DAYS + 1}`,
    body: "Choose a plan to continue, or stop. Either way, what you made during the week is kept for you.",
  },
  {
    title: "After",
    body: "Change or cancel your plan yourself. No call, no form to request it.",
  },
];

export default function StartPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-36 pb-16 lg:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Seven-day trial
          </span>
          <h1 className="mt-4 text-4xl lg:text-6xl font-serif font-semibold leading-[1.1]">
            A week in the workspace.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Try the Workflow Suite before you pay for it. Here is how the
            week is planned to run.
          </p>

          {!TRIAL_OPEN && (
            <p
              role="note"
              className="mt-8 max-w-2xl px-5 py-3 rounded-xl border border-gold/20 bg-gold/5 text-sm text-muted-foreground"
            >
              The trial is not open yet. Nothing is billed and no account is
              created from this page. The billing rule for day{" "}
              {TRIAL_DAYS + 1} will be stated here, one way, before it opens.
            </p>
          )}
        </div>
      </section>

      <section aria-label="How the trial works" className="relative pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="p-6 rounded-2xl bg-navy-light/50 border border-white/5"
              >
                <span className="font-mono text-sm text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-base font-semibold text-foreground">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-navy rounded-full hover:bg-gold-light transition-all"
            >
              Ask to be told when it opens
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground border border-white/20 rounded-full hover:bg-white/5 transition-colors"
            >
              Use the free tools
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
