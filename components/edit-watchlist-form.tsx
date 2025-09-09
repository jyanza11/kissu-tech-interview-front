"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updateWatchlist } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Edit, Save, X } from "lucide-react";

interface EditWatchlistFormProps {
  watchlist: {
    id: string;
    name: string;
    description: string;
  };
}

export function EditWatchlistForm({ watchlist }: EditWatchlistFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await updateWatchlist(watchlist.id, formData);

      if (result.success) {
        setIsEditing(false);
        setRetryCount(0);
        router.refresh(); // Refresh the page to show updated data
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al actualizar la lista";
        setError(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      setError("Error inesperado al actualizar la lista");
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setRetryCount(0);
  };

  const handleRetry = () => {
    setError(null);
    setRetryCount(0);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">{watchlist.name}</h1>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Editar Lista de Observación</CardTitle>
        <CardDescription>
          Modifica los detalles de esta lista de observación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              defaultValue={watchlist.name}
              placeholder="Ej: Lista de Seguridad"
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                {error}
                {retryCount > 0 && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="text-xs"
                    >
                      Reintentar ({retryCount}/3)
                    </Button>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
