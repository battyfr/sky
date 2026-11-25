const STEPS = [
  {
    title: "Search your route",
    text: "Pick your airports, dates, travellers and cabin. No account needed.",
  },
  {
    title: "Compare booking options",
    text: "We query authorized flight data providers and group identical itineraries so the prices are comparable.",
  },
  {
    title: "Book with the provider",
    text: "Choose the deal you like and finish checkout on the provider's own site. SkyCompare never holds your payment details.",
  },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-card">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
