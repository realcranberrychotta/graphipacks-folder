export default function AboutLoading() {
  return (
    <div className="flex flex-col bg-background min-h-screen text-ink">
      {/* Hero Header Box Skeleton */}
      <div className="border-b border-powder/40 bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="h-6 w-64 rounded-full bg-background border border-ink/10 animate-pulse" />
            <div className="h-12 sm:h-16 w-3/4 rounded-xl bg-background border border-ink/10 animate-pulse" />
            <div className="h-8 w-1/2 rounded-lg bg-background border border-ink/10 animate-pulse" />
            <div className="h-20 w-full rounded-xl bg-background border border-ink/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Operational Commitments Bento Skeletons */}
      <div className="border-b border-powder/40 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-3 mb-10">
            <div className="h-5 w-40 rounded-full bg-surface border border-ink/10 animate-pulse" />
            <div className="h-8 w-72 rounded-lg bg-surface border border-ink/10 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animate-pulse bg-background border border-ink/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-background border border-ink/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-background border border-ink/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-background border border-ink/10 rounded-2xl h-[220px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
