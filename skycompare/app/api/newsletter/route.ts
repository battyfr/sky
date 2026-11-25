import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/config";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limited = rateLimit(`newsletter:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email." },
      { status: 400 },
    );
  }

  // Without a database we cannot store anything, and we say so rather than pretending.
  if (!hasDatabase()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("newsletter subscribe failed", err);
    return NextResponse.json(
      { error: "We couldn't save your email right now. Please try again later." },
      { status: 500 },
    );
  }
}
