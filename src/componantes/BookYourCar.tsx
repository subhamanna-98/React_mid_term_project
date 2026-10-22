import carShowcaseImg from "../assets/Img (11).png"; 
import iconAddress from "../assets/Frame 245.png";
import iconEmail from "../assets/Frame 246.png";
import iconPhone from "../assets/Frame 247.png";
import iconClock from "../assets/Frame 248.png";
import { useState } from "react";
interface BookingFormData {
  carType: string;
  rentalPlace: string;
  returnPlace: string;
  rentalDate: string;
  returnDate: string;
}

const BookYourCar = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    carType: "",
    rentalPlace: "",
    returnPlace: "",
    rentalDate: "",
    returnDate: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("====================================");
    console.log("🚗 NEW CAR BOOKING SUBMITTED!");
    console.log("Car Type        :", formData.carType || "Not Selected");
    console.log("Place of Rental :", formData.rentalPlace || "Not Selected");
    console.log("Place of Return :", formData.returnPlace || "Not Selected");
    console.log("Rental Date     :", formData.rentalDate || "Not Provided");
    console.log("Return Date     :", formData.returnDate || "Not Provided");
    console.log("Submitted At    :", new Date().toLocaleString());
    console.log("====================================");
    alert("Booking Submitted Successfully! Check your browser console.");
    setFormData({
      carType: "",
      rentalPlace: "",
      returnPlace: "",
      rentalDate: "",
      returnDate: "",
    });
  };
  return (
    <section className="w-full bg-white text-gray-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-16 select-none">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-16">
        {/* ================= 1. FORM & IMAGE ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Booking Form Card */}
          <div className="lg:col-span-5 bg-[#d4f2e5] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a] text-center mb-8">
              Book your car
            </h2>

            <form
              onSubmit={handleBookingSubmit}
              className="flex flex-col gap-4"
            >
              {/* 1. Car Type Dropdown */}
              <div className="relative">
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1b8e6a] text-white text-xs sm:text-sm font-line font-medium px-5 py-3.5 rounded-2xl outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0f6046] transition-all"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1b8e6a] text-white/80"
                  >
                    Car type
                  </option>
                  <option value="Sedan" className="bg-[#1b8e6a] text-white">
                    Sedan
                  </option>
                  <option value="SUV" className="bg-[#1b8e6a] text-white">
                    SUV
                  </option>
                  <option
                    value="Sports Car"
                    className="bg-[#1b8e6a] text-white"
                  >
                    Sports Car
                  </option>
                  <option value="Hybrid" className="bg-[#1b8e6a] text-white">
                    Hybrid
                  </option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white text-xs">
                  ▼
                </span>
              </div>

              {/* 2. Place of Rental Dropdown */}
              <div className="relative">
                <select
                  name="rentalPlace"
                  value={formData.rentalPlace}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1b8e6a] text-white text-xs sm:text-sm font-line font-medium px-5 py-3.5 rounded-2xl outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0f6046] transition-all"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1b8e6a] text-white/80"
                  >
                    Place of rental
                  </option>
                  <option value="New York" className="bg-[#1b8e6a] text-white">
                    New York (JFK Airport)
                  </option>
                  <option
                    value="Los Angeles"
                    className="bg-[#1b8e6a] text-white"
                  >
                    Los Angeles (LAX)
                  </option>
                  <option value="Chicago" className="bg-[#1b8e6a] text-white">
                    Chicago Downtown
                  </option>
                  <option value="Miami" className="bg-[#1b8e6a] text-white">
                    Miami Beach
                  </option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white text-xs">
                  ▼
                </span>
              </div>

              {/* 3. Place of Return Dropdown */}
              <div className="relative">
                <select
                  name="returnPlace"
                  value={formData.returnPlace}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1b8e6a] text-white text-xs sm:text-sm font-line font-medium px-5 py-3.5 rounded-2xl outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0f6046] transition-all"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1b8e6a] text-white/80"
                  >
                    Place of return
                  </option>
                  <option
                    value="Same Location"
                    className="bg-[#1b8e6a] text-white"
                  >
                    Same as rental place
                  </option>
                  <option value="New York" className="bg-[#1b8e6a] text-white">
                    New York
                  </option>
                  <option
                    value="Los Angeles"
                    className="bg-[#1b8e6a] text-white"
                  >
                    Los Angeles
                  </option>
                  <option value="Chicago" className="bg-[#1b8e6a] text-white">
                    Chicago
                  </option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white text-xs">
                  ▼
                </span>
              </div>

              {/* 4. Rental Date Input */}
              <div className="relative">
                <input
                  type="date"
                  name="rentalDate"
                  value={formData.rentalDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1b8e6a] text-white text-xs sm:text-sm font-line font-medium px-5 py-3.5 rounded-2xl outline-none cursor-pointer pr-4 focus:ring-2 focus:ring-[#0f6046] transition-all scheme-dark"
                />
              </div>

              {/* 5. Return Date Input */}
              <div className="relative">
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1b8e6a] text-white text-xs sm:text-sm font-line font-medium px-5 py-3.5 rounded-2xl outline-none cursor-pointer pr-4 focus:ring-2 focus:ring-[#0f6046] transition-all scheme-dark"
                />
              </div>

              {/* Book Now Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Book Now
              </button>
            </form>
          </div>

          {/* Right: Featured Car Showcase Image */}
          <div className="lg:col-span-7 rounded-[32px] overflow-hidden bg-black shadow-md min-h-[380px] lg:min-h-[460px]">
            <img
              src={carShowcaseImg}
              alt="Luxury Sports Car"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>

        {/* ================= 2. BOTTOM DETAILS INFO BAR ================= */}
        <div className="bg-[#d4f2e5] rounded-[32px] py-6 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-sm">
          {/* Address */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img
                src={iconAddress}
                alt="Address"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-600 font-medium">
                Address
              </span>
              <span className="font-line text-xs font-bold text-[#0f172a] leading-tight">
                Oxford Ave. Cary, NC 27511
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img
                src={iconEmail}
                alt="Email"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-600 font-medium">
                Email
              </span>
              <a
                href="mailto:nwiger@yahoo.com"
                className="font-line text-xs font-bold text-[#0f172a] hover:text-[#059669] transition-colors leading-tight"
              >
                nwiger@yahoo.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img
                src={iconPhone}
                alt="Phone"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-600 font-medium">
                Phone
              </span>
              <a
                href="tel:+5375476401"
                className="font-line text-xs font-bold text-[#0f172a] hover:text-[#059669] transition-colors leading-tight"
              >
                +537 547-6401
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img
                src={iconClock}
                alt="Opening Hours"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-line text-xs text-gray-600 font-medium">
                Opening hours
              </span>
              <span className="font-line text-xs font-bold text-[#0f172a] leading-tight">
                Sun-Mon: 10am - 10pm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookYourCar;
