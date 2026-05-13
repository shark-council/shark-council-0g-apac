import { Debate } from "@/types/debate";
import { useQuery } from "@tanstack/react-query";

// TODO: Implement actual fetching logic
async function fetchDebates(): Promise<Debate[]> {
  return [];
}

export function useDebates() {
  return useQuery({
    queryKey: ["debates"],
    queryFn: fetchDebates,
  });
}
