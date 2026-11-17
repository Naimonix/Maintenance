export function LoadingSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading equipment status">
      {/* Filter Deck Skeleton */}
      <div className="bg-white/80 dark:bg-[#18181C]/80 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 h-28 animate-pulse" />

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white/80 dark:bg-[#18181C]/80 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl h-32 animate-pulse"
          />
        ))}
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white/80 dark:bg-[#18181C]/80 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl h-44 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
