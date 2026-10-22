import React, { useEffect, useRef, useState } from "react";
import brandAudi from "../assets/b1.jpg.png";
import brandBmw from "../assets/b2.jpg.png";
import brandFord from "../assets/b3.jpg.png";
import brandBenz from "../assets/b4.jpg.png";
import brandPeugeot from "../assets/b5.jpg.png";
import brandVw from "../assets/b6.jpg.png";
import { Link } from "react-router-dom";
interface BrandItem {
  id: number;
  name: string;
  logo: string;
}

const baseBrands: BrandItem[] = [
  { id: 1, name: "Audi", logo: brandAudi },
  { id: 2, name: "BMW", logo: brandBmw },
  { id: 3, name: "Ford", logo: brandFord },
  { id: 4, name: "Mercedes Benz", logo: brandBenz },
  { id: 5, name: "Peugeot", logo: brandPeugeot },
  { id: 6, name: "Volkswagen", logo: brandVw },
];
const infiniteBrands = [
  ...baseBrands,
  ...baseBrands,
  ...baseBrands,
  ...baseBrands,
]

 const BrandNewsletter:React.FC = () => {
    const [email, setEmail] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Email Submit Handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Email:", email);
    setEmail(""); // Form reset
  };
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 1.0; // Scroll speed 

    const scrollStep = () => {
      if (container) {
        container.scrollLeft += speed;

        // Halfway point-e pouchhale loop seamless reset hoye jabe
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  },[])
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none overflow-hidden">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-20 sm:gap-24">
        
        {/* ================= 1. JOIN CARHUT NEWSLETTER ================= */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-gray-100 pb-16">
          {/* Left Text */}
          <div className="flex flex-col text-left">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mb-2">
              Join CarHut
            </h2>
            <p className="font-line text-xs sm:text-sm text-gray-500 font-normal">
              Receive pricing updates, shopping tips & more!
            </p>
          </div>

          {/* Right Newsletter Input Form */}
          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex-1 max-w-md flex items-center bg-[#f1f3f4] rounded-full p-1.5 border border-gray-200/60 focus-within:ring-2 focus-within:ring-black/10 transition-all shadow-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full bg-transparent px-5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none font-line"
            />
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 active:scale-95 flex-shrink-0 cursor-pointer shadow-md"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* ================= 2. EXPLORE PREMIUM BRANDS ================= */}
        <div className="flex flex-col gap-10">
          {/* Top Title & CTA Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#0f172a]">
              Explore Our Premium Brands
            </h2>

            <Link
              to="/vechiles"
              className="group inline-flex items-center gap-3 border border-gray-300 rounded-full pl-6 pr-2 py-1.5 text-xs font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:shadow-md cursor-pointer"
            >
              <span>Show All Brands</span>
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </Link>
          </div>

          {/* Infinite Seamless Scrolling Brands Bar */}
          <div className="relative w-full overflow-hidden py-4">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-12 sm:gap-16 lg:gap-24 overflow-x-hidden select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {infiniteBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex flex-col items-center justify-center flex-shrink-0 w-28 sm:w-36 group cursor-pointer"
                >
                  {/* Brand Logo Container */}
                  <div className="h-14 sm:h-16 w-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    />
                  </div>

                  {/* Brand Name */}
                  <span className="font-line text-xs sm:text-sm font-semibold text-gray-700 tracking-wide text-center">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
export default BrandNewsletter