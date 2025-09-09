"use server";

import { apiClient } from "@/lib/api-client";
import { revalidatePath } from "next/cache";

export async function getHealthStatus() {
  try {
    const response = await apiClient.get("/health");
    return response;
  } catch (error) {
    console.error("Error fetching health status:", error);
    return {
      success: false,
      error: "Error al obtener el estado de salud",
    };
  }
}

export async function getEvents() {
  try {
    const response = await apiClient.get("/api/events");
    return response;
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      error: "Error al cargar los eventos",
    };
  }
}

export async function getEventAnalysis(eventId: string) {
  try {
    const response = await apiClient.get(`/api/events/${eventId}/analysis`);
    return response;
  } catch (error) {
    console.error("Error fetching event analysis:", error);
    return {
      success: false,
      error: "Error al cargar el análisis del evento",
    };
  }
}

export async function analyzeEvent(eventId: string) {
  try {
    const response = await apiClient.post(`/api/events/${eventId}/analyze`);

    if (response.success) {
      revalidatePath("/events");
      revalidatePath(`/events/${eventId}`);
    }

    return response;
  } catch (error) {
    console.error("Error analyzing event:", error);
    return {
      success: false,
      error: "Error al analizar el evento",
    };
  }
}
