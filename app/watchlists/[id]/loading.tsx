import { WatchlistDetailSkeleton } from "@/components/skeletons/watchlist-detail-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WatchlistDetailSkeleton />
    </div>
  );
}
