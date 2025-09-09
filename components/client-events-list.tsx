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
import { Brain, Calendar } from "lucide-react";
import { severityTranslations } from "@/lib/translations";
import { getEvents } from "@/lib/actions";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { getSeverityBadgeProps } from "@/lib/badge-utils";

interface Event {
  id: string;
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  createdAt: string;
}

export function ClientEventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const result = await getEvents();

        if (result.success && "data" in result) {
          setEvents(result.data);
        } else {
          setError("Error al cargar los eventos");
        }
      } catch {
        setError("Error inesperado");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
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
    <LoadingWrapper isLoading={isLoading} type="events" count={5}>
      <div className="space-y-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    <Badge {...getSeverityBadgeProps(event.severity)}>
                      {severityTranslations[event.severity]}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-2" />
                    Analizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Creado: {new Date(event.createdAt).toLocaleString("es-ES")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </LoadingWrapper>
  );
}
