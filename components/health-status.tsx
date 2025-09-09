"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getHealthStatus } from "@/lib/actions";
import { CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { HealthStatusSkeleton } from "@/components/skeletons/health-status-skeleton";

interface HealthStatus {
  status: string;
  checks: {
    redis: string;
    db: string;
  };
}

export function HealthStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getHealthStatus();

      if (result.success && "data" in result) {
        setHealth(result.data);
        setLastChecked(new Date());
      } else if ("error" in result) {
        setError(result.error || "Error al verificar el estado del sistema");
      }
    } catch {
      setError("No se pudo conectar con el backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();

    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string | undefined) => {
    if (!status) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;

    switch (status.toLowerCase()) {
      case "ok":
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
      case "unhealthy":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return <Badge variant="secondary">Desconocido</Badge>;

    switch (status.toLowerCase()) {
      case "ok":
      case "healthy":
        return <Badge variant="success">Conectado</Badge>;
      case "error":
      case "unhealthy":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  if (loading && !health) {
    return <HealthStatusSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={checkHealth}
              disabled={loading}
              className="ml-2"
            >
              {loading ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (!health) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {getStatusIcon(health.status)}
        <span className="text-sm font-medium">Backend:</span>
        {getStatusBadge(health.status)}
      </div>

      <div className="flex items-center gap-2">
        {getStatusIcon(health.checks.db)}
        <span className="text-sm font-medium">DB:</span>
        {getStatusBadge(health.checks.db)}
      </div>

      <div className="flex items-center gap-2">
        {getStatusIcon(health.checks.redis)}
        <span className="text-sm font-medium">Redis:</span>
        {getStatusBadge(health.checks.redis)}
      </div>

      {lastChecked && (
        <div className="text-xs text-muted-foreground">
          Última verificación: {lastChecked.toLocaleTimeString()}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={checkHealth}
        disabled={loading}
        className="h-6 w-6 p-0"
      >
        {loading ? (
          <RefreshCw className="h-3 w-3 animate-spin" />
        ) : (
          <RefreshCw className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
