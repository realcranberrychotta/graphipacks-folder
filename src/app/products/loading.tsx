export default function ProductsLoading() {
  return (
    <div className="flex flex-col bg-transparent min-h-screen text-[#F8F4EC]">
      {/* Header Skeleton */}
      <div className="border-b border-[#B08D57]/20 border-t-[#B08D57]/30 bg-[#0F2A44]/40 backdrop-blur-xl md:backdrop-blur-2xl py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="h-6 w-48 rounded-full bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-10 sm:h-12 w-3/4 rounded-xl bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-6 w-full rounded-lg bg-[#1B3D5E]/30 border border-[#B08D57]/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bento Grid Skeletons */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
          <div className="col-span-1 md:col-span-3 lg:col-span-8 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-4 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-4 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-8 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-6 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-6 animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[300px]" />
        </div>
      </main>
    </div>
  );
}
