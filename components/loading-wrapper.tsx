"use client";

import { ReactNode } from "react";
import { LoadingState } from "@/components/loading-states";

interface LoadingWrapperProps {
  isLoading: boolean;
  type: "dashboard" | "watchlists" | "events" | "watchlist-detail";
  count?: number;
  children: ReactNode;
}

export function LoadingWrapper({
  isLoading,
  type,
  count = 3,
  children,
}: LoadingWrapperProps) {
  if (isLoading) {
    return <LoadingState type={type} count={count} />;
  }

  return <>{children}</>;
}
