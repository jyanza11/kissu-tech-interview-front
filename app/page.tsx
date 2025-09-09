import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Activity, AlertTriangle } from "lucide-react";
import { severityTranslations } from "@/lib/translations";
import { getWatchlists, getEvents } from "@/lib/actions";
import { CreateWatchlistForm } from "@/components/forms/create-watchlist-form";
import { getSeverityBadgeProps } from "@/lib/badge-utils";
import Link from "next/link";

export default async function Home() {
  // Server-side data fetching
  const [watchlistsResult, eventsResult] = await Promise.all([
    getWatchlists(),
    getEvents(),
  ]);

  const watchlists = watchlistsResult.success ? watchlistsResult.data : [];
  const events = eventsResult.success ? eventsResult.data : [];

  // Calculate metrics
  const totalWatchlists = watchlists?.length || 0;
  const totalEvents = events?.length || 0;
  const criticalEvents =
    events?.filter((event) => event.severity === "CRITICAL").length || 0;
  const highSeverityEvents =
    events?.filter((event) => event.severity === "HIGH").length || 0;

  // Get recent events (last 3)
  const recentEvents = events?.slice(0, 3) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Signal Watcher</h1>
        <p className="text-muted-foreground mt-2">
          Monitorea y analiza eventos del sistema con insights impulsados por IA
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Listas de Observación
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWatchlists}</div>
            <p className="text-xs text-muted-foreground">listas configuradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Totales
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">eventos detectados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Críticos
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {criticalEvents > 0 ? "Requiere atención" : "Todo normal"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alta Severidad
            </CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highSeverityEvents}</div>
            <p className="text-xs text-muted-foreground">
              {highSeverityEvents > 0 ? "Requiere monitoreo" : "Bajo control"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Eventos Recientes</CardTitle>
            <CardDescription>
              Últimos eventos del sistema que requieren atención
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    No hay eventos recientes
                  </p>
                </div>
              ) : (
                recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <Badge {...getSeverityBadgeProps(event.severity)}>
                      {severityTranslations[event.severity]}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listas de Observación</CardTitle>
            <CardDescription>Tus configuraciones de monitoreo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {watchlists && watchlists.length > 0 ? (
                watchlists.slice(0, 3).map((watchlist) => (
                  <div
                    key={watchlist.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{watchlist.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {watchlist.terms?.length || 0} términos configurados
                      </p>
                    </div>
                    <Link href={`/watchlists/${watchlist.id}`}>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    No hay listas configuradas
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <CreateWatchlistForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
