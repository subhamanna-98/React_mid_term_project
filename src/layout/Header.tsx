import type React from "react";
import Cookies from "js-cookie";
import logo from "../assets/Car-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
interface NavItem {
  name: string;
  path: string;
}
interface UserProfile {
  name?: string;
  email?: string;
  avatar?: string;
  image?: string;
}
const defaultNavItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/aboutus" },
  { name: "Vehicles", path: "/vechiles" },
  { name: "Car Details", path: "/cardetails" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Cart(0)", path: "/cart" },
];
export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Token ebong User Info Load
  useEffect(() => {
    const currentToken = Cookies.get("token");
    setToken(currentToken || null);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  // Dropdown-er baire click korle menu close hobe
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setUserDropdownOpen(false);
    navigate("/login");
  };

  // NavItems: User login thakle "My Bookings" shathe add hobe
  const navItems: NavItem[] = [
    ...defaultNavItems,
    ...(token ? [{ name: "My Bookings", path: "/my-bookings" }] : []),
  ];

  const userAvatar = user?.avatar || user?.image;
  const userName = user?.name || "Customer";

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-12 py-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer z-50"
        >
          <img
            src={logo}
            alt="CarHut Logo"
            className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center: Desktop Capsule Navbar */}
        <nav className="hidden md:flex items-center border border-white/20 rounded-full px-2 py-1.5 backdrop-blur-md bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <ul className="flex items-center space-x-1 font-heading">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 inline-block cursor-pointer ${
                      isActive
                        ? "text-white bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Dynamic Profile / Create Account + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {token ? (
            /* Logged In State: User Image + Name + Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-8 h-8 rounded-full object-cover border border-white/40"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                    {userName.charAt(0)}
                  </div>
                )}
                <span className="hidden sm:inline-block text-sm font-medium text-white max-w-[110px] truncate">
                  {userName}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Popup Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0b1315]/95 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-white font-medium truncate">{userName}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || "Customer"}</p>
                  </div>
                  <Link
                    to="/my-bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out State: Create Account CTA */
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center justify-center bg-white text-gray-900 text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md"
            >
              Create Account
            </Link>
          )}

          {/* Hamburger Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-white/20 backdrop-blur-md bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <div
        className={`md:hidden fixed inset-x-4 top-20 bg-[#0b1315]/95 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl p-6 transition-all duration-300 z-40 ${
          mobileMenuOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-white/20 font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Bottom CTA */}
        <div className="mt-5 pt-4 border-t border-white/10">
          {token ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full inline-flex items-center justify-center bg-rose-600/20 text-rose-300 border border-rose-500/30 text-sm font-semibold py-2.5 rounded-full hover:bg-rose-600/30 transition-all text-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-full hover:bg-gray-100 transition-all text-center"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
