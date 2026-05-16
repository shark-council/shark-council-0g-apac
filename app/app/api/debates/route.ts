import { debateConfig } from "@/config/debate";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { Debate } from "@/types/debate";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";
import z from "zod";

// TODO: Send 0G fee to the contract
export async function POST(request: NextRequest) {
  try {
    console.log("[Debates API] Handling post request...");

    const bodySchema = z.object({
      idea: z.string().min(1),
      agents: z.array(z.string()).min(2),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    const debate: Debate = {
      id: new ObjectId().toHexString(),
      fee: debateConfig.defaultFee,
      agentIds: debateConfig.defaultAgentIds,
      agentReward: debateConfig.defaultAgentReward,
      idea: bodyParseResult.data.idea,
      messages: [],
    };

    return createSuccessApiResponse({ debate });
  } catch (error) {
    console.error("[Debates API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
