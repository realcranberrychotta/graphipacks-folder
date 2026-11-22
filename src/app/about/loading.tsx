export default function AboutLoading() {
  return (
    <div className="flex flex-col bg-[#F6F2EB] min-h-screen text-[#1C1917]">
      {/* Hero Header Box Skeleton */}
      <div className="border-b border-[#A6864C]/20 bg-[#EDE6DA] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="h-6 w-64 rounded-full bg-[#FBF9F5] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-12 sm:h-16 w-3/4 rounded-xl bg-[#FBF9F5] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-8 w-1/2 rounded-lg bg-[#FBF9F5] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-20 w-full rounded-xl bg-[#FBF9F5] border border-[#1C1917]/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Operational Commitments Bento Skeletons */}
      <div className="border-b border-[#A6864C]/20 bg-[#F6F2EB] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-3 mb-10">
            <div className="h-5 w-40 rounded-full bg-[#EDE6DA] border border-[#1C1917]/10 animate-pulse" />
            <div className="h-8 w-72 rounded-lg bg-[#EDE6DA] border border-[#1C1917]/10 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#FBF9F5] border border-[#1C1917]/10 rounded-2xl h-[220px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
