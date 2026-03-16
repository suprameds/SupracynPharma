export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-10">
        {/* PageHeader placeholder */}
        <div className="h-40 bg-slate-200 rounded" />

        <div className="mt-8 md:flex md:items-start md:gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="space-y-6">
              {[0, 1, 2].map((group) => (
                <div key={group} className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-40 bg-slate-200 rounded" />
                  <div className="h-3 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </aside>

          {/* Grid of product cards */}
          <section className="mt-8 md:mt-0 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-white overflow-hidden"
                >
                  <div className="h-44 bg-slate-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

