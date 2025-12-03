import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Supracyn</h3>
                        <p className="leading-relaxed mb-6">
                            Making healthcare affordable for everyone. Premium generic medicines, direct from our factory to your home.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Our Medicines</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Quality Assurance</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Stay Updated</h4>
                        <p className="mb-4 text-sm">Subscribe to our newsletter for health tips and exclusive offers.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary w-full"
                            />
                            <button className="bg-primary hover:bg-teal-700 px-4 py-2 rounded-r-lg transition-colors">
                                <Mail className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm">
                    <p>&copy; 2025 Supracyn Pharma. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
