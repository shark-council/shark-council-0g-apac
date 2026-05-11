import axios from "axios";
import { toast } from "sonner";

export function handleError(args: {
  error: unknown;
  toastTitle?: string;
  toastMessage?: string;
}) {
  console.error("[Error Lib] Error handled,", args.error);
  toast.error(args.toastTitle || "Something went wrong", {
    description: args.toastMessage,
  });
}

export function formatError(error: unknown): Record<string, unknown> {
  if (typeof error === "string") {
    return { message: error };
  }

  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      axios_method: error.config?.method?.toUpperCase(),
      axios_url: error.config?.url,
      axios_status: error.response?.status,
      stack: error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }

  return { message: String(error) };
}
