import { invokeAgent } from "@/lib/agents/account-manager";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { HumanMessage } from "langchain";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[Account Manager API] Handling post request...");

    const bodySchema = z.object({
      message: z.string(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    const { message } = bodyParseResult.data;

    const agentResponse = await invokeAgent([new HumanMessage(message)]);

    const response =
      typeof agentResponse.content === "string"
        ? agentResponse.content
        : JSON.stringify(agentResponse.content);

    return createSuccessApiResponse({ response });
  } catch (error) {
    console.error(
      "[Account Manager API] Failed to handle post request,",
      error,
    );
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
