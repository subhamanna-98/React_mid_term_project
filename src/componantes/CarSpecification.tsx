import mainCarImg from "../assets/Img (7).png";
import thumb1 from "../assets/Img (8).png"; 
import thumb2 from "../assets/Img (9).png"; 
import thumb3 from "../assets/Img (10).png"; 

import iconGearbox from "../assets/Gear.png";
import iconFuel from "../assets/Petrol.png";
import iconDoors from "../assets/Car Door.png";
import iconAc from "../assets/Air Conditioner.png";
import iconSeats from "../assets/Folding Chair.png";
import iconDistance from "../assets/Width.png";
import { useState } from "react";
interface SpecItem {
  id: number;
  label: string;
  value: string;
  icon: string;
}
const specsData: SpecItem[] = [
  { id: 1, label: "Gear Box", value: "Automat", icon: iconGearbox },
  { id: 2, label: "Fuel", value: "Petrol", icon: iconFuel },
  { id: 3, label: "Doors", value: "2", icon: iconDoors },
  { id: 4, label: "Air Conditioner", value: "Yes", icon: iconAc },
  { id: 5, label: "Seats", value: "5", icon: iconSeats },
  { id: 6, label: "Distance", value: "500 Miles", icon: iconDistance },
];
const equipmentLeft = ["ABS", "Air Bags", "Cruise Control"];
const equipmentRight = ["ABS", "Air Bags", "Air Conditioner"];
 const CarSpecification = () => {
    const [activeImage, setActiveImage] = useState<string>(mainCarImg);

  const galleryImages = [mainCarImg, thumb1, thumb2, thumb3];
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* ================= LEFT SIDE: GALLERY & PRICING ================= */}
        <div className="lg:col-span-5 flex flex-col text-left">
          
          {/* Title, Pricing & CTA */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-black mb-1">
                BMW
              </h2>
              <p className="font-line text-sm text-gray-500">
                <span className="font-heading text-2xl font-bold text-[#6366f1]">
                  $25
                </span>{" "}
                / day
              </p>
            </div>

            <button
              type="button"
              className="bg-[#0b1f1a] hover:bg-[#071411] text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Rent A Car
            </button>
          </div>

          {/* Main Large Image */}
          <div className="relative w-full h-[320px] sm:h-[400px] rounded-[28px] overflow-hidden bg-black shadow-md mb-4">
            <img
              src={activeImage}
              alt="BMW Car Detail"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          {/* 3 Thumbnails */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.slice(1, 4).map((img, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all ${
                  activeImage === img
                    ? "border-black scale-[0.98]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>

        {/* ================= RIGHT SIDE: SPECS & EQUIPMENT ================= */}
        <div className="lg:col-span-7 flex flex-col text-left lg:pl-6">
          
          {/* Section Heading */}
          <h3 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-[#0f172a] mb-8">
            Technical Specification
          </h3>

          {/* 6 Specification Soft Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-12">
            {specsData.map((spec) => (
              <div
                key={spec.id}
                className="bg-[#f3f4f6]/80 hover:bg-[#eceef1] rounded-[22px] p-5 flex flex-col justify-between min-h-[125px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Icon Image */}
                <div className="w-8 h-8 flex items-center justify-start mb-3">
                  <img
                    src={spec.icon}
                    alt={spec.label}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div>
                  <h4 className="font-heading text-xs sm:text-[13px] font-bold text-[#0f172a] mb-0.5">
                    {spec.label}
                  </h4>
                  <p className="font-line text-xs text-gray-500 font-normal">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Car Equipment Section */}
          <div className="flex flex-col">
            <h4 className="font-heading text-sm font-bold text-[#0f172a] mb-5 tracking-wide">
              Car Equipment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 max-w-lg">
              
              {/* Left Column Checklist */}
              <div className="space-y-3.5">
                {equipmentLeft.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0b1f1a] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <span className="font-line text-xs font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column Checklist */}
              <div className="space-y-3.5">
                {equipmentRight.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0b1f1a] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <span className="font-line text-xs font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
export default CarSpecification