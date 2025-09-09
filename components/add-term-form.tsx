"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addTerm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

interface AddTermFormProps {
  watchlistId: string;
}

export function AddTermForm({ watchlistId }: AddTermFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addTerm(watchlistId, formData);

      if (result.success) {
        setIsOpen(false);
        setRetryCount(0);
        router.refresh(); // Refresh the page to show new term
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al añadir el término";
        setError(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      setError("Error inesperado al añadir el término");
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setError(null);
    setRetryCount(0);
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

      <form action={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="term">Término</Label>
          <Input
            id="term"
            name="term"
            placeholder="Ej: authentication failure"
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
    </div>
  );
}
