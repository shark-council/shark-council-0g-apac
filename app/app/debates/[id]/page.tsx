import { Skeleton } from "@/components/ui/skeleton";

// TODO: Implement
export default async function DebatePage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    idea?: string | string[];
    agent?: string | string[];
  }>;
}) {
  const { id } = await params;
  const { idea, agent } = await searchParams;

  return (
    <main className="flex flex-1 flex-row items-start gap-4 px-4 py-4">
      <Skeleton className="flex-3 h-8" />
      <Skeleton className="flex-2 h-8" />
    </main>
  );
}
