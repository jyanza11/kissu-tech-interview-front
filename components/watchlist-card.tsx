"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { deleteWatchlist } from "@/lib/actions/watchlist-actions";
import { toast } from "sonner";

interface Watchlist {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  terms: Array<{
    id: string;
    term: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

interface WatchlistCardProps {
  watchlist: Watchlist;
}

export function WatchlistCard({ watchlist }: WatchlistCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteWatchlist(watchlist.id);
      if (result.success) {
        toast.success("Lista eliminada exitosamente");
        router.refresh();
      } else {
        toast.error(result.error || "Error al eliminar la lista");
      }
    } catch (error) {
      toast.error("Error inesperado al eliminar la lista");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStatusBadge = () => {
    if (watchlist.isActive) {
      return <Badge className="bg-green-100 text-green-800">Activa</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800">Inactiva</Badge>;
  };

  const getTermCount = () => {
    const count = watchlist.terms.length;
    return count === 1 ? "1 término" : `${count} términos`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{watchlist.name}</CardTitle>
            <CardDescription>{watchlist.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{getTermCount()}</span>
            <span>Creada: {formatDate(watchlist.createdAt)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/watchlists/${watchlist.id}`)}
            >
              Ver
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar lista?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente la lista y todos sus términos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
