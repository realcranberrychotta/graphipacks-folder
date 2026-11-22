export default function ProductsLoading() {
  return (
    <div className="flex flex-col bg-[#F6F2EB] min-h-screen text-[#1C1917]">
      {/* Header Skeleton */}
      <div className="border-b border-[#A6864C]/20 bg-[#EDE6DA] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="h-6 w-48 rounded-full bg-[#F6F2EB] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-10 sm:h-12 w-3/4 rounded-xl bg-[#F6F2EB] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-6 w-full rounded-lg bg-[#F6F2EB]/70 border border-[#1C1917]/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid Skeletons */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
          <div className="col-span-1 md:col-span-3 lg:col-span-8 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-4 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-4 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-8 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-6 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
          <div className="col-span-1 md:col-span-3 lg:col-span-6 animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[300px]" />
        </div>
      </main>
    </div>
  );
}
