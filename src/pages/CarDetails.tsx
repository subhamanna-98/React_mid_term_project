import { Link } from "react-router-dom";
import carDetailsHeroBg from "../assets/01. -car-d-Hero Section.png"; 
import type React from "react";
import BrowserByType from "../componantes/BrowserBYType";
import ShopBoxCar from "../componantes/ShopBoxCar";
import BrandNewsletter from "../componantes/BrandNewsletter";
import CarSpecification from "../componantes/CarSpecification";

 const CarDetails:React.FC = () => {
  return (
    <div className="w-full bg-[#070b0c] text-white">
      {/* 1. HERO BANNER SECTION (Home / Details) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-center overflow-hidden">
        {/* Background Car Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${carDetailsHeroBg})` }}
        >
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 sm:pt-44 pb-16 flex flex-col justify-center">
          <div className="max-w-xl text-left">
            {/* Breadcrumb Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[68px] font-normal text-white tracking-tight leading-tight">
              <Link
                to="/"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                Home
              </Link>{" "}
              / Details
            </h1>
          </div>
        </div>
      </section>

      {/* csr-spefication */}
      <CarSpecification/>
      {/* 3. Browse By Type */}
      <BrowserByType/>
      {/* 4. Shop Box Car Your Way */}
      <ShopBoxCar />
      {/* BrandNewsletter.tsx */}
      <BrandNewsletter/>
    </div>
  )
}
export default CarDetails