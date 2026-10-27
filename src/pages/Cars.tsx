

import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { carService, type ICarItem } from "../services/carService";
import { categoryService, type ICategory } from "../services/categoryService";
import CarCard from "../componantes/CarCard";
import { toast } from "sonner";
import Cookies from "js-cookie";
import BookingModal from "../componantes/BookingModal";
// import { carService, ICarItem } from "../services/carService";
// import { categoryService, ICategory } from "../services/categoryService";
// import CarCard from "../components/CarCard";

// Background Hero Banner Image (apnar asset path onujayi dite paren)
const carsHeroBg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80";

const Cars: React.FC = () => {
  const [cars, setCars] = useState<ICarItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFuel, setSelectedFuel] = useState<string>("All");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
const navigate = useNavigate();
const [selectedCar, setSelectedCar] = useState<ICarItem | null>(null);
const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchFleetData = async () => {
      try {
        setLoading(true);
        const [carsData, categoriesData] = await Promise.all([
          carService.getAllCars(),
          categoryService.getAllCategories(),
        ]);
        setCars(Array.isArray(carsData) ? carsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFleetData();
  }, []);

  // Filter logic
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 1. Search Query
      const matchSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.registrationNo.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const carCatId =
        typeof car.category === "object" ? car.category._id : car.category;
      const matchCategory =
        selectedCategory === "All" || carCatId === selectedCategory;

      // 3. Fuel Type Filter
      const matchFuel =
        selectedFuel === "All" || car.fuelType === selectedFuel;

      // 4. Transmission Filter
      const matchTransmission =
        selectedTransmission === "All" ||
        car.transmission === selectedTransmission;

      return matchSearch && matchCategory && matchFuel && matchTransmission;
    });
  }, [cars, searchQuery, selectedCategory, selectedFuel, selectedTransmission]);

  const handleBookNow = (car: ICarItem) => {
  const token = Cookies.get("token");

  // 1. Jodi user logged in na thake, login page-e niye jabe
  if (!token) {
    toast.error("Please login first to book a car!");
    navigate("/login", { state: { redirectCarId: car._id } });
    return;
  }

  // 2. Logged in thakle Booking Modal open hobe
  setSelectedCar(car);
  setBookingOpen(true);
};

  return (
    <div className="w-full bg-[#070b0c] text-white">
      {/* 1. HERO BANNER SECTION (Fleet + Breadcrumb) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-center overflow-hidden">
        {/* Background Car Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${carsHeroBg})` }}
        >
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 sm:pt-44 pb-16 flex flex-col justify-center">
          <div className="max-w-xl text-left">
            {/* Main Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-[68px] font-normal text-white tracking-tight leading-tight mb-3">
              Our Vehicles
            </h1>

            {/* Breadcrumb Navigation */}
            <p className="font-heading text-lg sm:text-2xl text-gray-300 font-light tracking-wide">
              <Link
                to="/"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </Link>{" "}
              / Fleet & Inventory
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 -mt-8 sm:-mt-10 relative z-30">
        <div className="bg-[#12181a] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Search Vehicle
              </label>
              <input
                type="text"
                placeholder="e.g. Fortuner, Thar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1b2326] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1b2326] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Fuel Type
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full bg-[#1b2326] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="EV">Electric (EV)</option>
              </select>
            </div>

            {/* Transmission Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                Transmission
              </label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-[#1b2326] border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Transmissions</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAR INVENTORY GRID SECTION */}
      <section className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 mb-10 gap-4">
          <div>
            <span className="text-blue-500 text-xs uppercase tracking-widest font-semibold block mb-1">
              Live Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-white">
              Available Cars For Hire
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-semibold">{filteredCars.length}</span> verified vehicles
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm tracking-wide">
              Loading available fleet...
            </p>
          </div>
        ) : filteredCars.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-[#12181a] rounded-2xl border border-white/5">
            <p className="text-xl font-heading text-gray-300 mb-2">
              No vehicles matched your search
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Try resetting or adjusting your category and filter selections.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedFuel("All");
                setSelectedTransmission("All");
                setSearchQuery("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} onBookNow={handleBookNow} />
            ))}
          </div>
        )}
      </section>

      <BookingModal
        open={bookingOpen}
        car={selectedCar}
        onClose={() => {
          setBookingOpen(false);
          setSelectedCar(null);
        }}
        onSuccess={() => {
          // Booking request safolbhabe pathanor por list refetch kora
          setBookingOpen(false);
          setSelectedCar(null);
        }}
      />
    </div>
  );
};

export default Cars;