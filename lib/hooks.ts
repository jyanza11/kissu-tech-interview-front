"use client";
import { useState, useEffect, useCallback } from "react";
import { apiClient, Watchlist, Event, AIAnalysis } from "./api";

// Generic hook for API calls with loading and error states
function useApiCall<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

// Watchlists hooks
export function useWatchlists() {
  return useApiCall(() => apiClient.getWatchlists());
}

export function useWatchlist(id: string) {
  return useApiCall(() => apiClient.getWatchlist(id), [id]);
}

export function useCreateWatchlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createWatchlist = useCallback(
    async (data: { name: string; description: string }) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.createWatchlist(data);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createWatchlist, loading, error };
}

export function useUpdateWatchlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateWatchlist = useCallback(
    async (id: string, data: { name: string; description: string }) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.updateWatchlist(id, data);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateWatchlist, loading, error };
}

export function useDeleteWatchlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteWatchlist = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.deleteWatchlist(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteWatchlist, loading, error };
}

// Terms hooks
export function useAddTerm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addTerm = useCallback(async (watchlistId: string, term: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiClient.addTerm(watchlistId, term);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addTerm, loading, error };
}

export function useDeleteTerm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTerm = useCallback(
    async (watchlistId: string, termId: string) => {
      try {
        setLoading(true);
        setError(null);
        await apiClient.deleteTerm(watchlistId, termId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteTerm, loading, error };
}

// Events hooks
export function useEvents() {
  return useApiCall(() => apiClient.getEvents());
}

export function useSimulateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const simulateEvent = useCallback(
    async (data: {
      title: string;
      description: string;
      severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    }) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.simulateEvent(data);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { simulateEvent, loading, error };
}

export function useEventAnalysis(eventId: string) {
  return useApiCall(() => apiClient.getEventAnalysis(eventId), [eventId]);
}

export function useAnalyzeEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyzeEvent = useCallback(async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiClient.analyzeEvent(eventId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { analyzeEvent, loading, error };
}

// Health check hook
export function useHealthCheck() {
  return useApiCall(() => apiClient.healthCheck());
}
