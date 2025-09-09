"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { getWatchlists } from "@/lib/actions";
import { LoadingWrapper } from "@/components/loading-wrapper";

interface Watchlist {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  terms: Array<{
    id: string;
    term: string;
  }>;
}

export function ClientWatchlistList() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        setIsLoading(true);
        const result = await getWatchlists();

        if (result.success && "data" in result) {
          setWatchlists(result.data);
        } else {
          setError("Error al cargar las listas");
        }
      } catch {
        setError("Error inesperado");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <LoadingWrapper isLoading={isLoading} type="watchlists" count={6}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlists.map((watchlist) => (
          <Card key={watchlist.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{watchlist.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {watchlist.description || "Sin descripción"}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {watchlist.terms.length} términos
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {watchlist.terms.slice(0, 3).map((term) => (
                  <div key={term.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      {term.term}
                    </span>
                  </div>
                ))}
                {watchlist.terms.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{watchlist.terms.length - 3} más...
                  </p>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Creado:{" "}
                  {new Date(watchlist.createdAt).toLocaleDateString("es-ES")}
                </span>
                <div className="flex gap-2">
                  <Link href={`/watchlists/${watchlist.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </LoadingWrapper>
  );
}
