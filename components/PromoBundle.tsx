import { Calendar, Check } from "lucide-react";

export default function PromoBundle() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-teal-100 shadow-sm">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-teal-700">
                            <Calendar className="h-4 w-4" />
                            <span>Monthly Subscription</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Never Run Out of Meds Again
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Subscribe to our monthly refill pack and get an <span className="font-bold text-teal-700">extra 5% off</span> on every order. We'll deliver your medicines automatically before you run out.
                        </p>

                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-700">
                                <div className="bg-teal-100 p-1 rounded-full"><Check className="h-4 w-4 text-teal-700" /></div>
                                <span>Cancel anytime, no hidden fees</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <div className="bg-teal-100 p-1 rounded-full"><Check className="h-4 w-4 text-teal-700" /></div>
                                <span>Free consultation with every refill</span>
                            </li>
                        </ul>

                        <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Subscription
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/30 to-blue-200/30 rounded-full blur-3xl" />
                        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                                <div className="font-bold text-gray-800">Monthly Pack</div>
                                <div className="text-teal-600 font-bold">$28.50 <span className="text-xs text-gray-400 font-normal">/mo</span></div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                                <div className="h-2 bg-gray-100 rounded-full w-1/2" />
                                <div className="h-2 bg-gray-100 rounded-full w-full" />
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Next delivery: <span className="font-semibold text-gray-700">Dec 15th</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
