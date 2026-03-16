"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useCallback, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_COLORS, type CategoryCount } from "@/lib/supabase-products";
import type { Product } from "@/lib/supabase-products";

const SUGGEST_DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

const FORM_OPTIONS = [
  { value: "all", label: "All Forms" },
  { value: "Tab", label: "Tablets" },
  { value: "Cap", label: "Capsules" },
  { value: "Syrup", label: "Syrups" },
  { value: "Gel", label: "Gels" },
  { value: "Cream", label: "Creams" },
  { value: "Ointment", label: "Ointments" },
  { value: "Drops", label: "Drops" },
  { value: "Spray", label: "Sprays" },
  { value: "Sachet", label: "Sachets" },
  { value: "Lotion", label: "Lotions" },
];

interface ProductsFilterProps {
  categoryCounts: CategoryCount[];
  activeCategory: string;
  activeSearch: string;
  activeForm: string;
}

export function ProductsFilter({
  categoryCounts,
  activeCategory,
  activeSearch,
  activeForm,
}: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(activeSearch);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Debounced fetch of search suggestions
  useEffect(() => {
    const q = search.trim();
    if (q.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const t = setTimeout(async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setSuggestLoading(true);
      setShowSuggestions(true);
      setHighlightedIndex(-1);

      try {
        const params = new URLSearchParams({ q });
        if (activeCategory && activeCategory !== "all") params.set("category", activeCategory);
        if (activeForm && activeForm !== "all") params.set("form", activeForm);
        const res = await fetch(`/api/products/suggest?${params}`, {
          signal: abortRef.current.signal,
        });
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const json = (await res.json()) as { products?: Product[] };
        setSuggestions(json.products ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setSuggestions([]);
      } finally {
        setSuggestLoading(false);
      }
    }, SUGGEST_DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [search, activeCategory, activeForm]);

  const buildUrl = useCallback(
    (overrides: Record<string, string>) => {
      const params: Record<string, string> = {};
      if (activeCategory !== "all") params.category = activeCategory;
      if (search) params.search = search;
      if (activeForm !== "all") params.form = activeForm;
      Object.assign(params, overrides);

      // Clear page when filters change
      delete params.page;

      // Remove empty / "all" values
      const clean = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v && v !== "all")
      );
      const qs = new URLSearchParams(clean).toString();
      return `${pathname}${qs ? `?${qs}` : ""}`;
    },
    [activeCategory, activeForm, search, pathname]
  );

  const navigate = useCallback(
    (url: string) => {
      startTransition(() => router.push(url));
    },
    [router]
  );

  const selectSuggestion = useCallback(
    (product: Product) => {
      setSearch(product.name);
      setShowSuggestions(false);
      setSuggestions([]);
      navigate(buildUrl({ search: product.name }));
      inputRef.current?.blur();
    },
    [buildUrl, navigate]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
        break;
      case "Enter":
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          e.preventDefault();
          selectSuggestion(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputBlur = () => {
    // Delay so click on suggestion registers
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(buildUrl({ search }));
  };

  const handleCategory = (cat: string) => {
    navigate(buildUrl({ category: cat }));
  };

  const handleForm = (form: string) => {
    navigate(buildUrl({ form }));
  };

  const clearAll = () => {
    setSearch("");
    navigate(pathname);
  };

  const hasFilters = activeCategory !== "all" || activeSearch || activeForm !== "all";

  const sidebar = (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch}>
        <label htmlFor="product-search" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
          Search
        </label>
        <div className="relative" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            id="product-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={handleInputBlur}
            placeholder="Brand name or ingredient..."
            autoComplete="off"
            aria-label="Search products by brand name or ingredient"
            aria-autocomplete="list"
            aria-controls="product-suggestions"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          />
          {showSuggestions && (
            <div
              id="product-suggestions"
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
            >
              {suggestLoading ? (
                <div className="px-4 py-3 text-sm text-slate-500">Searching…</div>
              ) : suggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">No matches</div>
              ) : (
                suggestions.map((product, i) => {
                  const colors = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.miscellaneous;
                  return (
                    <button
                      key={product.id}
                      role="option"
                      aria-selected={i === highlightedIndex}
                      type="button"
                      onClick={() => selectSuggestion(product)}
                      onMouseEnter={() => setHighlightedIndex(i)}
                      className={`w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors ${
                        i === highlightedIndex ? "bg-primary/10" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-semibold text-slate-900 text-sm">{product.name}</span>
                      <span className="text-xs text-slate-500 line-clamp-1">{product.composition}</span>
                      <span className={`inline-flex w-fit text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${colors.badge}`}>
                        {CATEGORY_LABELS[product.category] ?? product.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 w-full bg-primary text-primary-foreground text-sm font-semibold py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Category filter */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Category
        </div>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleCategory("all")}
              className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-xl transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-slate-700 hover:bg-slate-100 font-medium"
              }`}
            >
              <span>All Categories</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${activeCategory === "all" ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                {categoryCounts.reduce((s, c) => s + c.count, 0)}
              </span>
            </button>
          </li>
          {categoryCounts.map((cat) => {
            const isActive = activeCategory === cat.category;
            const colors = CATEGORY_COLORS[cat.category] ?? CATEGORY_COLORS.miscellaneous;
            return (
              <li key={cat.category}>
                <button
                  onClick={() => handleCategory(cat.category)}
                  className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-xl transition-colors ${
                    isActive
                      ? `${colors.bg} ${colors.text} font-bold`
                      : "text-slate-600 hover:bg-slate-100 font-medium"
                  }`}
                >
                  <span>{CATEGORY_LABELS[cat.category] ?? cat.category}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? colors.badge : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dosage form filter */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Dosage Form
        </div>
        <div className="flex flex-wrap gap-2">
          {FORM_OPTIONS.map((opt) => {
            const isActive = activeForm === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleForm(opt.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-rose-600 py-2 border border-dashed border-slate-200 rounded-xl transition-colors"
        >
          <X className="h-4 w-4" />
          Clear all filters
        </button>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="text-xs text-center text-primary animate-pulse font-medium">
          Loading products…
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-xl px-4 py-2.5 w-full mb-4"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {mobileOpen ? "Hide Filters" : "Show Filters"}
          {hasFilters && (
            <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>
        {mobileOpen && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
            {sidebar}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
        {sidebar}
      </div>
    </>
  );
}
