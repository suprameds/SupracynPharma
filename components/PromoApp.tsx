import { Smartphone, Download } from "lucide-react";

export default function PromoApp() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-teal-900 rounded-3xl overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-teal-800/50 border border-teal-700 px-4 py-2 rounded-full text-teal-300 text-sm font-medium">
                                <Smartphone className="h-4 w-4" />
                                <span>Mobile App Exclusive</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                Order on the go. <br />
                                <span className="text-teal-400">Save flat $10.</span>
                            </h2>

                            <p className="text-teal-100 text-lg max-w-md">
                                Download the Supracyn app for faster checkouts, order tracking, and exclusive app-only discounts. Use code <span className="font-mono bg-white/10 px-2 py-1 rounded text-white">APP10</span>.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors">
                                    <Download className="h-5 w-5" />
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Download on the</div>
                                        <div className="text-sm leading-none">App Store</div>
                                    </div>
                                </button>
                                <button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-colors">
                                    <Download className="h-5 w-5" />
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-wider font-semibold text-teal-200">Get it on</div>
                                        <div className="text-sm leading-none">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-center md:justify-end">
                            <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20" />
                                <div className="h-full w-full bg-white relative">
                                    {/* Mock App UI */}
                                    <div className="bg-teal-600 h-32 p-6 pt-12 text-white">
                                        <div className="font-bold text-lg">Hello, Sarah</div>
                                        <div className="text-sm opacity-80">Your medicines are on the way</div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                            <div className="h-3 w-16 bg-gray-100 rounded" />
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                                            <div className="h-3 w-20 bg-gray-100 rounded" />
                                        </div>
                                        <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 mt-8">
                                            <div className="text-teal-800 font-bold text-center">Flat $10 OFF Applied!</div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 flex justify-around text-gray-400">
                                        <div className="w-6 h-6 bg-teal-600 rounded-full" />
                                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
