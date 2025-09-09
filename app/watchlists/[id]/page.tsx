import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";
import { severityTranslations } from "@/lib/translations";
import { getWatchlist, getEvents } from "@/lib/actions";
import { EditWatchlistForm } from "@/components/forms/edit-watchlist-form";
import { AddTermForm } from "@/components/forms/add-term-form";
import { DeleteTermButton } from "@/components/delete-term-button";
import { getSeverityBadgeProps } from "@/lib/badge-utils";
import { AnalyzeEventButton } from "@/components/analyze-event-button";

export default async function WatchlistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Server-side data fetching
  const [watchlistResult, eventsResult] = await Promise.all([
    getWatchlist(id),
    getEvents(),
  ]);

  const watchlist =
    watchlistResult.success && "data" in watchlistResult
      ? watchlistResult.data
      : null;
  const allEvents =
    eventsResult.success && "data" in eventsResult ? eventsResult.data : [];

  // Filter events related to this watchlist (mock logic - in real app would be based on terms)
  const relatedEvents = allEvents.slice(0, 2); // Mock: show first 2 events

  if (!watchlist) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Lista no encontrada</h1>
          <p className="text-muted-foreground mt-2">
            La lista de observación solicitada no existe.
          </p>
        </div>
      </div>
    );
  }

  // Use real terms from the watchlist
  const terms = watchlist.terms || [];
  console.log(terms);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/watchlists">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Listas
            </Button>
          </Link>
        </div>
        <div className="mb-6">
          <EditWatchlistForm watchlist={watchlist} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Términos de Observación */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Términos de Observación</CardTitle>
                  <CardDescription>
                    {terms.length} términos configurados
                  </CardDescription>
                </div>
                <AddTermForm watchlistId={watchlist.id} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{term.term}</p>
                      <p className="text-sm text-muted-foreground">
                        Creado:{" "}
                        {new Date(term.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <DeleteTermButton
                      watchlistId={watchlist.id}
                      termId={term.id}
                      termName={term.term}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Eventos Relacionados */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Eventos Relacionados</CardTitle>
                  <CardDescription>
                    Eventos detectados por los términos de esta lista
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar eventos..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {event.description}
                        </p>
                      </div>
                      <Badge {...getSeverityBadgeProps(event.severity)}>
                        {severityTranslations[event.severity]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {new Date(event.createdAt).toLocaleString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <AnalyzeEventButton
                        eventId={event.id}
                        eventTitle={event.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
