// Value ladder config — single source of truth for the ladder, membership
// and trial copy. Plan names are WORKING names; the owner may rename them.
// Prices stay null until the owner sets them. Never invent a price here.

export const TRIAL_OPEN = false; // flip only when auth + billing are wired
export const TRIAL_DAYS = 7;

export type Plan = {
  id: "foundation" | "full";
  name: string; // working name
  tagline: string;
  monthly: string | null; // e.g. "$49" — owner sets
  annual: string | null; // owner sets
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "foundation",
    name: "Operator",
    tagline: "The workspace, kept in working order.",
    monthly: null,
    annual: null,
    includes: [
      "Workflow Suite saved to your account",
      "Your documents, boards and files stay yours",
      "Seven-day guided start, one part opened each day",
      "Open resources and walkthroughs",
    ],
  },
  {
    id: "full",
    name: "Builder",
    tagline: "The workspace, plus the training to extend it.",
    monthly: null,
    annual: null,
    includes: [
      "Everything in Operator",
      "Guided AI workflow training",
      "Workflow templates you can adapt",
      "Priority place in small working groups",
    ],
  },
];

export type Rung = {
  step: string;
  name: string;
  summary: string;
  status: "live" | "planned";
  href: string;
  cta: string;
};

export const rungs: Rung[] = [
  {
    step: "0",
    name: "Free tools and resources",
    summary:
      "A working calculator and plain write-ups. No account, nothing to buy.",
    status: "live",
    href: "/resources",
    cta: "Open resources",
  },
  {
    step: "1",
    name: "Seven-day trial",
    summary:
      "Try the Workflow Suite for a week. One part opens each day so it sticks.",
    status: "planned",
    href: "/start",
    cta: "See how the trial works",
  },
  {
    step: "2",
    name: "Membership",
    summary:
      "Two plans. Keep the workspace, add training when you want to build more.",
    status: "planned",
    href: "/#membership",
    cta: "Compare plans",
  },
  {
    step: "3",
    name: "Done-for-you projects",
    summary:
      "Fixed-scope builds: AI systems, web apps, CAD, video and brand work.",
    status: "live",
    href: "/#services",
    cta: "View services",
  },
  {
    step: "4",
    name: "Ongoing retainers",
    summary: "We run and improve what we built, month to month.",
    status: "live",
    href: "/#retainers",
    cta: "View retainers",
  },
];
