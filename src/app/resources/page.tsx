import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaybackCalculator from "@/components/PaybackCalculator";

export const metadata: Metadata = {
  title: "Free tools and resources | Leadership Legacy",
  description:
    "A workflow payback calculator and plain write-ups on AI systems and workflows. No account needed.",
};

export default function ResourcesPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-36 pb-16 lg:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-sm font-medium text-gold uppercase tracking-wider">
            Free tools and resources
          </span>
          <h1 className="mt-4 text-4xl lg:text-6xl font-serif font-semibold leading-[1.1]">
            Check the numbers first.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Before you automate a task, find out whether it pays. Put in your
            own figures. No account, no email.
          </p>
        </div>
      </section>

      <section
        id="calculator"
        aria-labelledby="calculator-heading"
        className="relative pb-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            id="calculator-heading"
            className="text-2xl lg:text-3xl font-serif font-semibold mb-8"
          >
            Workflow payback calculator
          </h2>
          <PaybackCalculator />
        </div>
      </section>

      <section aria-labelledby="writing-heading" className="relative pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            id="writing-heading"
            className="text-2xl lg:text-3xl font-serif font-semibold mb-4"
          >
            Write-ups and walkthroughs
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Nothing published here yet. Notes on AI operating systems, working
            workflows and short walkthroughs will be listed on this page as
            they are written.
          </p>

          <div className="mt-12 p-8 rounded-3xl bg-navy-light/30 border border-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-base font-semibold text-foreground">
              Want the workspace, not just the math?
            </p>
            <Link
              href="/start"
              className="group shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-navy text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              See how the trial works
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
