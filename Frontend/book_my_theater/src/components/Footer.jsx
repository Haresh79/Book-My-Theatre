import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-8">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-nunito font-semibold mb-4">Contact Us</h3>
                    <ul>
                        <li className=" font-nunito mb-2"><a href="mailto:info@bookmytheater.com" className="hover:text-[#6750A4]">Email: info@bookmytheater.com</a></li>
                        <li className="mb-2 font-nunito"><a href="tel:+1234567890" className="hover:text-[#6750A4]">Phone: +1 (234) 567-890</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-nunito font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2 font-nunito"><Link href="/login" className="hover:text-[#6750A4]">Login</Link></li>
                        <li className="mb-2 font-nunito"><Link href="/register" className="hover:text-[#6750A4]">Register</Link></li>
                        <li className="mb-2 font-nunito"><Link href="/bookings" className="hover:text-[#6750A4]">My Tickets</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-nunito font-semibold mb-4">Policies</h3>
                    <ul>
                        <li className="mb-2 font-nunito"><Link href="/privacy-policy" className="hover:text-[#6750A4]">Privacy Policy</Link></li>
                        <li className="mb-2 font-nunito"><Link href="/terms-of-service" className="hover:text-[#6750A4]">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-nunito font-semibold mb-4">FAQs</h3>
                    <ul>
                        <li className="mb-2 font-nunito"><Link href="/faq" className="hover:text-[#6750A4]">Frequently Asked Questions</Link></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8">
                <p className="text-sm text-gray-400 font-lato">&copy; 2025 Book My Theater. All rights reserved.</p>
            </div>
        </footer>

    )
}