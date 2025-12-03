import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Diabetes Patient",
        content: "I was spending over $200 a month on Metformin. With Supracyn, I pay less than $30 for the exact same medicine. The quality is top-notch.",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Cardiac Patient",
        content: "My doctor confirmed that Supracyn's generic Plavix is identical to the brand name. The savings are incredible, and delivery is always on time.",
        rating: 5,
    },
    {
        name: "Emily Davis",
        role: "Chronic Migraine Sufferer",
        content: "Finally, affordable medication without jumping through hoops. The website is so easy to use, and I love that I'm buying direct from the manufacturer.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have switched to Supracyn.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.content}"</p>
                            <div>
                                <h4 className="font-bold text-gray-900">{t.name}</h4>
                                <p className="text-sm text-gray-500">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
