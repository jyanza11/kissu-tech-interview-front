"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { deleteTerm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface DeleteTermButtonProps {
  watchlistId: string;
  termId: string;
  termName: string;
}

export function DeleteTermButton({
  watchlistId,
  termId,
  termName,
}: DeleteTermButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteTerm(watchlistId, termId);

      if (result.success) {
        toast.success("Término eliminado exitosamente");
        router.refresh(); // Refresh the page to show updated terms
      } else {
        const errorMessage =
          "error" in result ? result.error : "Error al eliminar el término";
        toast.error(errorMessage);
      }
    } catch {
      const errorMessage = "Error inesperado al eliminar el término";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <Alert variant="destructive" className="flex-1">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            ¿Eliminar &quot;{termName}&quot;?
            <div className="mt-2 flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Confirmar"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setShowConfirm(true)}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  );
}
