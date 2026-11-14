"use client";

import { useState } from "react";

// A public instrument: plain arithmetic on the visitor's own numbers.
// Nothing is stored or sent. No benchmark figures are assumed.

type Field = {
  id: "hours" | "rate" | "share" | "cost";
  label: string;
  hint: string;
  min: number;
  max?: number;
  step: number;
};

const fields: Field[] = [
  {
    id: "hours",
    label: "Hours a week spent on the task",
    hint: "Across everyone who does it",
    min: 0,
    step: 0.5,
  },
  {
    id: "rate",
    label: "Loaded cost per hour ($)",
    hint: "Wage plus overhead, your figure",
    min: 0,
    step: 1,
  },
  {
    id: "share",
    label: "Share you expect to automate (%)",
    hint: "Your estimate, 0 to 100",
    min: 0,
    max: 100,
    step: 5,
  },
  {
    id: "cost",
    label: "One-time build cost ($)",
    hint: "A quote or your budget",
    min: 0,
    step: 50,
  },
];

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function PaybackCalculator() {
  const [values, setValues] = useState({
    hours: "",
    rate: "",
    share: "",
    cost: "",
  });

  const n = (v: string) => {
    const x = parseFloat(v);
    return Number.isFinite(x) && x >= 0 ? x : null;
  };

  const hours = n(values.hours);
  const rate = n(values.rate);
  const shareRaw = n(values.share);
  const share = shareRaw === null ? null : Math.min(shareRaw, 100);
  const cost = n(values.cost);

  const ready =
    hours !== null && rate !== null && share !== null && cost !== null;
  const weekly = ready ? hours * rate * (share / 100) : null;
  const hoursBack = ready ? hours * (share / 100) : null;
  const payback = weekly && weekly > 0 && cost !== null ? cost / weekly : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Workflow payback calculator"
      >
        {fields.map((f) => (
          <div key={f.id}>
            <label
              htmlFor={`payback-${f.id}`}
              className="block text-sm font-medium text-foreground"
            >
              {f.label}
            </label>
            <input
              id={`payback-${f.id}`}
              type="number"
              inputMode="decimal"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.id]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [f.id]: e.target.value }))
              }
              aria-describedby={`payback-${f.id}-hint`}
              className="mt-2 w-full min-h-11 px-4 py-3 rounded-xl bg-navy-light border border-white/10 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            />
            <p
              id={`payback-${f.id}-hint`}
              className="mt-1 text-xs text-muted-foreground"
            >
              {f.hint}
            </p>
          </div>
        ))}
      </form>

      <div
        aria-live="polite"
        className="p-8 rounded-2xl bg-navy-light/50 border border-white/5 self-start"
      >
        <h3 className="text-sm font-medium text-gold uppercase tracking-wider">
          Result
        </h3>
        {ready && weekly !== null && hoursBack !== null ? (
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm text-muted-foreground">
                Hours returned each week
              </dt>
              <dd className="text-3xl font-bold text-foreground">
                {hoursBack.toLocaleString("en-US", {
                  maximumFractionDigits: 1,
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Value of those hours each week
              </dt>
              <dd className="text-3xl font-bold text-foreground">
                {money(weekly)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                Weeks to pay back the build
              </dt>
              <dd className="text-3xl font-bold text-gold">
                {payback !== null
                  ? payback.toLocaleString("en-US", {
                      maximumFractionDigits: 1,
                    })
                  : "No payback at these inputs"}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-6 text-muted-foreground">
            Fill in all four fields to see the result.
          </p>
        )}
        <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
          Method: hours × share = hours returned. Hours returned × cost per
          hour = weekly value. Build cost ÷ weekly value = payback in weeks.
          Running costs are not included. This is arithmetic on your inputs,
          not a forecast or a guarantee. Nothing you type is stored or sent.
        </p>
      </div>
    </div>
  );
}
