import { Agent } from "@/types/agent";
import { useQuery } from "@tanstack/react-query";

// TODO: Implement actual fetching logic
async function fetchAgents(): Promise<Agent[]> {
  return [];
}

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });
}
