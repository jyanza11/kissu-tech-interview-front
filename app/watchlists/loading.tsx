import { LoadingState } from "@/components/loading-states";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-10 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>
      <LoadingState type="watchlists" count={6} />
    </div>
  );
}
