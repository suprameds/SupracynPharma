import { ShieldCheck, FlaskConical, Award } from "lucide-react";

export default function QualitySection() {
    return (
        <section className="py-20 bg-teal-900 dark:bg-gray-950 text-white relative overflow-hidden transition-colors duration-300">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/quality-bg.png" alt="Lab Background" className="w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-overlay" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Uncompromising Quality Standards</h2>
                        <p className="text-teal-100 text-lg leading-relaxed mb-8">
                            At Supracyn, we believe that affordable medicine should never mean lower quality.
                            Our state-of-the-art manufacturing facilities adhere to the strictest global standards.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-teal-800 p-3 rounded-lg">
                                    <ShieldCheck className="h-6 w-6 text-teal-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">WHO-GMP Certified</h3>
                                    <p className="text-teal-200 text-sm">Manufacturing practices that meet World Health Organization standards.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-teal-800 p-3 rounded-lg">
                                    <FlaskConical className="h-6 w-6 text-teal-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Rigorous Lab Testing</h3>
                                    <p className="text-teal-200 text-sm">Every batch undergoes 50+ quality checks before release.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-teal-800 p-3 rounded-lg">
                                    <Award className="h-6 w-6 text-teal-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">FDA Approved Facilities</h3>
                                    <p className="text-teal-200 text-sm">Compliant with international regulatory requirements.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-teal-800/50 p-8 rounded-2xl border border-teal-700 backdrop-blur-sm">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Our Promise</h3>
                            <p className="text-teal-200">100% Satisfaction Guarantee</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-teal-900/50 p-4 rounded-xl">
                                <div className="text-3xl font-bold text-teal-300 mb-1">1M+</div>
                                <div className="text-xs text-teal-200 uppercase tracking-wide">Pills Delivered</div>
                            </div>
                            <div className="bg-teal-900/50 p-4 rounded-xl">
                                <div className="text-3xl font-bold text-teal-300 mb-1">50k+</div>
                                <div className="text-xs text-teal-200 uppercase tracking-wide">Happy Patients</div>
                            </div>
                            <div className="bg-teal-900/50 p-4 rounded-xl">
                                <div className="text-3xl font-bold text-teal-300 mb-1">85%</div>
                                <div className="text-xs text-teal-200 uppercase tracking-wide">Average Savings</div>
                            </div>
                            <div className="bg-teal-900/50 p-4 rounded-xl">
                                <div className="text-3xl font-bold text-teal-300 mb-1">24/7</div>
                                <div className="text-xs text-teal-200 uppercase tracking-wide">Pharmacist Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
