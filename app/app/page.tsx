"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { debateConfig } from "@/config/debate";
import { useAgents } from "@/hooks/use-agents";
import { handleError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ObjectId } from "bson";
import {
  BarChart3Icon,
  BotIcon,
  CheckCheckIcon,
  CircleCheck,
  CircleXIcon,
  MessageCircleIcon,
  TagsIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatUnits } from "viem";
import z from "zod";

// TODO: Allow selection of active agents only
export default function IndexPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: agents, isLoading, isError } = useAgents();

  const formSchema = z.object({
    idea: z.string().min(1, "Trading idea is required"),
    agents: z.array(z.string()).min(2, "Select at least two agents"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "",
      agents: [],
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("[Component] Submitting idea...");
      setIsSubmitting(true);

      const id = new ObjectId();

      const params = new URLSearchParams({
        idea: data.idea,
      });
      data.agents.forEach((agentId) => {
        params.append("agent", agentId);
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push(`/debates/${id.toString()}?${params.toString()}`);
    } catch (error) {
      handleError({ error, errorContext: "Failed to submit idea" });
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
          Let <span className="text-primary">0G Sharks</span>, built by elite{" "}
          <span className="text-accent">0G Developers</span>, debate and execute
          your trade ideas
        </h2>
        {/* Form */}
        <form
          id="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          aria-busy={isSubmitting}
          className="border rounded-md p-4 mt-8"
        >
          <FieldGroup>
            {/* Idea */}
            <Controller
              name="idea"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="idea">Trading idea</FieldLabel>
                  <FieldDescription>
                    Describe the trading idea you want to debate
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="idea"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Should I buy BTC if..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Agents */}
            <Controller
              name="agents"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">0G Sharks</FieldLegend>
                  <FieldDescription>
                    Select at least two agents to start debating
                  </FieldDescription>
                  <FieldGroup
                    data-slot="checkbox-group"
                    className="data-[slot=checkbox-group]:gap-6"
                  >
                    {isLoading && (
                      <div className="flex items-center gap-2">
                        <Spinner />
                        <p className="text-sm text-muted-foreground">
                          Loading...
                        </p>
                      </div>
                    )}
                    {isError && (
                      <p className="text-sm text-destructive">
                        Failed to load agents
                      </p>
                    )}
                    {agents?.map((agent) => {
                      const isChecked = field.value.includes(agent.id);
                      return (
                        <Field
                          key={agent.id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                          data-disabled={isSubmitting}
                        >
                          <Checkbox
                            id={agent.id}
                            name={field.name}
                            checked={isChecked}
                            aria-invalid={fieldState.invalid}
                            disabled={isSubmitting}
                            onCheckedChange={(
                              checked: boolean | "indeterminate",
                            ) => {
                              const nextValue =
                                checked === true
                                  ? isChecked
                                    ? field.value
                                    : [...field.value, agent.id]
                                  : field.value.filter(
                                      (value) => value !== agent.id,
                                    );

                              field.onChange(nextValue);
                            }}
                          />
                          {/* Avatar */}
                          <Avatar size="lg">
                            <AvatarImage
                              src={agent.identity.image}
                              alt={agent.identity.name}
                            />
                            <AvatarFallback>
                              <BotIcon />
                            </AvatarFallback>
                          </Avatar>
                          <FieldContent>
                            {/* Name */}
                            <FieldLabel htmlFor={agent.id}>
                              <p>{agent.identity.name}</p>
                            </FieldLabel>
                            {/* Description */}
                            <FieldDescription>
                              {agent.identity.description}
                            </FieldDescription>
                            {/* Reputation */}
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="default" data-icon="inline-start">
                                <MessageCircleIcon />
                                Debates {agent.reputation.debates}
                              </Badge>
                              <Badge variant="default" data-icon="inline-start">
                                <BarChart3Icon />
                                Trades {agent.reputation.totalTrades}
                              </Badge>
                              <Badge
                                variant="secondary"
                                data-icon="inline-start"
                              >
                                <CheckCheckIcon />
                                Closed {agent.reputation.closedTrades}
                              </Badge>
                              <Badge
                                variant="secondary"
                                data-icon="inline-start"
                              >
                                <CircleCheck />
                                Winning {agent.reputation.winningTrades}
                              </Badge>
                              <Badge
                                variant="secondary"
                                data-icon="inline-start"
                              >
                                <CircleXIcon />
                                Losing {agent.reputation.losingTrades}
                              </Badge>
                            </div>
                            {/* Capabilities */}
                            <div className="flex flex-wrap gap-2 mt-1">
                              {agent.identity.capabilities.map(
                                (capability, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    data-icon="inline-start"
                                  >
                                    <TagsIcon />
                                    {capability}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </FieldContent>
                        </Field>
                      );
                    })}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <Button
              type="submit"
              form="form"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting && <Spinner />}
              Start Debate (
              {formatUnits(
                debateConfig.defaultFee.tokenAmount,
                debateConfig.defaultFee.tokenDecimals,
              )}{" "}
              0G Fee)
            </Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
