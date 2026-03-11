import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">

      {/* Product image strip */}
      <div className="relative h-44 bg-slate-50 overflow-hidden flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={`${product.name} packaging`}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* GMP badge overlaid on image */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            GMP
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-3">
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 uppercase text-[10px] tracking-wider font-semibold"
          >
            {product.therapyAreaId.replace(/-/g, " ")}
          </Badge>
          <Badge variant="outline" className="text-primary border-primary/20 text-[10px]">
            {product.dosageForm}
          </Badge>
        </div>

        {/* Name + generic */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium leading-snug mb-3 line-clamp-2">
          {product.genericName}
        </p>

        {/* Summary */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {product.summary}
        </p>

        {/* Specs row */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-5 pb-4 border-b border-slate-100">
          <div>
            <span className="text-slate-400 block mb-0.5">Strength</span>
            <span className="font-semibold text-slate-700">{product.strength}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Pack Size</span>
            <span className="font-semibold text-slate-700">{product.packSize}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between group/btn border-slate-200 hover:border-primary/30"
            >
              View Details
              <ArrowUpRight
                className="h-3.5 w-3.5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all"
                aria-hidden="true"
              />
            </Button>
          </Link>
          <Link href={`/partnerships?product=${product.id}`}>
            <Button size="sm" className="px-4 font-semibold">
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
