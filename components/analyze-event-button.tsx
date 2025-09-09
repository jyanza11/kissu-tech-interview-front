"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { analyzeEvent, getEventAnalysis } from "@/lib/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getSeverityBadgeProps } from "@/lib/badge-utils";
import { severityTranslations } from "@/lib/translations";

interface AnalyzeEventButtonProps {
  eventId: string;
  eventTitle: string;
}

interface AnalysisData {
  eventId: string;
  summary: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  action: string;
}

export function AnalyzeEventButton({
  eventId,
  eventTitle,
}: AnalyzeEventButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [hasAnalysis, setHasAnalysis] = useState<boolean | null>(null);

  const handleAnalyzeOrView = async () => {
    setIsLoading(true);
    try {
      // First, check if analysis already exists
      const existingResult = await getEventAnalysis(eventId);

      if (
        existingResult.success &&
        "data" in existingResult &&
        existingResult.data
      ) {
        // Analysis exists, show it
        const latestAnalysis = Array.isArray(existingResult.data)
          ? existingResult.data[existingResult.data.length - 1]
          : existingResult.data;

        if (latestAnalysis) {
          setAnalysis(latestAnalysis);
          setHasAnalysis(true);
          setIsOpen(true);
          toast.success("Análisis existente cargado");
          return;
        }
      }

      // No existing analysis, generate new one
      const result = await analyzeEvent(eventId);
      console.log(result);

      if (result.success && "data" in result && result.data) {
        setAnalysis(result.data);
        setHasAnalysis(false);
        setIsOpen(true);
        toast.success("Nuevo análisis completado exitosamente");
      } else {
        toast.error(
          "error" in result ? result.error : "Error al analizar el evento"
        );
      }
    } catch (error) {
      console.error("Error analyzing event:", error);
      toast.error("Error inesperado al analizar el evento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeEvent(eventId);
      console.log(result);

      if (result.success && "data" in result && result.data) {
        setAnalysis(result.data);
        setHasAnalysis(false);
        toast.success("Análisis regenerado exitosamente");
      } else {
        toast.error(
          "error" in result ? result.error : "Error al regenerar el análisis"
        );
      }
    } catch (error) {
      console.error("Error regenerating analysis:", error);
      toast.error("Error inesperado al regenerar el análisis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAnalyzeOrView}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Brain className="h-4 w-4 mr-2" />
          )}
          {isLoading ? "Cargando..." : "Ver Análisis"}
        </Button>
      </div>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Análisis del Evento</DialogTitle>
          <DialogDescription>
            Análisis de: {eventTitle}
            {hasAnalysis && (
              <span className="ml-2 text-xs text-green-600">
                (Análisis existente)
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {analysis ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Severidad:</span>
                <Badge {...getSeverityBadgeProps(analysis.severity)}>
                  {severityTranslations[analysis.severity]}
                </Badge>
              </div>
              {hasAnalysis && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateAnalysis}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Regenerar
                </Button>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Resumen:</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {analysis.summary}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Acción Recomendada:</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {analysis.action}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No hay análisis disponible para este evento
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
