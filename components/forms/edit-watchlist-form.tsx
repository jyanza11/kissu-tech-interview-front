"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { watchlistFormSchema, type WatchlistFormData } from "@repo/schemas";
import { toast } from "sonner";

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

  const form = useForm<WatchlistFormData>({
    resolver: zodResolver(watchlistFormSchema),
    defaultValues: {
      name: watchlist.name,
      description: watchlist.description,
    },
  });

  const onSubmit = async (data: WatchlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);

      const result = await updateWatchlist(watchlist.id, formData);

      if (result.success) {
        setIsEditing(false);
        setRetryCount(0);
        toast.success("Lista de observación actualizada exitosamente");
        router.refresh();
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al actualizar la lista";
        setError(errorMessage);
        toast.error(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      const errorMessage = "Error inesperado al actualizar la lista";
      setError(errorMessage);
      toast.error(errorMessage);
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setRetryCount(0);
    form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Lista de Seguridad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el propósito de esta lista..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
        </Form>
      </CardContent>
    </Card>
  );
}
