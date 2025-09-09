"use server";

import { apiClient, ApiError } from "./api";

// Enhanced error handling for Server Actions
function handleServerActionError(error: unknown, defaultMessage: string) {
  console.error("Server Action Error:", error);

  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: defaultMessage,
  };
}

// Server Actions for initial data fetching (SSR)
export async function getWatchlists() {
  try {
    const watchlists = await apiClient.getWatchlists();
    return { success: true, data: watchlists };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al cargar las listas de observación"
    );
  }
}

export async function getWatchlist(id: string) {
  try {
    const watchlist = await apiClient.getWatchlist(id);
    console.log(watchlist);
    return { success: true, data: watchlist };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al cargar la lista de observación"
    );
  }
}

export async function getEvents() {
  try {
    const events = await apiClient.getEvents();
    return { success: true, data: events };
  } catch (error) {
    return handleServerActionError(error, "Error al cargar los eventos");
  }
}

export async function getEventAnalysis(eventId: string) {
  try {
    const analysis = await apiClient.getEventAnalysis(eventId);
    return { success: true, data: analysis };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al cargar el análisis del evento"
    );
  }
}

// Server Actions for mutations (forms)
export async function createWatchlist(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description) {
      return {
        success: false,
        error: "El nombre y la descripción son requeridos",
      };
    }

    const watchlist = await apiClient.createWatchlist({ name, description });
    return { success: true, data: watchlist };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al crear la lista de observación"
    );
  }
}

export async function updateWatchlist(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description) {
      return {
        success: false,
        error: "El nombre y la descripción son requeridos",
      };
    }

    const watchlist = await apiClient.updateWatchlist(id, {
      name,
      description,
    });
    return { success: true, data: watchlist };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al actualizar la lista de observación"
    );
  }
}

export async function deleteWatchlist(id: string) {
  try {
    await apiClient.deleteWatchlist(id);
    return { success: true };
  } catch (error) {
    return handleServerActionError(
      error,
      "Error al eliminar la lista de observación"
    );
  }
}

export async function addTerm(watchlistId: string, formData: FormData) {
  try {
    const term = formData.get("term") as string;

    if (!term) {
      return { success: false, error: "El término es requerido" };
    }

    const newTerm = await apiClient.addTerm(watchlistId, term);
    return { success: true, data: newTerm };
  } catch (error) {
    return handleServerActionError(error, "Error al añadir el término");
  }
}

export async function deleteTerm(watchlistId: string, termId: string) {
  try {
    await apiClient.deleteTerm(watchlistId, termId);
    return { success: true };
  } catch (error) {
    return handleServerActionError(error, "Error al eliminar el término");
  }
}

export async function simulateEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const severity = formData.get("severity") as
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "CRITICAL";

    if (!title || !description || !severity) {
      return { success: false, error: "Todos los campos son requeridos" };
    }

    const event = await apiClient.simulateEvent({
      title,
      description,
      severity,
    });
    return { success: true, data: event };
  } catch (error) {
    return handleServerActionError(error, "Error al simular el evento");
  }
}

export async function analyzeEvent(eventId: string) {
  try {
    const analysis = await apiClient.analyzeEvent(eventId);
    console.log(analysis);
    return { success: true, data: analysis };
  } catch (error) {
    return handleServerActionError(error, "Error al analizar el evento");
  }
}

// Health check for server-side
export async function getHealthStatus() {
  try {
    const health = await apiClient.healthCheck();
    return { success: true, data: health };
  } catch (error) {
    return handleServerActionError(error, "Error en el estado del sistema");
  }
}
