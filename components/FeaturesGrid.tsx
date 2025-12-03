import { ShieldCheck, Tag, Truck, RotateCcw } from "lucide-react";

const features = [
    {
        title: "Genuine Products",
        description: "Sourced directly from our WHO-GMP certified factory.",
        icon: ShieldCheck,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Huge Savings",
        description: "Save up to 80% compared to branded medicines.",
        icon: Tag,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        title: "Fast Delivery",
        description: "Express delivery within 24-48 hours in your city.",
        icon: Truck,
        color: "text-orange-600",
        bg: "bg-orange-50",
    },
    {
        title: "Easy Returns",
        description: "No-questions-asked return policy for unused medicines.",
        icon: RotateCcw,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
];

export default function FeaturesGrid() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {features.map((f, index) => (
                        <div key={index} className="flex flex-col items-center text-center group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className={`w-14 h-14 ${f.bg} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <f.icon className={`h-7 w-7 ${f.color}`} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
