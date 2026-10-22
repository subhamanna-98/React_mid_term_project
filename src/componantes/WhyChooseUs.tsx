import iconFinance from "../assets/f1.svg.png";
import iconTrust from "../assets/f2.svg.png";     
import iconPricing from "../assets/f3.svg.png"; 
import iconService from "../assets/f4.svg.png"; 
import centerCar from "../assets/black-isolated-car 1.png";     

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const leftFeatures: FeatureItem[] = [
  {
    icon: iconFinance,
    title: "Special Financing Offers",
    description: "Our stress-free finance department that can financial solutions to save you money.",
  },
  {
    icon: iconTrust,
    title: "Trusted Car Dealership",
    description: "Our stress-free finance department that can financial solutions to save you money.",
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: iconPricing,
    title: "Transparent Pricing",
    description: "Our stress-free finance department that can financial solutions to save you money.",
  },
  {
    icon: iconService,
    title: "Expert Car Service",
    description: "Our stress-free finance department that can financial solutions to save you money.",
  },
];

 const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white text-gray-900 py-20 px-6 sm:px-10 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-heading text-3xl sm:text-[38px] font-bold tracking-tight text-[#0f172a] mb-14 text-left">
          Why Choose Us?
        </h2>

        {/* 3-Column Layout: Left (2 items) | Center (Car Image) | Right (2 items) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col space-y-12">
            {leftFeatures.map((item, index) => (
              <div key={index} className="flex flex-col items-start text-left group">
                <div className="w-12 h-12 mb-5 flex items-center justify-start transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg sm:text-[20px] font-semibold text-[#0f172a] mb-2.5">
                  {item.title}
                </h3>
                <p className="font-line text-sm text-gray-500 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Column: Car Image */}
          <div className="flex justify-center items-center py-4 lg:py-0">
            <img
              src={centerCar}
              alt="Luxury SUV"
              className="w-full max-w-[420px] lg:max-w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-12">
            {rightFeatures.map((item, index) => (
              <div key={index} className="flex flex-col items-start text-left group">
                <div className="w-12 h-12 mb-5 flex items-center justify-start transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="font-heading text-lg sm:text-[20px] font-semibold text-[#0f172a] mb-2.5">
                  {item.title}
                </h3>
                <p className="font-line text-sm text-gray-500 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
export default WhyChooseUs