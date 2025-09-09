import { Skeleton } from "@/components/ui/skeleton";

export function HealthStatusSkeleton() {
  return (
    <div
      data-testid="health-status-skeleton"
      className="flex items-center gap-4"
    >
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
