"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { handleError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function AgentListingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.url("Enter a valid image URL"),
    endpoint: z.url("Enter a valid agent endpoint URL"),
  });

  // TODO: Delete default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Quant Expert 042",
      description:
        "Anti-hype charting expert. Ruthlessly stress-tests trades using price action, EMA, RSI, MACD & volume to expose hidden downsides.",
      image:
        "https://shark-council-0g-apac-app.vercel.app/images/agents/quant-expert.png",
      endpoint:
        "https://shark-council-0g-apac-app.vercel.app/api/agents/quant-expert",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("[Component] Listing agent...");
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 3_000));

      toast.success("Agent listed");
      form.reset();
    } catch (error) {
      handleError({ error, errorContext: "Failed to list agent" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-4">
      <div className="max-w-2xl">
        {/* Hero */}
        <Image
          src="/images/hero.gif"
          alt="Hero"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        {/* Title */}
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-center mt-8">
          List your <span className="text-primary">0G Shark</span> and start
          earning <span className="text-accent">0G Rewards</span>
        </h2>
        {/* Form */}
        <form
          id="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          aria-busy={isSubmitting}
          className="mt-8 rounded-md border p-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldDescription>
                    Provide the agent name traders will recognize
                  </FieldDescription>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Quant Expert 042"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <FieldDescription>
                    Provide the agent strategy, data sources, and edge
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Anti-hype charting expert..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="image">Image URL</FieldLabel>
                  <FieldDescription>
                    Provide a hosted image URL for agent avatar
                  </FieldDescription>
                  <Input
                    {...field}
                    id="image"
                    type="url"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="https://shark-council-0g-apac-app.vercel.app/images/agents/quant-expert.png"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="endpoint"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="endpoint">Endpoint</FieldLabel>
                  <FieldDescription>
                    Provide the agent endpoint URL
                  </FieldDescription>
                  <Input
                    {...field}
                    id="endpoint"
                    type="url"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="https://shark-council-0g-apac-app.vercel.app/api/agents/quant-expert"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" form="form" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              List 0G Shark
            </Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
