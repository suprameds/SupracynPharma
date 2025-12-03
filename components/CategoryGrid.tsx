import { Droplet, Heart, Activity, Pill, Baby, Sparkles } from "lucide-react";

const categories = [
    {
        name: "Diabetes Care",
        icon: Droplet,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        className: "md:col-span-2 md:row-span-2",
        description: "Manage your sugar levels with affordable insulin and tablets."
    },
    {
        name: "Cardiac Health",
        icon: Heart,
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-100",
        className: "md:col-span-2",
        description: "Complete heart care solutions for hypertension and cholesterol."
    },
    {
        name: "Blood Pressure",
        icon: Activity,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-100",
        className: "md:col-span-1",
        description: "Keep your BP in check."
    },
    {
        name: "Antibiotics",
        icon: Pill,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        className: "md:col-span-1",
        description: "Effective infection control."
    },
    {
        name: "Mother & Baby",
        icon: Baby,
        color: "text-pink-600",
        bg: "bg-pink-50",
        border: "border-pink-100",
        className: "md:col-span-2",
        description: "Essential care for mom and newborn."
    },
    {
        name: "Personal Hygiene",
        icon: Sparkles,
        color: "text-teal-600",
        bg: "bg-teal-50",
        border: "border-teal-100",
        className: "md:col-span-2",
        description: "Stay clean and healthy every day."
    },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find affordable generic alternatives for the most common chronic conditions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
                    {categories.map((c) => (
                        <div
                            key={c.name}
                            className={`group relative p-8 rounded-3xl border ${c.border} hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden bg-white hover:-translate-y-1 ${c.className}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${c.bg} rounded-bl-full opacity-50 transition-transform group-hover:scale-110`} />

                            <div className={`h-14 w-14 mb-6 ${c.bg} rounded-2xl flex items-center justify-center relative z-10`}>
                                <c.icon className={`h-7 w-7 ${c.color}`} />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{c.name}</h3>
                                <p className="text-sm text-gray-500 font-medium">{c.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
