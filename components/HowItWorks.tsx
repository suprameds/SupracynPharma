import { Search, Upload, Truck } from "lucide-react";

const steps = [
    {
        title: "Search Your Medicine",
        description: "Type the brand name of your prescribed medicine to find its exact generic equivalent.",
        icon: Search,
    },
    {
        title: "Upload Prescription",
        description: "Our pharmacists verify your prescription to ensure safety and correct dosage.",
        icon: Upload,
    },
    {
        title: "Doorstep Delivery",
        description: "Receive your medicines in discreet packaging within 24-48 hours.",
        icon: Truck,
    },
];

import TexturePattern from "@/components/TexturePattern";

export default function HowItWorks() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 relative transition-colors duration-300">
            <div className="absolute inset-0 z-0">
                <TexturePattern />
            </div>
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Getting affordable medication is simple, safe, and secure.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 border-t-2 border-dashed border-gray-300 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border-4 border-gray-50 group-hover:border-primary/20 transition-colors duration-300">
                                <step.icon className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
