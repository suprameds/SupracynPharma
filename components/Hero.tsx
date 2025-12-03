import { Pill, Search, CheckCircle, Upload } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/hero-bg.png" alt="Background" className="w-full h-full object-cover dark:opacity-30 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50/95 via-white/90 to-white dark:from-gray-950/95 dark:via-gray-950/90 dark:to-gray-950 transition-colors duration-300" />
            </div>

            <div className="relative z-10 w-full max-w-4xl p-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm border border-teal-100 dark:border-teal-900 animate-fade-in-up">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-teal-800 dark:text-teal-300">Trusted by 10,000+ Patients</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                    Premium Generics, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Factory Direct Prices.
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Save up to 85% on your monthly medical bills without compromising on quality.
                    Direct from our WHO-GMP certified facility to your doorstep.
                </p>

                <div className="relative max-w-2xl mx-auto group mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200" />
                    <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 border border-gray-100">
                        <div className="pl-6 pr-4">
                            <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for medicines (e.g., Lipitor)..."
                            className="flex-1 py-4 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                        />
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold transition-all duration-200 hidden sm:flex items-center gap-2">
                            <span>Search</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-primary hover:bg-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 w-full sm:w-auto justify-center">
                        <Upload className="h-5 w-5" />
                        <span>Upload Prescription</span>
                    </button>
                    <p className="text-gray-500 text-sm sm:hidden">or search above</p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>WHO-GMP Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Lab Tested Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Free Delivery over $50</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
