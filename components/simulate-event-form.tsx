"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { simulateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SimulateEventForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await simulateEvent(formData);

      if (result.success) {
        setIsOpen(false);
        setRetryCount(0);
        router.refresh(); // Refresh the page to show new event
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al simular el evento";
        setError(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      setError("Error inesperado al simular el evento");
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setRetryCount(0);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Simular Evento
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simular Nuevo Evento</CardTitle>
        <CardDescription>Crea un evento simulado para pruebas</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="Ej: Fallo de autenticación detectado"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe el evento en detalle..."
              required
            />
          </div>
          <div>
            <Label htmlFor="severity">Severidad</Label>
            <Select name="severity" required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la severidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Bajo</SelectItem>
                <SelectItem value="MEDIUM">Medio</SelectItem>
                <SelectItem value="HIGH">Alto</SelectItem>
                <SelectItem value="CRITICAL">Crítico</SelectItem>
              </SelectContent>
            </Select>
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
              {isSubmitting ? "Simulando..." : "Simular Evento"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
