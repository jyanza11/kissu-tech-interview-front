"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { simulateEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { toast } from "sonner";

export function SimulateDefaultEventDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const router = useRouter();

  const handleSimulate = async () => {
    setIsSimulating(true);

    try {
      const formData = new FormData();
      formData.append("title", "Evento de prueba generado");
      formData.append(
        "description",
        "Este es un evento simulado para probar el sistema de monitoreo. Se generó automáticamente para demostrar la funcionalidad."
      );
      formData.append("severity", "MEDIUM");

      const result = await simulateEvent(formData);

      if (result.success) {
        setIsOpen(false);
        toast.success("Evento simulado creado exitosamente");
        router.refresh();
      } else {
        toast.error(
          "error" in result ? result.error : "Error al simular el evento"
        );
      }
    } catch {
      toast.error("Error inesperado al simular el evento");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Simular Evento
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Simular Evento de Prueba</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Deseas generar un evento simulado para probar el sistema? Se creará
            un evento con severidad &quot;Medio&quot; y datos de ejemplo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSimulating}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSimulate}
            disabled={isSimulating}
            className="bg-primary hover:bg-primary/90"
          >
            {isSimulating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Simulando...
              </>
            ) : (
              <>Confirmar</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
