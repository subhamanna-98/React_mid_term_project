import { Link } from "react-router-dom";
import aboutHeroBg from "../assets/01. -About-Hero Section.png";
import type React from "react";
import AboutFeaturesVideo from "../componantes/AboutFeaturesVideo";
import CustomarReview from "../componantes/CustomarReview";
import FaqAccordion from "../componantes/FaqAccordion";
import BrandNewsletter from "../componantes/BrandNewsletter";
import LookingForCarBanner from "../componantes/LookingForCarBanner";

 const About:React.FC = () => {
  return (
    <div className="w-full bg-[#070b0c] text-white">
      {/* 1. HERO BANNER SECTION (About Us + Breadcrumb) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-center overflow-hidden">
        {/* Background Car Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${aboutHeroBg})` }}
        >
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 sm:pt-44 pb-16 flex flex-col justify-center">
          <div className="max-w-xl text-left">
            {/* Main Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[68px] font-normal text-white tracking-tight leading-tight mb-3">
              About Us
            </h1>

            {/* Breadcrumb Navigation */}
            <p className="font-heading text-lg sm:text-2xl text-gray-300 font-light tracking-wide">
              <Link
                to="/"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </Link>{" "}
              / About Us
            </p>
          </div>
        </div>
      </section>

      {/* about-featecher-vedio */}
      <AboutFeaturesVideo/>
      {/* customar-say */}
      <CustomarReview/>
      {/* faq-accordian */}
      <FaqAccordion/>
      {/* lookingcarbanner */}
      <LookingForCarBanner/>
       {/* BrandNewsletter.tsx */}
      <BrandNewsletter/>
    </div>
  )
}
export default About