const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Retry configuration
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Retry utility function
async function retry<T>(
  fn: () => Promise<T>,
  attempts: number = RETRY_ATTEMPTS,
  delay: number = RETRY_DELAY
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry with exponential backoff
    return retry(fn, attempts - 1, delay * 2);
  }
}

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  terms: WatchlistTerm[];
}

export interface WatchlistTerm {
  id: string;
  term: string;
  watchlistId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  createdAt: string;
  updatedAt: string;
}

export interface AIAnalysis {
  id: string;
  eventId: string;
  summary: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  action: string;
  createdAt: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    return retry(async () => {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          let errorData = null;

          try {
            errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            // If response is not JSON, use the status text
            errorMessage = response.statusText || errorMessage;
          }

          throw new ApiError(errorMessage, response.status, errorData);
        }

        // Handle empty responses
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return await response.json();
        } else {
          // For non-JSON responses (like DELETE operations)
          return {} as T;
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        // Network or other errors
        if (error instanceof TypeError && error.message.includes("fetch")) {
          throw new ApiError(
            "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.",
            0
          );
        }

        throw new ApiError(
          error instanceof Error ? error.message : "Error desconocido",
          0
        );
      }
    });
  }

  // Watchlists API
  async getWatchlists(): Promise<Watchlist[]> {
    return this.request<Watchlist[]>("/api/watchlists");
  }

  async getWatchlist(id: string): Promise<Watchlist> {
    return this.request<Watchlist>(`/api/watchlists/${id}`);
  }

  async createWatchlist(data: {
    name: string;
    description: string;
  }): Promise<Watchlist> {
    return this.request<Watchlist>("/api/watchlists", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateWatchlist(
    id: string,
    data: { name: string; description: string }
  ): Promise<Watchlist> {
    return this.request<Watchlist>(`/api/watchlists/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteWatchlist(id: string): Promise<void> {
    return this.request<void>(`/api/watchlists/${id}`, {
      method: "DELETE",
    });
  }

  // Terms API
  async addTerm(watchlistId: string, term: string): Promise<WatchlistTerm> {
    return this.request<WatchlistTerm>(`/api/watchlists/${watchlistId}/terms`, {
      method: "POST",
      body: JSON.stringify({ term }),
    });
  }

  async deleteTerm(watchlistId: string, termId: string): Promise<void> {
    return this.request<void>(
      `/api/watchlists/${watchlistId}/terms/${termId}`,
      {
        method: "DELETE",
      }
    );
  }

  // Events API
  async getEvents(): Promise<Event[]> {
    return this.request<Event[]>("/api/events");
  }

  async simulateEvent(data: {
    title: string;
    description: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }): Promise<Event> {
    return this.request<Event>("/api/events/simulate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getEventAnalysis(eventId: string): Promise<AIAnalysis[]> {
    return this.request<AIAnalysis[]>(`/api/events/${eventId}/analysis`);
  }

  async analyzeEvent(eventId: string): Promise<AIAnalysis> {
    return this.request<AIAnalysis>(`/api/events/${eventId}/analyze`, {
      method: "POST",
    });
  }

  // Health check
  async healthCheck(): Promise<{
    status: string;
    checks: {
      redis: string;
      db: string;
    };
  }> {
    return this.request<{
      status: string;
      checks: {
        redis: string;
        db: string;
      };
    }>("/health");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
