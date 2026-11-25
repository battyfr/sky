"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { newsletterSchema } from "@/lib/validations";

interface Values {
  email: string;
}

export function NewsletterForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  async function onSubmit(values: Values) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { stored?: boolean; error?: string };

      if (!res.ok) {
        toast({
          variant: "error",
          title: res.status === 429 ? "Too many attempts" : "Couldn't subscribe",
          description: data.error ?? "Please try again in a moment.",
        });
        return;
      }

      if (data.stored === false) {
        toast({
          variant: "info",
          title: "Almost there",
          description: "No database is configured on this server yet, so your email was not saved.",
        });
      } else {
        toast({ variant: "success", title: "You're subscribed", description: "We'll email you flight tips and deals." });
      }
      reset();
    } catch {
      toast({ variant: "error", title: "Network error", description: "Check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "newsletter-error" : undefined}
            className="input pl-10"
            {...register("email")}
          />
        </div>
        <Button type="submit" loading={submitting}>
          Subscribe
        </Button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-danger-500">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
