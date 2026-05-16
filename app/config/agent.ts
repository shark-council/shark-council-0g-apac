const hiddenIds: string[] =
  process.env.NODE_ENV === "production" ? ["2", "3", "4", "5", "6", "7"] : [];
const verifiedIds: string[] = ["0", "1"];

export const agentConfig = {
  hiddenIds,
  verifiedIds,
} as const;
