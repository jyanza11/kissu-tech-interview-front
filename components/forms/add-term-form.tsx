"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addTerm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const termFormSchema = z.object({
  term: z.string().min(1, "El término es requerido"),
});

type TermFormData = z.infer<typeof termFormSchema>;

interface AddTermFormProps {
  watchlistId: string;
}

export function AddTermForm({ watchlistId }: AddTermFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const form = useForm<TermFormData>({
    resolver: zodResolver(termFormSchema),
    defaultValues: {
      term: "",
    },
  });

  const onSubmit = async (data: TermFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("term", data.term);

      const result = await addTerm(watchlistId, formData);

      if (result.success) {
        setIsOpen(false);
        setRetryCount(0);
        form.reset();
        toast.success("Término añadido exitosamente");
        router.refresh();
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al añadir el término";
        setError(errorMessage);
        toast.error(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      const errorMessage = "Error inesperado al añadir el término";
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
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Añadir
      </Button>
    );
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Añadir Nuevo Término</h4>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Término</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: authentication failure" {...field} />
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
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting ? "Añadiendo..." : "Añadir Término"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
