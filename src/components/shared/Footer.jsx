import Link from "next/link";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="bg-[#05062D] text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* 1. Brand & Description */}
          <div className="flex flex-col gap-6">
            {/* Logo from Navbar */}
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="p-2 rounded-lg bg-indigo-50/10 text-white group-hover:bg-[#4338CA] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3"/>
                  <circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
                </svg>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">Ride</span>
                <span className="text-[#14B8A6]">Vault</span>
              </span>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Your trusted partner for premium and reliable car rentals. Book your perfect ride today with confidence and ease.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4338CA] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* 2. Useful Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg tracking-wide">Useful Links</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-400">
              <li><Link href="/" className="hover:text-[#14B8A6] hover:translate-x-1 inline-block transition-transform duration-300">Home</Link></li>
              <li><Link href="/explore-cars" className="hover:text-[#14B8A6] hover:translate-x-1 inline-block transition-transform duration-300">Explore Cars</Link></li>
              <li><Link href="/about" className="hover:text-[#14B8A6] hover:translate-x-1 inline-block transition-transform duration-300">About Us</Link></li>
              <li><Link href="/login" className="hover:text-[#14B8A6] hover:translate-x-1 inline-block transition-transform duration-300">Sign In</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg tracking-wide">Contact Info</h3>
            <ul className="flex flex-col gap-5 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#14B8A6] text-lg shrink-0 mt-0.5" />
                <span>123 RideVault Street,<br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#14B8A6] text-lg shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#14B8A6] text-lg shrink-0" />
                <span>support@ridevault.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg tracking-wide">Newsletter</h3>
            <p className="text-sm text-gray-400">Subscribe for the latest car rental offers and updates.</p>
            <div className="flex w-full mt-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 w-full bg-gray-800/50 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-[#14B8A6] focus:bg-gray-800 transition-colors text-sm"
              />
              <button className="bg-[#14B8A6] hover:bg-[#0f8c7e] text-white px-5 py-3 rounded-r-lg transition-colors font-bold text-sm">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} RideVault. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;