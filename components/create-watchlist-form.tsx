"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWatchlist } from "@/lib/actions/watchlist-actions";
import { toast } from "sonner";

const createWatchlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

type CreateWatchlistFormData = z.infer<typeof createWatchlistSchema>;

export function CreateWatchlistForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWatchlistFormData>({
    resolver: zodResolver(createWatchlistSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateWatchlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createWatchlist(data);
      if (result.success) {
        toast.success("Lista creada exitosamente");
        reset();
        router.refresh();
      } else {
        setError(result.error || "Error al crear la lista");
        toast.error(result.error || "Error al crear la lista");
      }
    } catch (error) {
      const errorMessage = "Error inesperado al crear la lista";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Crear Nueva Lista</h2>
        <p className="text-gray-600">
          Crea una nueva lista de términos para monitorear
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la lista</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Ej: Términos de seguridad"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                setError(null);
                handleSubmit(onSubmit)();
              }}
            >
              Reintentar
            </Button>
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creando..." : "Crear Lista"}
        </Button>
      </form>
    </div>
  );
}
