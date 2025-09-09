import { getWatchlists } from "@/lib/actions/watchlist-actions";
import { CreateWatchlistForm } from "@/components/create-watchlist-form";
import { WatchlistCard } from "@/components/watchlist-card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function WatchlistsPage() {
  const result = await getWatchlists();
  console.log(result);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Listas de Observación</h1>
        <p className="text-gray-600">
          Gestiona las listas de términos que quieres monitorear
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CreateWatchlistForm />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Listas Existentes</h2>

          {!result.success ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{result.error}</p>
            </div>
          ) : !result.data || result.data.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No hay listas de observación</p>
              <p className="text-sm text-gray-400">
                Crea tu primera lista para comenzar a monitorear términos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {result.data?.map((watchlist: any) => (
                <WatchlistCard key={watchlist.id} watchlist={watchlist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WatchlistListSkeleton() {
  return (
    <div data-testid="watchlist-list-skeleton" className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-3 w-2/3 mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  );
}
