export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-10">
        {/* PageHeader placeholder */}
        <div className="h-40 bg-slate-200 rounded" />

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white overflow-hidden">
              <div className="h-48 bg-slate-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-2/3 bg-slate-200 rounded" />
                <div className="h-3 w-1/2 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

