import { Product } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 uppercase text-[10px] tracking-wider font-semibold">
            {product.therapyAreaId.replace("-", " ")}
          </Badge>
          <Badge variant="outline" className="text-primary border-primary/20">
            {product.dosageForm}
          </Badge>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-snug">
          {product.genericName}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <div className="space-y-4">
          <div className="text-sm text-slate-600 line-clamp-2">
            {product.summary}
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div>
              <span className="text-slate-400 block text-xs mb-0.5">Strength</span>
              <span className="font-medium text-slate-700">{product.strength}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs mb-0.5">Pack Size</span>
              <span className="font-medium text-slate-700">{product.packSize}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-slate-100 flex gap-3">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full justify-between group">
            Details
            <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Button>
        </Link>
        <Link href={`/partnerships?product=${product.id}`}>
          <Button variant="default" className="px-5">
            Inquire
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
