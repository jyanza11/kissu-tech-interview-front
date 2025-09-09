import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { severityTranslations } from "@/lib/translations";
import { getEvents } from "@/lib/actions";
import { SimulateEventForm } from "@/components/forms/simulate-event-form";
import { SimulateDefaultEventDialog } from "@/components/simulate-default-event-dialog";
import { getSeverityBadgeProps } from "@/lib/badge-utils";
import { AnalyzeEventButton } from "@/components/analyze-event-button";

export default async function EventsPage() {
  // Server-side data fetching
  const eventsResult = await getEvents();
  const events =
    eventsResult.success && "data" in eventsResult ? eventsResult.data : [];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Eventos</h1>
          <p className="text-muted-foreground mt-2">
            Monitorea y analiza eventos del sistema
          </p>
        </div>
        <div className="flex gap-2">
          <SimulateDefaultEventDialog />
          <SimulateEventForm />
        </div>
      </div>

      <div className="space-y-6">
        {events && events.length > 0 ? (
          events.map((event) => (
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
                    <AnalyzeEventButton
                      eventId={event.id}
                      eventTitle={event.title}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Creado: {new Date(event.createdAt).toLocaleString("es-ES")}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8 ">
              <p className="text-muted-foreground">
                No hay eventos registrados, puedes simular uno usando el
                formulario o uno predefinido.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
