import { useState } from "react";
import { Link } from "react-router-dom";

type TabType = "new-cars" | "used-cars" | "browse-type" | "browse-brand";

interface TabItem {
  label: string;
  value: TabType;
}
const tabs: TabItem[] = [
  { label: "New Cars For Sale", value: "new-cars" },
  { label: "Used Cars For Sale", value: "used-cars" },
  { label: "Browse By Type", value: "browse-type" },
  { label: "Browse By Brand", value: "browse-brand" },
];

const categoryData: Record<TabType, string[]> = {
  "new-cars": [
    "Ford Cars", "Chrysler Cars", "Land Rover Cars", "Abarth Cars", "Mini Cars",
    "Honda Cars", "Citroen Cars", "Lexus Cars", "Romeo Cars", "Mitsubishi Cars",
    "Hyundai Cars", "Cupra Cars", "Mercedes-Benz Cars", "Audi Cars", "Nissan Cars",
    "Infiniti Cars", "Dacia Cars", "Mazda Cars", "Bentley Cars", "Peugeot Cars",
    "Jaguar Cars", "DS Cars", "MG Cars", "BMW Cars", "Porsche Cars",
    "Jeep Cars", "Fiat Cars", "Kia Cars", "Chevrolet Cars", "Renault Cars",
  ],
  "used-cars": [
    "Used Ford Cars", "Used Chrysler Cars", "Used Land Rover", "Used Abarth Cars", "Used Mini Cars",
    "Used Honda Cars", "Used Citroen Cars", "Used Lexus Cars", "Used Romeo Cars", "Used Mitsubishi",
    "Used Hyundai Cars", "Used Cupra Cars", "Used Mercedes-Benz", "Used Audi Cars", "Used Nissan Cars",
    "Used Infiniti Cars", "Used Dacia Cars", "Used Mazda Cars", "Used Bentley Cars", "Used Peugeot Cars",
    "Used Jaguar Cars", "Used DS Cars", "Used MG Cars", "Used BMW Cars", "Used Porsche Cars",
    "Used Jeep Cars", "Used Fiat Cars", "Used Kia Cars", "Used Chevrolet", "Used Renault Cars",
  ],
  "browse-type": [
    "SUVs & Crossovers", "Sedan Cars", "Coupe & Sports", "Hatchback Cars", "Convertible Cars",
    "Electric Vehicles", "Hybrid Cars", "Luxury Vehicles", "Pickup Trucks", "Commercial Vans",
    "Diesel Cars", "Petrol Cars", "Automatic Cars", "Manual Transmission", "4x4 & AWD",
    "Family Wagons", "Compact Cars", "Performance Cars", "Off-Roaders", "Vintage & Classic",
    "City Runabouts", "Limousines", "Track Day Cars", "Station Wagons", "Micro Cars",
  ],
  "browse-brand": [
    "Mercedes-Benz", "BMW Group", "Audi AG", "Porsche AG", "Ferrari NV",
    "Lamborghini", "Aston Martin", "Bentley Motors", "Rolls-Royce", "Maserati",
    "Tesla Inc", "Volvo Cars", "Land Rover", "Jaguar Cars", "Lexus Luxury",
    "Toyota Motor", "Honda Motor", "Nissan Group", "Hyundai Motors", "Kia Motors",
    "Volkswagen", "Ford Motor", "Chevrolet", "Jeep Brand", "Cadillac",
  ],
};

 const ShopBoxCar = () => {
    const [activeTab, setActiveTab] = useState<TabType>("new-cars");

  const currentItems = categoryData[activeTab];

  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-20 px-6 sm:px-10 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Heading with Figma line wrap */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-8 leading-snug">
          Shop Box Car Your <br className="hidden sm:inline" /> Way
        </h2>

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-100 pb-3 mb-10 overflow-x-auto whitespace-nowrap scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`font-line text-sm transition-all relative pb-3 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? "text-[#0f172a] font-semibold"
                    : "text-gray-400 hover:text-gray-700 font-medium"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2563eb] rounded-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* 5-Column Grid List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3.5 gap-x-6">
          {currentItems.map((item, index) => (
            <Link
              key={index}
              to="/vechiles"
              className="font-line text-[13px] text-gray-700 hover:text-[#2563eb] transition-colors py-1 truncate hover:underline underline-offset-4"
              title={item}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-14 sm:mt-16">
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
export default ShopBoxCar
