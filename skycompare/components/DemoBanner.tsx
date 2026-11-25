import { FlaskConical } from "lucide-react";
import { DEMO_BANNER_TEXT, isDemoMode } from "@/lib/config";

/** Server component: only renders when no provider credentials are configured. */
export function DemoBanner() {
  if (!isDemoMode()) return null;

  return (
    <div role="status" className="border-b border-warn-500/30 bg-warn-50 text-warn-700">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-xs font-semibold sm:text-[13px]">
        <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{DEMO_BANNER_TEXT}</span>
      </div>
    </div>
  );
}
