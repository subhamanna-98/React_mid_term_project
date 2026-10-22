
import type React from "react";
import vehiclesHeroBg from "../assets/01. -vehi-Hero Section.png";
import SelectVechileGroup from "../componantes/SelectVechileGroup";
import BrandNewsletter from "../componantes/BrandNewsletter";
 const Vehicles:React.FC = () => {
  return (
    <div className="w-full bg-[#070b0c] text-white">
      {/* 1. HERO BANNER SECTION (Full Width Background with Overlay) */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden">
        {/* Background Car Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${vehiclesHeroBg})` }}
        >
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-16 flex flex-col justify-center">
          <div className="max-w-xl text-left">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.15]">
              Find Yor Dream <br />
              Car- 2026
            </h1>
          </div>
        </div>
      </section>

      {/* all-vechile */}
      <SelectVechileGroup/>
      {/* BrandNewsletter.tsx */}
      <BrandNewsletter/>
    </div>
  )
}
 export default Vehicles