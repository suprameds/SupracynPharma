import { Wallet, ArrowRight } from "lucide-react";

interface ComparisonCardProps {
    brand: string;
    brandPrice: number;
    supracynPrice: number;
}

export default function ComparisonCard({ brand, brandPrice, supracynPrice }: ComparisonCardProps) {
    const savings = Math.round(((brandPrice - supracynPrice) / brandPrice) * 100);

    return (
        <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
            {/* Savings Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary to-teal-600 text-white px-4 py-1 rounded-bl-xl font-bold text-sm shadow-sm">
                Save {savings}%
            </div>

            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-teal-50 p-3 rounded-xl group-hover:bg-teal-100 transition-colors">
                        <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{brand}</h3>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Generic Equivalent</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-gray-600 font-medium">Brand Price</span>
                    <span className="text-red-500 font-semibold line-through decoration-red-500/50">${brandPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-teal-50 rounded-xl border border-teal-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    <span className="relative text-teal-900 font-bold">Supracyn Price</span>
                    <div className="relative flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">${supracynPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    In Stock
                </span>
                <button className="text-primary font-semibold hover:text-teal-700 flex items-center gap-1 transition-colors">
                    Add to Cart <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
