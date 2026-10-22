
import { useState } from "react";
import car1 from "../assets/Explore-img-1.png";
import car2 from "../assets/explore-img-2.png";
import car3 from "../assets/Explore-img-3.png";
import bookmarkIcon from "../assets/explore-hover-image.png"
import { Link } from "react-router-dom";
interface Vehicle {
  id: number;
  name: string;
  category: "in-stock" | "new-cars" | "used-cars";
  description: string;
  miles: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
}

const vehicleData: Vehicle[] = [
  {
    id: 1,
    name: "C-Class – 2025",
    category: "in-stock",
    description: "4.0 D5 PowerPulse Momentum 5dr AWD.. Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car1,
  },
  {
    id: 2,
    name: "Audi Coupe – 2025",
    category: "in-stock",
    description: "4.0 D5 PowerPulse Momentum 5dr AWD.. Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car2,
  },
  {
    id: 3,
    name: "Skyline GT-R – 2025",
    category: "in-stock",
    description: "4.0 D5 PowerPulse Momentum 5dr AWD.. Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car3,
  },
  {
    id: 4,
    name: "Benz New Car – 2026",
    category: "new-cars",
    description: "3.0 Turbocharged V6 engine with supreme aerodynamic design",
    miles: "10 Miles",
    fuel: "Hybrid",
    transmission: "Automatic",
    price: "$175,000",
    image: car1,
  },
  {
    id: 5,
    name: "Classic Used GT – 2023",
    category: "used-cars",
    description: "Mint condition pre-owned performance coupe with full history",
    miles: "12,000 Miles",
    fuel: "Petrol",
    transmission: "Manual",
    price: "$98,000",
    image: car3,
  },
];

const tabs = [
  { label: "In Stock", value: "in-stock" },
  { label: "New Cars", value: "new-cars" },
  { label: "Used Cars", value: "used-cars" },
] as const;

 const ExploreVichle = () => {
  const [activeTab, setActiveTab] = useState<"in-stock" | "new-cars" | "used-cars">("in-stock");

  const filteredVehicles = vehicleData.filter((item) => item.category === activeTab);

  return (
    <section className="w-full bg-white text-gray-900 py-20 px-6 sm:px-10 lg:px-16 select-none">
      {/* Max Container Matching Top Width */}
      <div className="max-w-[1360px] mx-auto">
        
        {/* Title */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-6">
          Explore All Vehicles
        </h2>

        {/* Category Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200/80 pb-3 mb-10 overflow-x-auto whitespace-nowrap scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-sm font-semibold transition-all relative pb-3 cursor-pointer ${
                  isActive ? "text-[#0f172a]" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2563eb] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="group relative rounded-[32px] overflow-hidden bg-[#0e1013] shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Proper Aspect Ratio */}
              <div className="relative w-full h-[470px] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Vignette Gradients */}
                <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />
              </div>

              {/* Bookmark Button: Hidden initially, pops up on Card Hover */}
              <button
                type="button"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:scale-110 active:scale-95 z-20 cursor-pointer"
                title="Save car"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={bookmarkIcon}
                  alt="Bookmark"
                  className="w-4 h-4 object-contain"
                />
              </button>

              {/* Bottom Info overlay */}
              <div className="absolute bottom-0 inset-x-0 p-7 z-10 text-white flex flex-col">
                <h3 className="text-xl font-bold tracking-tight text-white mb-1.5 font-line">
                  {car.name}
                </h3>

                <p className="text-[12px] text-gray-300/90 line-clamp-1 mb-4 font-normal leading-relaxed font-line">
                  {car.description}
                </p>

                {/* Specs Row with Border Top */}
                <div className="flex items-center justify-between text-[11px] text-gray-300 border-t border-white/15 pt-3.5 mb-4">
                  {/* Miles */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3" />
                    </svg>
                    <span>{car.miles}</span>
                  </div>

                  {/* Fuel */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2" />
                    </svg>
                    <span>{car.fuel}</span>
                  </div>

                  {/* Transmission */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>{car.transmission}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-[22px] font-bold tracking-tight text-white font-line">
                  {car.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-14">
          <Link
            to="/vechiles"
            className=" inline-flex items-center gap-3 border border-gray-300 rounded-full pl-6 pr-2 py-2 text-xs font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:shadow-md cursor-pointer group"
          >
            <span className="font-heading">View All</span>
            <span className="w-7 h-7 rounded-full bg-black  flex items-center justify-center text-xs transition-transform duration-300 group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}
export default ExploreVichle