import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { bookingService, type IBookingItem } from "../../services/bookingService";


const myBookingsHeroBg =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80";

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<IBookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "All") return true;
    return b.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Rejected":
      case "Cancelled":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <div className="w-full bg-[#070b0c] text-white min-h-screen">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full min-h-[45vh] sm:min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${myBookingsHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-12 flex flex-col justify-center">
          <div className="max-w-xl text-left">
            <h1 className="font-heading text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight mb-2">
              My Reservations
            </h1>
            <p className="font-heading text-base sm:text-lg text-gray-300 font-light tracking-wide">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>{" "}
              / Rental Bookings
            </p>
          </div>
        </div>
      </section>

      {/* 2. BOOKINGS CONTAINER */}
      <section className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {["All", "Pending", "Approved", "Rejected", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#12181a] text-gray-400 hover:text-white hover:bg-[#1a2326] border border-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Fetching your reservations...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-[#12181a] rounded-2xl border border-white/5">
            <div className="text-4xl mb-3">🚗</div>
            <p className="text-xl font-heading text-gray-300 mb-2">
              No Bookings Found
            </p>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              You haven't reserved any vehicles in this status category yet. Explore our fleet to get started!
            </p>
            <Link
              to="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all"
            >
              Browse Cars & Rent Now
            </Link>
          </div>
        ) : (
          /* Booking Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((b) => {
              const pickup = new Date(b.pickupDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              const dropoff = new Date(b.dropoffDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={b._id}
                  className="bg-[#12181a] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500/40 transition-colors shadow-xl"
                >
                  <div>
                    {/* Header: Vehicle Name + Status */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={b.car?.image}
                          alt={b.car?.name}
                          className="w-16 h-12 rounded-lg object-cover bg-black/40 border border-white/10"
                        />
                        <div>
                          <h3 className="font-heading font-medium text-lg text-white">
                            {b.car?.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono">
                            {b.car?.registrationNo || "Vehicle"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </div>

                    {/* Rental Details Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-[#182124] rounded-xl text-xs mb-4 border border-white/5">
                      <div>
                        <span className="text-gray-400 block mb-0.5">Pickup Date</span>
                        <span className="text-white font-medium">{pickup}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Drop-off Date</span>
                        <span className="text-white font-medium">{dropoff}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Duration</span>
                        <span className="text-white font-medium">
                          {b.totalDays} Day{b.totalDays > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block mb-0.5">Daily Rate</span>
                        <span className="text-white font-medium">
                          ₹{b.car?.pricePerDay}/day
                        </span>
                      </div>
                    </div>

                    {/* Admin Message / Notes */}
                    {b.adminNote && (
                      <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                        <strong className="text-blue-300">Admin Note:</strong>{" "}
                        {b.adminNote}
                      </div>
                    )}
                  </div>

                  {/* Footer: Price Summary */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">Total Amount</span>
                      <span className="text-xl font-bold text-blue-400">
                        ₹{b.totalPrice}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-gray-500 block">
                        Requested on {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                      {b.status === "Pending" && (
                        <span className="text-xs text-amber-400 font-medium">
                          Verification In Progress
                        </span>
                      )}
                      {b.status === "Approved" && (
                        <span className="text-xs text-emerald-400 font-medium">
                          Confirmed & Reserved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookings;