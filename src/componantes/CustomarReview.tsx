import React, { useEffect, useRef } from "react";
import reviewBannerBg from "../assets/customar-say-img.png"; 
import userAvatar from "../assets/slider-img.png"; 
interface ReviewItem {
  id: number;
  name: string;
  verified: boolean;
  rating: number;
  title: string;
  description: string;
}

const baseReviews: ReviewItem[] = [
  {
    id: 1,
    name: "Ali Tufan",
    verified: true,
    rating: 5,
    title: "Sales process was simple and easy",
    description:
      "Sales process was simple and easy. Maximilion was friendly and I didn't feel pressured at all.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    verified: true,
    rating: 5,
    title: "Smooth and transparent deal",
    description:
      "Best car buying experience ever. Highly recommended for genuine car buyers.",
  },
  {
    id: 3,
    name: "David Miller",
    verified: true,
    rating: 5,
    title: "Top notch customer service",
    description:
      "Great car collection and very flexible financing options available.",
  },
  {
    id: 4,
    name: "Ali Tufan",
    verified: true,
    rating: 5,
    title: "Sales process was simple and easy",
    description:
      "Sales process was simple and easy. Maximilion was friendly and I didn't feel pressured at all.",
  },
  {
    id: 5,
    name: "Robert Fox",
    verified: true,
    rating: 5,
    title: "Quick approval & delivery",
    description:
      "Financial process was swift and transparent. The vehicle condition is brand new.",
  },
  {
    id: 6,
    name: "Eleanor Pena",
    verified: true,
    rating: 5,
    title: "Stress-free buying experience",
    description:
      "Loved the staff guidance. Pricing was fair and exactly matched the online quote.",
  },
];

// Infinite loop smoothly korar jonno list clone kora holo
const infiniteList = [...baseReviews, ...baseReviews, ...baseReviews, ...baseReviews];


 const CustomarReview:React.FC = () => {
    
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    // Speed control: 1.2 theke bariye ba komiye speed adjust korte paren
    const scrollSpeed = 1.2;

    const step = () => {
      if (container && !isInteracting.current) {
        container.scrollLeft += scrollSpeed;

        // Loop point: Jokhon half-way scroll hoye jabe, reset to start seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Button Click Functions: Click korleo scroll choltei thakbe
  const handleScrollLeft = () => {
    if (!containerRef.current) return;
    isInteracting.current = true;
    containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    setTimeout(() => {
      isInteracting.current = false;
    }, 400);
  };

  const handleScrollRight = () => {
    if (!containerRef.current) return;
    isInteracting.current = true;
    containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    setTimeout(() => {
      isInteracting.current = false;
    }, 400);
  };
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a]">
            What our customers say
          </h2>
          <p className="font-line text-xs sm:text-sm text-gray-500 max-w-xs md:text-right leading-relaxed">
            Rated <span className="font-semibold text-gray-900">4.7 / 5</span> based on{" "}
            <span className="font-semibold text-gray-900">28,370</span> reviews Showing our 4 & 5 star reviews
          </p>
        </div>

        {/* Main Banner Card */}
        <div className="relative w-full rounded-[32px] overflow-hidden bg-gray-950 min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col justify-end shadow-2xl">
          {/* Background Image */}
          <img
            src={reviewBannerBg}
            alt="Happy Customers"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Continuous Loop Scroll Container */}
          <div className="relative z-10 w-full p-4 sm:p-6 lg:p-8">
            <div
              ref={containerRef}
              className="flex gap-4 sm:gap-6 overflow-x-hidden scroll-smooth select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {infiniteList.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-[260px] sm:w-[290px] bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/40 text-gray-900"
                >
                  {/* User Profile */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={userAvatar}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover shadow-sm"
                      />
                      <span className="font-heading text-xs font-bold text-gray-900">
                        {item.name}
                      </span>
                    </div>

                    {item.verified && (
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                        <svg
                          className="w-3.5 h-3.5 text-blue-500 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-2">
                    {"★".repeat(item.rating)}
                  </div>

                  {/* Title */}
                  <h4 className="font-heading text-xs sm:text-[13px] font-bold text-gray-900 mb-1 leading-snug">
                    {item.title}
                  </h4>

                  {/* Text */}
                  <p className="font-line text-[11px] text-gray-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working Click Arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white flex items-center justify-center text-gray-800 transition-all active:scale-95 shadow-sm cursor-pointer z-20 text-lg font-bold"
            aria-label="Previous Slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-black hover:text-white flex items-center justify-center text-gray-800 transition-all active:scale-95 shadow-sm cursor-pointer z-20 text-lg font-bold"
            aria-label="Next Slide"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  )
}
export default CustomarReview