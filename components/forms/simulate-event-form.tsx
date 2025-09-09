"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { simulateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus, Save, X } from "lucide-react";
import { z } from "zod";
import { severityTranslations } from "@/lib/translations";
import { toast } from "sonner";

const eventFormSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

type EventFormData = z.infer<typeof eventFormSchema>;

export function SimulateEventForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      severity: "MEDIUM",
    },
  });

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("severity", data.severity);

      const result = await simulateEvent(formData);

      if (result.success) {
        setIsOpen(false);
        setRetryCount(0);
        form.reset();
        toast.success("Evento simulado creado exitosamente");
        router.refresh();
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al simular el evento";
        setError(errorMessage);
        toast.error(errorMessage);
        setRetryCount((prev) => prev + 1);
      }
    } catch {
      const errorMessage = "Error inesperado al simular el evento";
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
        Simular Evento
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Simular Nuevo Evento</CardTitle>
        <CardDescription>
          Crea un evento simulado para probar el sistema de monitoreo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Fallo de autenticación detectado"
                      {...field}
                    />
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
                      placeholder="Describe el evento en detalle..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Severidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la severidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">
                        {severityTranslations.LOW}
                      </SelectItem>
                      <SelectItem value="MEDIUM">
                        {severityTranslations.MEDIUM}
                      </SelectItem>
                      <SelectItem value="HIGH">
                        {severityTranslations.HIGH}
                      </SelectItem>
                      <SelectItem value="CRITICAL">
                        {severityTranslations.CRITICAL}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                    Simulando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simular Evento
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
