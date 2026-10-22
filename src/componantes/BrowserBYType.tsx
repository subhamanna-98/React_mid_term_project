import carSuv from "../assets/img (1).png";
import carSedan from "../assets/img (2).png";
import carHatchback from "../assets//img (3).png";
import carHybrid from "../assets/img (4).png";
import carCoupe from "../assets//img.png";

// 2. Chhoto Icons (badge-er bhetorer icon image gulo)
import iconSuv from "../assets/Background (1).png";
import iconSedan from "../assets/Background (2).png";
import iconHatchback from "../assets/Background (3).png";
import iconHybrid from "../assets/Background (4).png";
import iconCoupe from "../assets/Background.png";
import { Link } from "react-router-dom";


interface CarTypeItem {
  id: number;
  label: string;
  bgImage: string;
  iconImage: string;
  link: string;
}
const topRowItems: CarTypeItem[] = [
  {
    id: 1,
    label: "SUV",
    bgImage: carSuv,
    iconImage: iconSuv,
    link: "/vechiles",
  },
  {
    id: 2,
    label: "Sedan",
    bgImage: carSedan,
    iconImage: iconSedan,
    link: "/vechiles",
  },
];
const bottomRowItems: CarTypeItem[] = [
  {
    id: 3,
    label: "Hatchback",
    bgImage: carHatchback,
    iconImage: iconHatchback,
    link: "/vechiles",
  },
  {
    id: 4,
    label: "Hybrid",
    bgImage: carHybrid,
    iconImage: iconHybrid,
    link: "/vechiles",
  },
  {
    id: 5,
    label: "Coupe",
    bgImage: carCoupe,
    iconImage: iconCoupe,
    link: "/vechiles",
  },
];
 const BrowserByType = () => {
  return (
  <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-10 text-left">
          Browse by Type
        </h2>

        {/* Cars Grid */}
        <div className="flex flex-col gap-6 sm:gap-7">
          
          {/* Top Row: 2 Big Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {topRowItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[28px] overflow-hidden bg-gray-100 h-[280px] sm:h-[340px] lg:h-[360px] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Car Image */}
                <img
                  src={item.bgImage}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle bottom shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Chhoto Badge: Initially Hidden -> Hover korle smooth pop-up hobe */}
                <div className="absolute bottom-6 left-6 z-10 transition-all duration-300 ease-out opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-black/5 hover:scale-105 transition-transform duration-200">
                    <img
                      src={item.iconImage}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="font-heading text-xs sm:text-sm font-semibold text-gray-900 tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {bottomRowItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[28px] overflow-hidden bg-gray-100 h-[260px] sm:h-[300px] lg:h-[320px] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Car Image */}
                <img
                  src={item.bgImage}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle bottom shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Chhoto Badge: Initially Hidden -> Hover korle smooth pop-up hobe */}
                <div className="absolute bottom-6 left-6 z-10 transition-all duration-300 ease-out opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-black/5 hover:scale-105 transition-transform duration-200">
                    <img
                      src={item.iconImage}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="font-heading text-xs sm:text-sm font-semibold text-gray-900 tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            to="/vechiles"
            className="group inline-flex items-center gap-3 border border-gray-300 rounded-full pl-6 pr-2 py-1.5 text-xs font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:shadow-md cursor-pointer"
          >
            <span>View All</span>
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs transition-transform duration-300 group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
export default BrowserByType
