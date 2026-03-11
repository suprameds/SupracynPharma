"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { type Product } from "@/data/products";
import { type TherapyArea } from "@/data/therapy-areas";
import { ProductCard } from "@/components/blocks/product-card";

const DOSAGE_FORMS = ["Tablet", "Capsule", "Syrup", "Injectable"] as const;

type Props = {
  products: Product[];
  therapyAreas: TherapyArea[];
  initialTherapy?: string;
};

export function ProductsFilter({ products, therapyAreas, initialTherapy }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTherapy, setSelectedTherapy] = useState<string>(initialTherapy ?? "all");
  const [selectedForms, setSelectedForms] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<"az" | "therapy">("az");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  function pushTherapyToUrl(value: string) {
    if (value === "all") {
      router.push("/products");
    } else {
      const current = new URLSearchParams(searchParams?.toString());
      current.set("therapy", value);
      // Only keep therapy for now; if more server-side filters are added later, include them here.
      router.push(`/products?${current.toString()}`);
    }
  }

  function handleSelectTherapy(value: string) {
    setSelectedTherapy(value);
    pushTherapyToUrl(value);
  }

  function toggleForm(form: string) {
    setSelectedForms((prev) => {
      const next = new Set(prev);
      next.has(form) ? next.delete(form) : next.add(form);
      return next;
    });
  }

  // Sync from URL on mount or when URL/initialTherapy changes
  useEffect(() => {
    const fromUrl = searchParams?.get("therapy") ?? undefined;
    const next = (fromUrl ?? initialTherapy ?? "all");
    setSelectedTherapy(next);
  }, [searchParams, initialTherapy]);

  const filtered = useMemo(() => {
    let list = products;

    if (selectedTherapy !== "all") {
      list = list.filter((p) => p.therapyAreaId === selectedTherapy);
    }

    if (selectedForms.size > 0) {
      list = list.filter((p) => selectedForms.has(p.dosageForm));
    }

    if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort((a, b) => a.therapyAreaId.localeCompare(b.therapyAreaId));
    }

    return list;
  }, [products, selectedTherapy, selectedForms, sort]);

  return (
    <div className="flex flex-col md:flex-row gap-8">

      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-8" aria-label="Product filters">
        {/* Mobile toggle */}
        <button
          className="md:hidden w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 mb-4"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters {(selectedTherapy !== "all" || selectedForms.size > 0) && `(${(selectedTherapy !== "all" ? 1 : 0) + selectedForms.size} active)`}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>

        <div className={showFilters ? "block" : "hidden md:block"}>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Therapy Areas
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleSelectTherapy("all")}
                  className={`text-sm font-medium w-full text-left py-1 transition-colors ${
                    selectedTherapy === "all"
                      ? "text-primary font-semibold"
                      : "text-slate-600 hover:text-primary"
                  }`}
                  aria-pressed={selectedTherapy === "all"}
                >
                  All Areas
                </button>
              </li>
              {therapyAreas.map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => handleSelectTherapy(area.id)}
                    className={`text-sm w-full text-left py-1 transition-colors ${
                      selectedTherapy === area.id
                        ? "text-primary font-semibold"
                        : "text-slate-600 hover:text-primary"
                    }`}
                    aria-pressed={selectedTherapy === area.id}
                  >
                    {area.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Dosage Forms
            </h3>
            <ul className="space-y-2">
              {DOSAGE_FORMS.map((form) => (
                <li key={form}>
                  <label className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedForms.has(form)}
                      onChange={() => toggleForm(form)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>{form}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {(selectedTherapy !== "all" || selectedForms.size > 0) && (
            <button
              onClick={() => {
                handleSelectTherapy("all");
                setSelectedForms(new Set());
              }}
              className="text-xs text-slate-400 hover:text-slate-700 underline transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      {/* Product grid */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center text-sm text-slate-600">
          <span>
            Showing <strong>{filtered.length}</strong> of {products.length} products
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "az" | "therapy")}
            className="border border-slate-200 rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary bg-white"
            aria-label="Sort products"
          >
            <option value="az">A–Z</option>
            <option value="therapy">Therapy Area</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg font-medium mb-2">No products match your filters.</p>
            <button
              onClick={() => { setSelectedTherapy("all"); setSelectedForms(new Set()); }}
              className="text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
