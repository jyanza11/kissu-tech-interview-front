"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const createWatchlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

const updateWatchlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  isActive: z.boolean(),
});

const addTermSchema = z.object({
  term: z.string().min(1, "El término es requerido"),
  isActive: z.boolean().default(true),
});

export async function createWatchlist(
  data: z.infer<typeof createWatchlistSchema>
) {
  try {
    const validatedData = createWatchlistSchema.parse(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al crear la lista",
      };
    }

    revalidatePath("/watchlists");
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error creating watchlist:", error);
    return {
      success: false,
      error: "Error inesperado al crear la lista",
    };
  }
}

export async function updateWatchlist(
  id: string,
  data: z.infer<typeof updateWatchlistSchema>
) {
  try {
    const validatedData = updateWatchlistSchema.parse(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al actualizar la lista",
      };
    }

    revalidatePath("/watchlists");
    revalidatePath(`/watchlists/${id}`);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return {
      success: false,
      error: "Error inesperado al actualizar la lista",
    };
  }
}

export async function deleteWatchlist(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al eliminar la lista",
      };
    }

    revalidatePath("/watchlists");
    return {
      success: true,
      message: "Lista eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error deleting watchlist:", error);
    return {
      success: false,
      error: "Error inesperado al eliminar la lista",
    };
  }
}

export async function getWatchlists() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al cargar las listas",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching watchlists:", error);
    return {
      success: false,
      error: "Error inesperado al cargar las listas",
    };
  }
}

export async function getWatchlist(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al cargar la lista",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return {
      success: false,
      error: "Error inesperado al cargar la lista",
    };
  }
}

export async function addTermToWatchlist(
  watchlistId: string,
  data: z.infer<typeof addTermSchema>
) {
  try {
    const validatedData = addTermSchema.parse(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists/${watchlistId}/terms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al agregar el término",
      };
    }

    revalidatePath(`/watchlists/${watchlistId}`);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error adding term:", error);
    return {
      success: false,
      error: "Error inesperado al agregar el término",
    };
  }
}

export async function deleteTermFromWatchlist(
  watchlistId: string,
  termId: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/watchlists/${watchlistId}/terms/${termId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error al eliminar el término",
      };
    }

    revalidatePath(`/watchlists/${watchlistId}`);
    return {
      success: true,
      message: "Término eliminado exitosamente",
    };
  } catch (error) {
    console.error("Error deleting term:", error);
    return {
      success: false,
      error: "Error inesperado al eliminar el término",
    };
  }
}
