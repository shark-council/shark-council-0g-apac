import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DebateChatMessageRole,
  DebateChatMessage as DebateChatMessageType,
} from "@/types/debate";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ROLE_LABELS: Record<DebateChatMessageRole, string> = {
  user: "You",
  orchestrator: "Orchestrator",
  "sentiment-expert": "Sentiment Expert 009",
  "quant-expert": "Quant Expert 042",
};

const ROLE_AVATARS: Record<DebateChatMessageRole, string | null> = {
  user: null,
  orchestrator: "/images/agents/orchestrator.png",
  "sentiment-expert": "/images/agents/sentiment-expert.png",
  "quant-expert": "/images/agents/quant-expert.png",
};

const ROLE_BADGE_STYLES: Record<DebateChatMessageRole, string> = {
  user: "bg-accent text-accent-foreground",
  orchestrator: "bg-indigo-200 text-accent-foreground",
  "sentiment-expert": "bg-yellow-200 text-accent-foreground",
  "quant-expert": "bg-emerald-200 text-accent-foreground",
};

export function DebateChatMessage(props: { message: DebateChatMessageType }) {
  const isFinal = props.message.type === "final";
  const isThinking = props.message.type === "thinking";

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        isFinal && " border-accent/40 bg-accent/5",
        isThinking && "opacity-60",
      )}
    >
      <Avatar size="lg">
        {ROLE_AVATARS[props.message.role] ? (
          <AvatarImage
            src={ROLE_AVATARS[props.message.role]!}
            alt={ROLE_LABELS[props.message.role]}
          />
        ) : null}
        <AvatarFallback className="bg-accent">
          {props.message.role === "user" ? (
            <User className="text-accent-foreground" />
          ) : (
            <Bot className="text-accent-foreground" />
          )}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(ROLE_BADGE_STYLES[props.message.role])}
          >
            {ROLE_LABELS[props.message.role]}
          </Badge>
          {isFinal && (
            <span className="text-xs text-muted-foreground font-medium">
              Final message
            </span>
          )}
          {isThinking && (
            <span className="text-xs text-muted-foreground italic">
              Thinking...
            </span>
          )}
        </div>
        <div className="min-w-0 wrap-anywhere">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mt-2 text-sm leading-relaxed wrap-anywhere">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs break-all whitespace-pre-wrap">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="mt-2 overflow-x-auto rounded-md border bg-muted/50 p-3 text-xs whitespace-pre-wrap break-all">
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mt-2 border-l-2 border-border pl-3 text-muted-foreground">
                  {children}
                </blockquote>
              ),
            }}
          >
            {props.message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
