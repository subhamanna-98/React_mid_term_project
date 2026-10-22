// import CountUp from "react-countup";

import heroBg from "../assets/Bnner-main-hero-image.png";
import AutoLoanCalculator from "../componantes/AutoLoanCalculator";
import BrandNewsletter from "../componantes/BrandNewsletter";
import BrowserByType from "../componantes/BrowserBYType";
import CallToActionBanner from "../componantes/CallToActionBanner";


import CountUpsection from "../componantes/CountUpsection";
import CustomarReview from "../componantes/CustomarReview";
import ExploreVichle from "../componantes/ExploreVichle";
import LatestBlogPosts from "../componantes/LatestBlogPosts";
import OurTeam from "../componantes/OurTeam";
import ShopBoxCar from "../componantes/ShopBoxCar";
import WhyChooseUs from "../componantes/WhyChooseUs";

const Home = () => {
  return (
    
    <div className="w-full bg-[#070b0c] text-white">
      {/* 1. HERO BANNER SECTION (Full Width Background) */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-12 flex-1 flex flex-col justify-between">
          {/* Title & Copy */}
          <div className="max-w-xl mt-4">
            <p className=" font-line text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">
              Built to Inspire
            </p>
            <h1 className=" font-heading text-5xl md:text-7xl font-light text-white tracking-wide mb-4">
              Ranger <span className="font-semibold">Black</span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-8 opacity-90 font-line">
              Lorem ipsum dolor sit amet consectetur. Aliquam aliquet enim aliquet
              nunc placerat dui tristique. Turpis aliquam morbi at suscipit pretium orci.
            </p>

            <button className="flex items-center gap-3 border border-white/30 rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <span className="font-heading">Discover More</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </button>
          </div>

          {/* Bottom Counter Bar */}
          <div className="w-full pt-12">
            <CountUpsection />
          </div>
        </div>
      </section>

      {/* 2. EXPLORE ALL VEHICLES SECTION (Pure Full-Width White Background) */}
      <ExploreVichle />
      {/* 3. Why Choose Us */}
      <WhyChooseUs />
      {/* 4. Shop Box Car Your Way */}
      <ShopBoxCar />
      {/* 4. Auto Loan Calculator */}
      <AutoLoanCalculator />
      {/* 3. Browse By Type */}
      <BrowserByType/>
      {/* customar-say */}
      <CustomarReview/>
      {/* team */}
      <OurTeam/>
      {/* blog-page */}
      <LatestBlogPosts/>
      {/* CallToActionBanner.tsx */}
      <CallToActionBanner/>
      {/* BrandNewsletter.tsx */}
      <BrandNewsletter/>
    </div>
  );
};
export default Home;
