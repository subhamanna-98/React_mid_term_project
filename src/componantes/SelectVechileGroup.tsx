
import cardActionIcon from "../assets/explore-hover-image.png"; 


import car1 from "../assets/card.png";
import car2 from "../assets/card (1).png";
import car3 from "../assets/card (2).png";
import car4 from "../assets/card (3).png";
import car5 from "../assets/card (4).png";
import car6 from "../assets/card (5).png";
import car7 from "../assets/card (6).png";
import car8 from "../assets/card (7).png";
import car9 from "../assets/card.png";
import { useState } from "react";

interface VehicleItem {
  id: number;
  category: "sedan" | "pickup" | "suv";
  title: string;
  subtitle: string;
  miles: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
}
const vehicleList: VehicleItem[] = [
  {
    id: 1,
    category: "sedan",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car1,
  },
  {
    id: 2,
    category: "sedan",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car2,
  },
  {
    id: 3,
    category: "sedan",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car3,
  },
  {
    id: 4,
    category: "pickup",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car4,
  },
  {
    id: 5,
    category: "suv",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car5,
  },
  {
    id: 6,
    category: "sedan",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car6,
  },
  {
    id: 7,
    category: "suv",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car7,
  },
  {
    id: 8,
    category: "pickup",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car8,
  },
  {
    id: 9,
    category: "sedan",
    title: "C-Class – 2025",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate",
    miles: "50 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "$150,000",
    image: car9,
  },
];
type FilterType = "all" | "sedan" | "pickup" | "suv";
 const SelectVechileGroup = () => {
    const [activeTab, setActiveTab] = useState<FilterType>("all");

  // Dynamic Filtering Logic
  const filteredVehicles =
    activeTab === "all"
      ? vehicleList
      : vehicleList.filter((item) => item.category === activeTab);
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Title */}
        <h2 className="font-heading text-3xl sm:text-[40px] font-bold text-center text-[#0f172a] mb-8 tracking-tight">
          Select a vehicle group
        </h2>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-14">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0b1f1a] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-black border border-gray-200"
            }`}
          >
            All Vehicles
          </button>

          <button
            onClick={() => setActiveTab("sedan")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
              activeTab === "sedan"
                ? "bg-[#0b1f1a] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-black border border-gray-200"
            }`}
          >
            <span>🚗</span>
            <span>Sedan</span>
          </button>

          <button
            onClick={() => setActiveTab("pickup")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
              activeTab === "pickup"
                ? "bg-[#0b1f1a] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-black border border-gray-200"
            }`}
          >
            <span>🛻</span>
            <span>Pickup</span>
          </button>

          <button
            onClick={() => setActiveTab("suv")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
              activeTab === "suv"
                ? "bg-[#0b1f1a] text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-black border border-gray-200"
            }`}
          >
            <span>🚙</span>
            <span>SUV</span>
          </button>
        </div>

        {/* 3x3 Grid Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="group relative rounded-[28px] overflow-hidden bg-gray-900 h-[460px] sm:h-[480px] flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Background Car Image with Hover Scale */}
              <img
                src={car.image}
                alt={car.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

              {/* Top-Right Corner Action / Bookmark Icon (Hover-e Appear Korbe) */}
              <div className="relative z-10 w-full p-5 flex justify-end">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center p-2 shadow-md transition-all duration-300 opacity-0 translate-y-1 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 hover:bg-white active:scale-90"
                  aria-label="Bookmark"
                >
                  <img
                    src={cardActionIcon}
                    alt="Action Icon"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>

              {/* Bottom Car Details Content */}
              <div className="relative z-10 p-6 text-white text-left flex flex-col">
                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5">
                  {car.title}
                </h3>

                {/* Subtitle / Model details */}
                <p className="font-line text-[11px] sm:text-xs text-gray-300 opacity-80 line-clamp-2 leading-relaxed mb-4">
                  {car.subtitle}
                </p>

                {/* Specs: Miles, Fuel, Gearbox */}
                <div className="flex items-center gap-3 text-[11px] text-gray-300 font-line border-t border-white/10 pt-3 mb-4">
                  <span>⏱ {car.miles}</span>
                  <span className="text-gray-500">•</span>
                  <span>⛽ {car.fuel}</span>
                  <span className="text-gray-500">•</span>
                  <span>⚙️ {car.transmission}</span>
                </div>

                {/* Price */}
                <div className="font-heading text-base sm:text-lg font-bold text-white">
                  {car.price}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
export default SelectVechileGroup