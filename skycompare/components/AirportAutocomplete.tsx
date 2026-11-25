"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MapPin, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { formatAirportInput, getAirport, searchAirports } from "@/lib/airports";
import type { Airport } from "@/types/flight";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  /** Selected IATA code, or "" when nothing is chosen */
  value: string;
  onChange: (code: string) => void;
  error?: string;
  placeholder?: string;
  icon?: "from" | "to";
  /** Used to build stable element ids when several instances are on the page */
  name: string;
}

export function AirportAutocomplete({ label, value, onChange, error, placeholder, icon = "from", name }: Props) {
  const reactId = useId();
  const baseId = `${name}-${reactId.replace(/:/g, "")}`;
  const listId = `${baseId}-list`;
  const errorId = `${baseId}-error`;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = value ? getAirport(value) : undefined;

  // Keep the visible text in sync with the chosen airport (swap button, prefill, etc.)
  useEffect(() => {
    if (focused) return;
    setQuery(selected ? formatAirportInput(selected) : value);
  }, [value, selected, focused]);

  // When the box still shows the chosen airport, show suggestions instead of filtering by it.
  const effectiveQuery = selected && query === formatAirportInput(selected) ? "" : query;
  const results = useMemo(() => searchAirports(effectiveQuery, 8), [effectiveQuery]);

  useEffect(() => {
    setActive(0);
  }, [effectiveQuery]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${baseId}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, baseId]);

  function choose(airport: Airport) {
    onChange(airport.code);
    setQuery(formatAirportInput(airport));
    setOpen(false);
  }

  function handleBlur() {
    setFocused(false);
    setOpen(false);
    // Typing an exact IATA code and tabbing away should still work.
    const typed = query.trim().toUpperCase();
    if (!value && /^[A-Z]{3}$/.test(typed)) {
      const exact = getAirport(typed);
      if (exact) choose(exact);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (open && results[active]) {
          e.preventDefault();
          choose(results[active]);
        }
        break;
      case "Tab":
        if (open && !value && query.trim() && results[active]) choose(results[active]);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
    }
  }

  const Icon = icon === "from" ? PlaneTakeoff : PlaneLanding;

  return (
    <div className="relative">
      <div className={cn("field", error && "field-error")}>
        <label htmlFor={baseId} className="field-label">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-navy-300" aria-hidden="true" />
          <input
            ref={inputRef}
            id={baseId}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && results[active] ? `${baseId}-opt-${active}` : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={placeholder ?? "City or airport"}
            value={query}
            className="field-control"
            onFocus={(e) => {
              setFocused(true);
              setOpen(true);
              e.currentTarget.select();
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              if (value) onChange("");
            }}
          />
        </div>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 min-w-[18rem] overflow-y-auto rounded-xl border border-navy-100 bg-white py-1 shadow-pop"
        >
          {!effectiveQuery && (
            <li role="presentation" className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-400">
              Popular airports
            </li>
          )}
          {results.length === 0 && (
            <li role="presentation" className="px-4 py-3 text-sm text-navy-500">
              No airports found for “{effectiveQuery}”. Try a city name or 3-letter code.
            </li>
          )}
          {results.map((a, i) => (
            <li
              key={a.code}
              id={`${baseId}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown (not click) so the input's blur doesn't close the list first
              onMouseDown={(e) => {
                e.preventDefault();
                choose(a);
              }}
              onMouseMove={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-2.5",
                i === active ? "bg-brand-50" : "bg-white",
              )}
            >
              <MapPin className="h-4 w-4 shrink-0 text-navy-300" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy-900">
                  {a.city}, {a.country}
                </p>
                <p className="truncate text-xs text-navy-500">{a.name}</p>
              </div>
              <span className="rounded-md bg-navy-100 px-2 py-0.5 text-xs font-bold tracking-wide text-navy-700">
                {a.code}
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}
