import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardSkeleton />
    </div>
  );
}
