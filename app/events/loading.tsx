import { LoadingState } from "@/components/loading-states";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-80 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <LoadingState type="events" count={5} />
    </div>
  );
}
