import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";
import IconsProfast from "./IconsProfast";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-gray-300 py-10 px-5 md:px-10 rounded-lg">
      {/* Logo & Description */}
      <div className="text-center mb-8">
       <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="flex justify-center">
         <IconsProfast />
       </div>
        <p className="max-w-2xl mx-auto mt-3 text-sm md:text-base text-gray-400">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-400 mb-8">
        <a href="#" className="hover:text-green-400 transition">Services</a>
        <a href="#" className="hover:text-green-400 transition">Coverage</a>
        <a href="#" className="hover:text-green-400 transition">About Us</a>
        <a href="#" className="hover:text-green-400 transition">Pricing</a>
        <a href="#" className="hover:text-green-400 transition">Blog</a>
        <a href="#" className="hover:text-green-400 transition">Contact</a>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-5 mb-6">
        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition">
          <FaLinkedinIn size={16} />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition">
          <FaXTwitter size={16} />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition">
          <FaFacebookF size={16} />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition">
          <FaYoutube size={16} />
        </a>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs md:text-sm text-gray-500 border-t border-gray-800 pt-4">
        © 2025 Profast. All rights reserved.
      </div>
    </footer>
  );
}
