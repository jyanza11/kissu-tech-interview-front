import { z } from "zod";

// Watchlist schemas
export const createWatchlistSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

export const updateWatchlistSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .optional(),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional(),
});

export const addTermSchema = z.object({
  term: z
    .string()
    .min(1, "El término es requerido")
    .max(50, "El término no puede exceder 50 caracteres"),
});

// Event schemas
export const simulateEventSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(1000, "La descripción no puede exceder 1000 caracteres"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

// Form validation schemas for frontend
export const watchlistFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

export const termFormSchema = z.object({
  term: z
    .string()
    .min(1, "El término es requerido")
    .max(50, "El término no puede exceder 50 caracteres"),
});

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(1000, "La descripción no puede exceder 1000 caracteres"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

// Type exports
export type CreateWatchlistInput = z.infer<typeof createWatchlistSchema>;
export type UpdateWatchlistInput = z.infer<typeof updateWatchlistSchema>;
export type AddTermInput = z.infer<typeof addTermSchema>;
export type SimulateEventInput = z.infer<typeof simulateEventSchema>;
export type WatchlistFormData = z.infer<typeof watchlistFormSchema>;
export type TermFormData = z.infer<typeof termFormSchema>;
export type EventFormData = z.infer<typeof eventFormSchema>;
