"use client";

import { WatchlistCardSkeleton } from "@/components/skeletons/watchlist-card-skeleton";
import { EventCardSkeleton } from "@/components/skeletons/event-card-skeleton";
import { WatchlistDetailSkeleton } from "@/components/skeletons/watchlist-detail-skeleton";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

interface LoadingStateProps {
  type: "dashboard" | "watchlists" | "events" | "watchlist-detail";
  count?: number;
}

export function LoadingState({ type, count = 3 }: LoadingStateProps) {
  switch (type) {
    case "dashboard":
      return <DashboardSkeleton />;

    case "watchlists":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <WatchlistCardSkeleton key={i} />
          ))}
        </div>
      );

    case "events":
      return (
        <div className="space-y-6">
          {Array.from({ length: count }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      );

    case "watchlist-detail":
      return <WatchlistDetailSkeleton />;

    default:
      return null;
  }
}
