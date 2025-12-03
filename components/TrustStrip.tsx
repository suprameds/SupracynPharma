import { Award, ShieldCheck } from "lucide-react";

export default function TrustStrip() {
    return (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
                    Trusted by Leading Healthcare Providers
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Partner Logos (Text Placeholders) */}
                    <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-blue-600">Apollo</span> Hospitals
                    </div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-teal-600">KIMS</span> Health
                    </div>
                    <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-red-600">Care</span> Hospitals
                    </div>

                    <div className="h-8 w-px bg-gray-300 hidden md:block" />

                    {/* Certifications */}
                    <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-gray-600" />
                        <span className="font-semibold text-gray-700">ISO 9001:2015</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-gray-600" />
                        <span className="font-semibold text-gray-700">WHO-GMP Certified</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
