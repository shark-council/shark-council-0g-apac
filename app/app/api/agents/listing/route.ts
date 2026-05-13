import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import z from "zod";

// TODO: Implement
export async function POST(request: NextRequest) {
  try {
    console.log("[Agents Listing API] Handling post request...");

    const bodySchema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      image: z.url(),
      capabilities: z.array(z.string()).min(1),
      endpoint: z.url(),
      intelligentData: z.string().min(1),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    console.log(
      "[Agent Listing API] Listing request payload:",
      bodyParseResult.data,
    );

    return createSuccessApiResponse();
  } catch (error) {
    console.error("[Agents Listing API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
