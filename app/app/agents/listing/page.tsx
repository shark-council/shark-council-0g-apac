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
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function AgentListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.url("Enter a valid image URL"),
    capabilities: z
      .array(z.string())
      .min(1, "At least one capability is required"),
    endpoint: z.url("Enter a valid agent endpoint URL"),
    intelligentData: z.string().min(1, "Intelligent data is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      capabilities: [],
      endpoint: "",
      intelligentData: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("[Component] Listing agent...");
      setIsSubmitting(true);

      await axios.post("/api/agents/listing", data);

      toast.success("Agent listed");
      router.push(`/`);
    } catch (error) {
      handleError({ error, errorContext: "Failed to list agent" });
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
                    Provide the agent&apos;s strategy, data sources, and edge.
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
                    Provide a hosted image URL for the agent&apos;s avatar
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
              name="capabilities"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="capabilities">Capabilities</FieldLabel>
                  <FieldDescription>
                    Provide comma-separated capabilities for the agent
                  </FieldDescription>
                  <Input
                    {...field}
                    id="capabilities"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="quant, charting, crypto"
                    autoComplete="off"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      )
                    }
                    value={field.value?.join(", ") || ""}
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
            <Controller
              name="intelligentData"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="intelligentData">
                    Intelligent Data
                  </FieldLabel>
                  <FieldDescription>
                    Provide intelligent data in JSON format
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="intelligentData"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder={JSON.stringify({
                      systemPrompt:
                        "You are a Quant Expert. You live in charts — RSI, MACD, volume profiles, support/resistance, trend structure, and price action",
                    })}
                    autoComplete="off"
                    value={field.value || ""}
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
