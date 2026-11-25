import { BadgeCheck, BellRing, Layers, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "One search, many sources",
    text: "See the same itinerary from the airline and booking platforms side by side instead of opening a dozen tabs.",
  },
  {
    icon: BadgeCheck,
    title: "Like-for-like comparison",
    text: "We only compare equivalent itineraries and flag differences in baggage, changes, refunds and seat selection.",
  },
  {
    icon: BellRing,
    title: "Price alerts",
    text: "Save a route, set a target price and get notified when a verified fare reaches it.",
  },
  {
    icon: ShieldCheck,
    title: "Honest pricing",
    text: "Every fare is labelled live or demo, shows its original currency, and a missing price is never made up.",
  },
];

export function WhySkyCompare() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <div key={title} className="card p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{text}</p>
        </div>
      ))}
    </div>
  );
}
