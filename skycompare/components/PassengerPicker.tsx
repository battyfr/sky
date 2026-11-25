"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import type { Passengers } from "@/types/flight";
import { cn } from "@/lib/utils";

interface Props {
  value: Passengers;
  onChange: (next: Passengers) => void;
  error?: string;
}

const MAX_BOOKING = 9;

function summary(p: Passengers): string {
  const total = p.adults + p.children + p.infants;
  return `${total} traveller${total === 1 ? "" : "s"}`;
}

export function PassengerPicker({ value, onChange, error }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const adultsAndChildren = value.adults + value.children;

  const rows: {
    key: keyof Passengers;
    label: string;
    hint: string;
    canDec: boolean;
    canInc: boolean;
  }[] = [
    {
      key: "adults",
      label: "Adults",
      hint: "12+ years",
      // Can't drop below 1, and can't leave more infants than adults
      canDec: value.adults > 1 && value.infants <= value.adults - 1,
      canInc: adultsAndChildren < MAX_BOOKING,
    },
    {
      key: "children",
      label: "Children",
      hint: "2–11 years",
      canDec: value.children > 0,
      canInc: adultsAndChildren < MAX_BOOKING,
    },
    {
      key: "infants",
      label: "Infants",
      hint: "Under 2, on lap",
      canDec: value.infants > 0,
      canInc: value.infants < value.adults,
    },
  ];

  function step(key: keyof Passengers, delta: 1 | -1) {
    onChange({ ...value, [key]: value[key] + delta });
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-navy-800 transition hover:bg-navy-50",
          error && "text-danger-500",
        )}
      >
        <Users className="h-4 w-4 text-navy-400" aria-hidden="true" />
        {summary(value)}
        <ChevronDown className={cn("h-4 w-4 text-navy-400 transition", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Travellers"
          className="absolute left-0 top-full z-40 mt-2 w-72 rounded-xl border border-navy-100 bg-white p-4 shadow-pop"
        >
          <ul className="space-y-4">
            {rows.map((r) => (
              <li key={r.key} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{r.label}</p>
                  <p className="text-xs text-navy-400">{r.hint}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => step(r.key, -1)}
                    disabled={!r.canDec}
                    aria-label={`Fewer ${r.label.toLowerCase()}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-navy-200 disabled:hover:text-navy-700"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-5 text-center text-sm font-bold tabular-nums" aria-live="polite">
                    {value[r.key]}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(r.key, 1)}
                    disabled={!r.canInc}
                    aria-label={`More ${r.label.toLowerCase()}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-navy-200 disabled:hover:text-navy-700"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-navy-400">Up to 9 adults and children. Each infant needs an adult.</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-primary btn-sm mt-3 w-full"
          >
            Done
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}
