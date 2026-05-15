import { uploadTextTo0gStorage } from "@/lib/0g-storage";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[0G Storage API] Handling post request...");

    const bodySchema = z.object({
      text: z.string(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    const { text } = bodyParseResult.data;

    const { key, uploadTx } = await uploadTextTo0gStorage(text);

    return createSuccessApiResponse({ key, uploadTx });
  } catch (error) {
    console.error("[0G Storage API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
