"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/supabase-products";

const SUGGEST_DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

type ProductSuggestion = {
  id: number;
  name: string;
  composition: string | null;
  category: string;
  form: string | null;
};

interface PortalProductSearchProps {
  defaultSearch: string;
  defaultCategory: string;
}

export function PortalProductSearch({
  defaultSearch,
  defaultCategory,
}: PortalProductSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(defaultSearch);
  const [category, setCategory] = useState(defaultCategory);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Sync state when URL params change (e.g. navigation, pagination)
  useEffect(() => {
    setSearch(defaultSearch);
    setCategory(defaultCategory);
  }, [defaultSearch, defaultCategory]);

  // Debounced fetch (portal: include inactive products)
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
        const params = new URLSearchParams({ q, active_only: "false" });
        if (category && category !== "all") params.set("category", category);
        const res = await fetch(`/api/products/suggest?${params}`, {
          signal: abortRef.current.signal,
        });
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const json = (await res.json()) as { products?: ProductSuggestion[] };
        setSuggestions(json.products ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setSuggestions([]);
      } finally {
        setSuggestLoading(false);
      }
    }, SUGGEST_DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [search, category]);

  const buildUrl = useCallback(
    (overrides: Record<string, string>) => {
      const params: Record<string, string> = {};
      if (category !== "all") params.category = category;
      if (search) params.search = search;
      Object.assign(params, overrides);
      params.page = "1";
      const clean = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v && v !== "all")
      );
      const qs = new URLSearchParams(clean).toString();
      return `${pathname}${qs ? `?${qs}` : ""}`;
    },
    [category, search, pathname]
  );

  const selectSuggestion = useCallback(
    (product: ProductSuggestion) => {
      setSearch(product.name);
      setShowSuggestions(false);
      setSuggestions([]);
      inputRef.current?.blur();
      router.push(buildUrl({ search: product.name }));
    },
    [buildUrl, router]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) =>
          i < suggestions.length - 1 ? i + 1 : 0
        );
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildUrl({ search, category }));
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search name or composition..."
          autoComplete="off"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={showSuggestions && suggestions.length > 0}
          className="h-9 w-56 rounded-md border border-slate-300 bg-white px-3 text-sm"
        />
        {showSuggestions && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg"
          >
            {suggestLoading ? (
              <div className="px-4 py-3 text-sm text-slate-500">
                Searching…
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-500">
                No matches
              </div>
            ) : (
              suggestions.map((product, i) => {
                const colors =
                  CATEGORY_COLORS[product.category] ??
                  CATEGORY_COLORS.miscellaneous;
                return (
                  <button
                    key={product.id}
                    type="button"
                    role="option"
                    aria-selected={i === highlightedIndex}
                    onClick={() => selectSuggestion(product)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      i === highlightedIndex
                        ? "bg-primary/10"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-medium text-slate-900">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {product.composition}
                    </div>
                    <span
                      className={`mt-1 inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded ${colors.badge}`}
                    >
                      {CATEGORY_LABELS[product.category] ?? product.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-9 w-48 rounded-md border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="all">All categories</option>
        {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
          <option key={slug} value={slug}>
            {label}
          </option>
        ))}
      </select>
      <Button type="submit" variant="outline">
        Filter
      </Button>
    </form>
  );
}
