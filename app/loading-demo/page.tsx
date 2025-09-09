import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/loading-states";
import { HealthStatusSkeleton } from "@/components/skeletons/health-status-skeleton";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";

export default function LoadingDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Loading States Demo</h1>
          <p className="text-muted-foreground">
            Esta página muestra todos los estados de carga disponibles en la
            aplicación.
          </p>
        </div>

        {/* Dashboard Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState type="dashboard" />
          </CardContent>
        </Card>

        {/* Watchlists Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Watchlists Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState type="watchlists" count={4} />
          </CardContent>
        </Card>

        {/* Events Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Events Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState type="events" count={3} />
          </CardContent>
        </Card>

        {/* Watchlist Detail Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Watchlist Detail Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingState type="watchlist-detail" />
          </CardContent>
        </Card>

        {/* Health Status Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Health Status Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <HealthStatusSkeleton />
          </CardContent>
        </Card>

        {/* Form Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Form Skeleton</CardTitle>
          </CardHeader>
          <CardContent>
            <FormSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
