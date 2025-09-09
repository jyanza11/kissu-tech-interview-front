"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Label is not used in this component
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
import { createWatchlist } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus, Save, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const watchlistFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

type WatchlistFormData = z.infer<typeof watchlistFormSchema>;

export function CreateWatchlistForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const form = useForm<WatchlistFormData>({
    resolver: zodResolver(watchlistFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: WatchlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
    const formData = new FormData();
    formData.append("name", data.name);

      const result = await createWatchlist(formData);

      if (result.success) {
        setIsOpen(false);
        setRetryCount(0);
        form.reset();
        toast.success("Lista de observación creada exitosamente");
        router.refresh();
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al crear la lista";
        setError(errorMessage);
        toast.error(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      const errorMessage = "Error inesperado al crear la lista";
      setError(errorMessage);
      toast.error(errorMessage);
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setError(null);
    setRetryCount(0);
    form.reset();
  };

  const handleRetry = () => {
    setError(null);
    setRetryCount(0);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Crear Lista
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crear Nueva Lista de Observación</CardTitle>
        <CardDescription>
          Configura una nueva lista de monitoreo para rastrear eventos
          específicos
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
                    Creando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Crear Lista
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
