
import type React from "react";
import ctaBannerBg from "../assets/Background (5).png";
import { Link } from "react-router-dom";
 const CallToActionBanner:React.FC = () => {
  return (
   <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Banner Outer Wrapper */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center shadow-xl">
          
          {/* Background Car Image */}
          <img
            src={ctaBannerBg}
            alt="Supercar finding simplified"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

          {/* Left Content with Figma Subtle Glass Border */}
          <div className="relative z-10 m-6 sm:m-12 lg:m-16 p-6 sm:p-10 border border-white/20 rounded-3xl backdrop-blur-[2px] max-w-xl">
            {/* Title */}
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-normal text-white leading-[1.15] tracking-tight mb-8">
              We make finding the <br />
              <span className="font-semibold">right car simple</span>
            </h2>

            {/* Green Pill Button */}
            <Link
              to="/vechiles"
              className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Find Out More</span>
              <span className="text-sm">↗</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
export default CallToActionBanner