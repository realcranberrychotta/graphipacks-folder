export default function AboutLoading() {
  return (
    <div className="flex flex-col bg-transparent min-h-screen text-[#F8F4EC]">
      {/* Hero Header Box Skeleton */}
      <div className="border-b border-[#B08D57]/20 border-t-[#B08D57]/30 bg-[#0F2A44]/40 backdrop-blur-xl md:backdrop-blur-2xl py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="h-6 w-64 rounded-full bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-12 sm:h-16 w-3/4 rounded-xl bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-8 w-1/2 rounded-lg bg-[#1B3D5E]/30 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-20 w-full rounded-xl bg-[#1B3D5E]/30 border border-[#B08D57]/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Operational Commitments Bento Skeletons */}
      <div className="border-b border-[#B08D57]/20 bg-[#0F2A44]/30 backdrop-blur-xl py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-md space-y-3 mb-10">
            <div className="h-5 w-40 rounded-full bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
            <div className="h-8 w-72 rounded-lg bg-[#1B3D5E]/40 border border-[#B08D57]/20 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[220px]" />
            <div className="animate-pulse bg-[#0F2A44]/40 border border-[#B08D57]/20 border-t-[#B08D57]/30 backdrop-blur-xl rounded-2xl h-[220px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
