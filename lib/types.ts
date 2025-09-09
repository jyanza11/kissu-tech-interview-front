// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// Watchlist Types
export interface Watchlist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  terms: WatchlistTerm[];
}

export interface WatchlistTerm {
  id: string;
  term: string;
  watchlistId: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  createdAt: string;
  updatedAt: string;
}

// Form Types
export interface CreateWatchlistData {
  name: string;
}

export interface UpdateWatchlistData {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface AddTermData {
  term: string;
}

export interface SimulateEventData {
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}
